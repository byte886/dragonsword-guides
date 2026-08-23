#!/usr/bin/env python3
"""
Pre-commit validation for ds-guides.wiki static site.
Checks all HTML pages for SEO requirements and internal link integrity.

Usage:
    python3 scripts/validate-pages.py           # check all pages
    python3 scripts/validate-pages.py en/kalien  # check specific page(s)
"""

import os, re, sys
from collections import defaultdict

LANGS = ["en", "ko", "ja", "ru", "zh"]
DOMAIN = "https://ds-guides.wiki"
REQUIRED_HREFLANG = set(LANGS + ["x-default"])

def validate_page(filepath):
    errors = []
    warnings = []

    if not os.path.exists(filepath):
        return [f"MISSING: {filepath}"], []

    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    lang = filepath.split("/")[0]
    page = os.path.basename(filepath).replace(".html", "")

    # Title
    m = re.search(r"<title>([^<]+)</title>", html)
    if not m:
        errors.append("missing <title>")
    elif len(m.group(1).strip()) < 10:
        warnings.append(f"title too short: '{m.group(1)}'")

    # Meta description
    m = re.search(r'<meta name="description" content="([^"]+)"', html)
    if not m:
        errors.append("missing meta description")
    elif len(m.group(1).strip()) < 50:
        warnings.append(f"description short ({len(m.group(1).strip())} chars)")

    # Canonical
    if page == "index" and lang == "en":
        expected_canonical = f'{DOMAIN}/"'
    else:
        expected_canonical = f"{DOMAIN}/{lang}/{page}.html"
    if f'href="{expected_canonical}"' not in html:
        errors.append(f"canonical mismatch (expected {expected_canonical})")

    # H1
    h1_count = len(re.findall(r"<h1[ >]", html))
    if h1_count != 1:
        errors.append(f"has {h1_count} H1 tags (expected 1)")

    # H2 before H1 check (basic hierarchy)
    h1_pos = html.find("<h1")
    h2_pos = html.find("<h2")
    if h1_pos > -1 and h2_pos > -1 and h2_pos < h1_pos:
        errors.append("H2 appears before H1")

    # lang attribute
    if f'<html lang="{lang}"' not in html:
        errors.append(f"lang attribute mismatch (expected {lang})")

    # Charset
    if 'charset="UTF-8"' not in html and "charset='UTF-8'" not in html:
        errors.append("missing charset")

    # Viewport
    if "viewport" not in html:
        errors.append("missing viewport meta")

    # GA
    if "analytics.js" not in html:
        errors.append("missing analytics.js")

    # hreflang
    hreflangs = set(re.findall(r'hreflang="([^"]+)"', html))
    if hreflangs != REQUIRED_HREFLANG:
        missing = REQUIRED_HREFLANG - hreflangs
        extra = hreflangs - REQUIRED_HREFLANG
        if missing:
            errors.append(f"missing hreflang: {missing}")
        if extra:
            warnings.append(f"unexpected hreflang: {extra}")

    # JSON-LD
    if "application/ld+json" not in html:
        warnings.append("missing JSON-LD structured data")

    # No inline scripts (except JSON-LD)
    inline_scripts = re.findall(r"<script(?![^>]*\bsrc=)(?![^>]*application/ld\+json)[^>]*>", html)
    if inline_scripts:
        errors.append(f"has {len(inline_scripts)} inline <script> tags (use external .js)")

    return errors, warnings


def validate_sitemap():
    errors = []
    if not os.path.exists("sitemap.xml"):
        return ["sitemap.xml not found"]

    with open("sitemap.xml", "r") as f:
        sitemap = f.read()

    for lang in LANGS:
        if not os.path.isdir(lang):
            continue
        for fname in os.listdir(lang):
            if not fname.endswith(".html"):
                continue
            url = f"{DOMAIN}/{lang}/{fname}"
            if url not in sitemap:
                errors.append(f"sitemap missing {url}")

    return errors


def main():
    targets = sys.argv[1:] if len(sys.argv) > 1 else None
    total_errors = 0
    total_warnings = 0
    pages_checked = 0

    files_to_check = []
    if targets:
        files_to_check = targets
    else:
        for lang in LANGS:
            if not os.path.isdir(lang):
                continue
            for fname in sorted(os.listdir(lang)):
                if fname.endswith(".html"):
                    files_to_check.append(f"{lang}/{fname}")

    for filepath in files_to_check:
        errors, warnings = validate_page(filepath)
        pages_checked += 1
        if errors:
            total_errors += len(errors)
            print(f"\n❌ {filepath}")
            for e in errors:
                print(f"   - {e}")
        if warnings:
            total_warnings += len(warnings)
            print(f"\n⚠️  {filepath}")
            for w in warnings:
                print(f"   - {w}")

    # Sitemap check
    sm_errors = validate_sitemap()
    if sm_errors:
        total_errors += len(sm_errors)
        print(f"\n❌ sitemap.xml")
        for e in sm_errors:
            print(f"   - {e}")

    print(f"\n{'='*50}")
    print(f"Pages checked: {pages_checked}")
    print(f"Errors: {total_errors}")
    print(f"Warnings: {total_warnings}")
    if total_errors == 0:
        print("✅ All checks passed!")
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    main()
