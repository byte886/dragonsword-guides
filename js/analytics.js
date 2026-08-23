// Google Analytics (gtag.js)
// Update Measurement ID here when needed
(function() {
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-6XQCHB1YYV';
  document.head.appendChild(ga);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-6XQCHB1YYV');

  // Track deep engagement: 3+ page views per session
  try {
    var count = parseInt(sessionStorage.getItem('ga_page_views') || '0', 10) + 1;
    sessionStorage.setItem('ga_page_views', count);
    if (count === 3) {
      gtag('event', 'deep_engagement', {
        'event_category': 'engagement',
        'event_label': '3+ pages in session'
      });
    }
  } catch(e) {}
})();
