const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const livechat_token = urlParams.get('token');

console.log('bbbb', queryString);

console.log('aaaa', livechat_token);

(function (d, s, id, t) {
  if (d.getElementById(id)) return;
  var js, fjs = d.getElementsByTagName(s)[0];
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://widget-beta.oncustomer.asia/js/index.js?token=' + t;
  fjs.parentNode.insertBefore(js, fjs);
}
  (document, 'script', 'oc-chat-widget-bootstrap', livechat_token));