(function(d, s, id, t) {
    if (d.getElementById(id)) return;
    var js, fjs = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://widget-beta.oncustomer.asia/js/index.js?token=' + t;
    fjs.parentNode.insertBefore(js, fjs);}
  (document, 'script', 'oc-chat-widget-bootstrap', '3bafd8ac4537f01d51027d1e30b00eb2'));