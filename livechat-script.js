const src = document.querySelector('script[src^="https://lqaxx7799.github.io/livechat-script.js"]').src;
const srcArray = src.split('?');
const queryString = srcArray[arr.length - 1];
const urlParams = new URLSearchParams(queryString);
const livechat_token = urlParams.get('token');

(function (d, s, id, t) {
  if (d.getElementById(id)) return;
  var js, fjs = d.getElementsByTagName(s)[0];
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://widget-beta.oncustomer.asia/js/index.js?token=' + t;
  fjs.parentNode.insertBefore(js, fjs);
}
  (document, 'script', 'oc-chat-widget-bootstrap', livechat_token));