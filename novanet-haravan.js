// Di chuyển toàn bộ navigator về phía server
NovanetHost = 'https://betav6.novanet.vn';
Constants = {
  NovanetDomain: NovanetHost + '/display/index',
  NovanetEvent: NovanetHost + '/display/event',
  NovanetPublisherId: 'novanet-publisher-{0}',
  NovanetZoneId: 'novanet-zone-{0}',
  NovanetIFrameId: 'novanet-iframe-{0}',
  Referer: encodeURIComponent(window.location.href),
  AppVersion: navigator['appVersion'],
  UserAgent: navigator['userAgent'],
  AppName: navigator['appName'],
  CookieEnabled: navigator['cookieEnabled'],
  Language: navigator['language'],
  Platform: navigator['platform'],
  HTML5Supported: !!document.createElement('canvas'),
  Now: new Date(),
  CookieExpires: (now, days) =>
    now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000).toUTCString(),
  OS: {
    Windows: 'Windows',
    MacOS: 'MacOS',
    Unix: 'UNIX',
    Linux: 'Linux',
  },
  Browser: {
    Opera: 'Opera',
    MSIE: 'MSIE',
    Chrome: 'Chrome',
    Safari: 'Safari',
    Firefox: 'Firefox',
  },
  Button: {
    close: 'novanet-close',
    template: {
      flyingCarpet: 'flying-carpet-banner',
      interactive: 'interactive-banner',
      catfishEcom: 'catfish-ecom-banner',
    },
  },
  TemplateTypes: {
    MobileBannerCard: 1,
    InteractiveBanner: 2,
    FlyingCarpet: 3,
    InreadEcommerce: 4,
    PostInRead: 5,
    CatfishEcom: 6,
  },
  Template: {
    BackUp: {
      init: 'novanet-init-backup',
    },
    Default: {
      init: 'novanet-init-default',
    },
    MobileBannerCard: '',
    InteractiveBanner: {
      init: 'novanet-init-interactive',
      initStyle: 'novanetInteractiveStyle',
    },
    FlyingCarpet: {
      init: 'novanet-init-flying-carpet',
      style: {
        custom: 'amp-custom',
        boilerplate: 'amp-boilerplate',
        height: 'height',
      },
      elements: {
        flyingCarpet: 'flying-carpet',
        noscript: 'noscript',
        script: 'script',
        style: 'style',
        head: 'head',
      },
    },
    InreadEcommerce: '',
    PostInRead: '',
    CatfishEcom: {
      init: 'novanet-init-catfish-ecom',
      swipeUp: 'novanet-catfish-ecom-swipe-up',
      swipeDown: 'novanet-catfish-ecom-swipe-down',
      swipeUpStyle: 'novanetCatfishEcomSwipeUpStyle',
    },
  },
  HistoryLength: history.length,
  HostName: window.location.hostname,
  WindowLocationUrl: window.location.href,
  HexTime: () => {
    const ticks = Utils.dateTime.toTicks(Date.now());
    return Utils.dateTime.toHexCode(ticks);
  },
};
Enums = {
  Events: {
    Default: 0,
    PageView: 1,
    ProductView: 2,
    AddToCart: 3,
    Purchase: 4,
    PurchaseComplete: 5
  }
};
Utils = {
  getOS() {
    let osName = '0';
    if (navigator.appVersion.indexOf('Win') !== -1)
      osName = Constants.OS.Windows;
    if (navigator.appVersion.indexOf('Mac') !== -1) osName = Constants.OS.MacOS;
    if (navigator.appVersion.indexOf('X11') !== -1) osName = Constants.OS.Unix;
    if (navigator.appVersion.indexOf('Linux') !== -1)
      osName = Constants.OS.Linux;
    return osName;
  },
  getBrowser() {
    const appVersion = Constants.AppVersion;
    const userAgent = Constants.UserAgent;
    let browserName = navigator.appName;
    let fullVersion = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;
    let browsers = [];
    browsers[0] = '0';
    browsers[1] = '0';
    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = userAgent.indexOf(Constants.Browser.Opera)) !== -1) {
      browserName = Constants.Browser.Opera;
      fullVersion = userAgent.substring(verOffset + 6);
      if ((verOffset = userAgent.indexOf('Version')) !== -1)
        fullVersion = userAgent.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = userAgent.indexOf(Constants.Browser.MSIE)) !== -1) {
      browserName = Constants.Browser.MSIE;
      fullVersion = userAgent.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = userAgent.indexOf(Constants.Browser.Chrome)) !== -1) {
      browserName = Constants.Browser.Chrome;
      fullVersion = userAgent.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = userAgent.indexOf(Constants.Browser.Safari)) !== -1) {
      browserName = Constants.Browser.Safari;
      fullVersion = userAgent.substring(verOffset + 7);
      if ((verOffset = userAgent.indexOf('Version')) !== -1)
        fullVersion = userAgent.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if (
      (verOffset = userAgent.indexOf(Constants.Browser.Firefox)) !== -1
    ) {
      browserName = Constants.Browser.Firefox;
      fullVersion = userAgent.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if (
      (nameOffset = userAgent.lastIndexOf(' ') + 1) <
      (verOffset = userAgent.lastIndexOf('/'))
    ) {
      browserName = userAgent.substring(nameOffset, verOffset);
      fullVersion = userAgent.substring(verOffset + 1);
      if (browserName.toLowerCase() === browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(' ')) !== -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    browsers[0] = browserName;
    browsers[1] = majorVersion;
    return browsers;
  },
  iframeUrlParamsBuilder(zoneId, width, height, ip, configs) {
    const params = [];
    params.push(
      `zone=${zoneId}`,
      `url=${encodeURIComponent(Constants.WindowLocationUrl)}`,
      `host=${Constants.HostName}`,
      `referer=${encodeURIComponent(Constants.Referer)}`,
      `width=${width}`,
      `height=${height}`,
      `timestamp=${Constants.HexTime()}`,
      `domain=${Constants.HostName}`,
      `ip=${ip}`,
      `time=${new Date().getTime()}`,
      `logo-status=${configs?.logo}`,
    );
    if (configs?.closeSize) {
      params.push(`closeSize=${configs?.closeSize}`);
    }
    return params.join('&');
  },
  iframeBuilder(zoneId, width, height, ip, configs) {
    let novanetListening = document.createElement('iframe');
    const novanetFrameId = Utils.String.format(Constants.NovanetIFrameId, [
      zoneId,
    ]);
    novanetListening.src =
      Constants.NovanetDomain +
      '?' +
      this.iframeUrlParamsBuilder(zoneId, width, height, ip, configs);
    novanetListening.id = novanetFrameId;
    novanetListening.style.margin = '0';
    novanetListening.style.padding = '0';
    novanetListening.style.overflow = 'hidden';
    novanetListening.style.border = '0';
    novanetListening.style.height = '100%';
    novanetListening.style.width = '100%';

    window.addEventListener('message', function (event) {
      if (event.data.zoneId === zoneId && novanetListening) {
        switch (event.data.message) {
          case Constants.Template.BackUp.init:
            Utils.handleInitBackup(event.data.zoneId, event.data.code);
            break;
          case Constants.Template.Default.init:
            Utils.handleInitDefault(novanetListening, event.data.templateType);
            break;
          case Constants.Button.close:
            Utils.handleCloseElement(novanetListening, event.data.templateType, zoneId);
            break;
          case Constants.Template.InteractiveBanner.init:
            Utils.handleInteractiveBanner(novanetListening);
            break;
          case Constants.Template.FlyingCarpet.init:
            Utils.handleFlyingCarpet(novanetListening, event.data.zoneId);
            break;
          case Constants.Template.CatfishEcom.init:
            Utils.handleInitCatfishEcom(
              novanetListening,
              event.data.useTemplate
            );
            break;
          case Constants.Template.CatfishEcom.swipeUp:
            Utils.handleCatfishEcomSwipeUp(novanetListening, zoneId);
            break;
          case Constants.Template.CatfishEcom.swipeDown:
            Utils.handleCatfishEcomSwipeDown(novanetListening, zoneId);
            break;
        }
      }
    });
    return novanetListening;
  },
  handleInitBackup(zoneId, code) {
    const zoneFormat = Utils.String.format(Constants.NovanetZoneId, [zoneId]);
    const zoneElement = document.getElementById(zoneFormat);
    if (zoneElement) {
      const parent = zoneElement.parentElement;
      const backupElement = document.createElement('div');
      backupElement.id = `novanet-backup-${zoneId}`;
      backupElement.innerHTML = code;
      zoneElement.remove();
      parent.appendChild(backupElement);
      const scriptElements = backupElement.querySelectorAll('script');
      Array.from(scriptElements).forEach((scriptElement) => {
        const clonedElement = document.createElement('script');
        Array.from(scriptElement.attributes).forEach((attribute) => {
          clonedElement.setAttribute(attribute.name, attribute.value);
        });
        clonedElement.text = scriptElement.text;
        scriptElement.parentNode.replaceChild(clonedElement, scriptElement);
      });
    }
  },
  handleInitDefault(novanetListening, templateType) {
    switch (templateType) {
      case Constants.TemplateTypes.CatfishEcom:
        this.handleInitCatfishEcom(novanetListening, true);
        break;
    }
  },
  handleCloseElement(novanetListening, templateType, zoneId) {
    switch (templateType) {
      case Constants.Button.template.interactive:
        novanetListening.parentElement.remove();
        document
          .getElementById(Constants.Template.InteractiveBanner.initStyle)
          ?.remove();
        break;
      case Constants.Button.template.flyingCarpet:
        const flyingCarpetElement = document.getElementById(
          Constants.Template.FlyingCarpet.elements.flyingCarpet
        );
        flyingCarpetElement.remove();
        break;
      case Constants.Button.template.catfishEcom:
        novanetListening.parentElement.remove();
        document
          .getElementById(Constants.Template.CatfishEcom.swipeUpStyle + zoneId)
          ?.remove();
        break;
      default:
        novanetListening.parentElement.remove();
        break;
    }
  },
  handleInteractiveBanner(novanetListening) {
    novanetListening.parentElement.style.height = '100vh';
    novanetListening.parentElement.style.width = '100vw';
    novanetListening.parentElement.style.position = 'fixed';
    novanetListening.parentElement.style.zIndex = '2247483647';
    novanetListening.parentElement.style.maxWidth = '500px';
    novanetListening.parentElement.style.transform = 'translateX(-50%)';
    novanetListening.parentElement.style.left = '50%';
    novanetListening.parentElement.style.top = '0';
    // document.body.appendChild(novanetListening.parentElement);
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = Constants.Template.InteractiveBanner.initStyle;
    style.innerHTML = 'body { overflow: hidden; }';
    document.body.appendChild(style);
  },
  handleInitCatfishEcom(novanetListening, useTemplate) {
    let parentHeight = parseInt(novanetListening.parentElement.style.height);
    if (!useTemplate) {
      parentHeight += 26;
    }
    novanetListening.parentElement.style.height = parentHeight + 'px';
    novanetListening.parentElement.style.position = 'fixed';
    novanetListening.parentElement.style.zIndex = '99999';
    novanetListening.parentElement.style.bottom = '0';
  },
  handleCatfishEcomSwipeUp(novanetListening, zoneId) {
    novanetListening.parentElement.style.height = 'unset';
    novanetListening.parentElement.style.top = '0';
    const swipeUpStyleId = Constants.Template.CatfishEcom.swipeUpStyle + zoneId;
    if (!document.getElementById(swipeUpStyleId)) {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.id = swipeUpStyleId;
      style.innerHTML = 'body { overflow: hidden; }';
      document.body.appendChild(style);
    }
  },
  handleCatfishEcomSwipeDown(novanetListening, zoneId) {
    const zoneFormat = Utils.String.format(Constants.NovanetZoneId, [zoneId]);
    const zoneElement = document.getElementById(zoneFormat);
    novanetListening.parentElement.style.height =
      zoneElement.parentElement.clientWidth * (120 / 375) + 26 + 'px';
    novanetListening.parentElement.style.removeProperty('top');
    document
      .getElementById(Constants.Template.CatfishEcom.swipeUpStyle + zoneId)
      ?.remove();
  },
  handleFlyingCarpet(novanetListening, zoneId) {
    const zoneFormat = Utils.String.format(Constants.NovanetZoneId, [zoneId]);
    const zoneElement = document.getElementById(zoneFormat);
    if (!zoneElement || !novanetListening || !zoneElement.firstChild) {
      return;
    }

    const parentZoneElement = zoneElement?.parentNode;

    const wrapper = document.createElement('ins');
    wrapper.setAttribute('id', 'flying-carpet');

    const parentDiv = document.createElement('ins');

    zoneWidth = zoneElement.parentElement.clientWidth + 'px';
    zoneHeight = window.innerHeight + 'px';
    wrapper.style.width = zoneWidth;
    wrapper.style.height = zoneHeight;
    wrapper.style.overflow = 'hidden';
    wrapper.style.position = 'relative';
    wrapper.style.textDecoration = 'none';
    wrapper.style.display = 'block';
    wrapper.style.zIndex = '100';
    wrapper.style.visibility = 'visible';
    wrapper.style.background = 'transparent';

    parentDiv.style.background = 'transparent';
    parentDiv.style.zIndex = '200';
    parentDiv.style.position = 'absolute';
    parentDiv.style.overflow = 'hidden';
    parentDiv.style.height = '100%';
    parentDiv.style.width = '100%';
    parentDiv.style.textDecoration = 'none';
    parentDiv.style.display = 'block';
    parentDiv.style.clip = 'rect(0 ' + zoneWidth + ' ' + zoneHeight + ' -16px)';
    parentDiv.style.visibility = 'visible';

    const childDiv = document.createElement('ins');
    childDiv.style.position = 'fixed';
    childDiv.style.top = '0';
    childDiv.style.width = zoneWidth;
    childDiv.style.height = zoneHeight;
    childDiv.style.overflow = 'hidden';
    childDiv.style.zIndex = '0';
    childDiv.style.display = 'inline-block';
    childDiv.style.textDecoration = 'none';
    childDiv.style.visibility = 'visible';
    childDiv.style.background = 'transparent';
    childDiv.style['-webkit-backface-visibility'] = 'hidden';
    childDiv.style['-webkit-transform'] = 'translate3d(0,0,0)';

    parentZoneElement.appendChild(wrapper);
    wrapper.appendChild(parentDiv);
    parentDiv.appendChild(childDiv);
    childDiv.appendChild(zoneElement.firstChild);
    zoneElement.style.height = '0';
    zoneElement.style.width = '0';
  },

  getUrlParameter(url, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[?&]${name}=([^&#]*)`);
    const results = regex.exec(url || window.location.search);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },
  cookieEvent: {
    createCookie(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        expires = '; expires=' + Constants.CookieExpires;
      } else {
        expires = '';
      }
      document.cookie = name + '=' + value + expires + '; path=/';
    },
    eraseCookie(name) {
      Utils.createCookie(name, '', -1);
    },
    getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
  },
  httpClient: {
    httpGet(url) {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          return JSON.parse(this.responseText);
        }
      });
      xhr.open('GET', url);
      xhr.send();
    },
    httpPost(url, body) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
        redirect: 'follow'
      };

      fetch(Constants.NovanetEvent, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    },
  },
  scrollEvent: {
    scrollTop() {
      return (
        window.pageYOffset ||
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop - (document.documentElement.clientTop || 0)
      );
    },
    scrollLeft() {
      return (
        window.pageXOffset ||
        (document.documentElement && document.documentElement.scrollLeft) ||
        document.body.scrollLeft - (document.documentElement.clientLeft || 0)
      );
    },
  },
  offsetValue: {
    offsetSum(elem) {
      let top = 0,
        left = 0,
        bottom = 0,
        right = 0;

      let width = elem.offsetWidth;
      let height = elem.offsetHeight;

      while (elem) {
        top += elem.offsetTop;
        left += elem.offsetLeft;
        elem = elem.offsetParent;
      }

      right = left + width;
      bottom = top + height;

      return {
        top: top,
        left: left,
        bottom: bottom,
        right: right,
        width: width,
        height: height,
      };
    },
    offsetRect(elem) {
      const box = elem.getBoundingClientRect();
      const docElem = document.documentElement;
      const top =
        box.top + Utils.scrollEvent.scrollTop - Utils.scrollEvent.clientTop;
      const left = box.left + Utils.scrollEvent.scrollTop - docElem.clientLeft;
      const bottom = top + (box.bottom - box.top);
      const right = left + (box.right - box.left);
      const width = box.bottom - box.top;
      const height = box.right - box.left;
      return {
        top: Math.round(top),
        left: Math.round(left),
        bottom: Math.round(bottom),
        right: Math.round(right),
        width: width,
        height: height,
      };
    },
    offset(element) {
      if (element) {
        if (element.getBoundingClientRect) {
          return Utils.offsetValue.offsetRect(element);
        } else {
          return Utils.offsetValue.offsetSum(element);
        }
      } else return null;
    },
  },
  zoneWidth() {
    let zoneWidth = 0;
    if ('number' == typeof window.innerWidth) zoneWidth = window.innerWidth;
    else
      document.documentElement && document.documentElement.clientWidth
        ? (zoneWidth = document.documentElement.clientWidth)
        : document.body &&
        document.body.clientWidth &&
        (zoneWidth = document.body.clientWidth);
    zoneWidth > screen.width && (zoneWidth = screen.width);
    return zoneWidth;
  },
  dateTime: {
    toDateTime(hexCode) {
      const dec = parseInt(hexCode, 16);
      return new Date(dec * 1000);
    },
    toHexCode(ticks) {
      let hex = Number(ticks).toString(16);
      if (hex.length < 2) hex = '0' + hex;
      return hex;
    },
    toTicks(dateTime) {
      return Math.floor(dateTime / 1000);
    },
  },
  String: {
    format: (template, arguments) => {
      for (const argument in arguments) {
        template = template.replace('{' + argument + '}', arguments[argument]);
      }
      return template;
    },
  },
};
Handler = {
  events: {
    default(zoneId, width, height, configs) {
      //** INITIAL NODES **//
      let targetElement = null;
      if (configs) {
        if (configs.targetClass) {
          targetElement = document.getElementsByClassName(configs.targetClass)[0];
        }
        if (configs.targetId) {
          targetElement = document.getElementById(configs.targetId);
        }
      }
      const zoneFormat = Utils.String.format(Constants.NovanetZoneId, [zoneId]);
      const zoneElement = document.getElementById(zoneFormat);
      let zoneWidth, zoneHeight;
      if (configs?.frame === 'SafeFrame') {
        if (configs.targetClass) {
          targetElement = parent.document.getElementsByClassName(configs.targetClass)[0];
        }
        if (configs.targetId) {
          targetElement = parent.document.getElementById(configs.targetId);
        }

        const safeZoneWidth = parent.document.getElementById(window.name).parentNode.offsetWidth ?? 0;
        const safeZoneHeight = (safeZoneWidth ?? 0) * (height / width);
        zoneWidth = safeZoneWidth + 'px';
        zoneHeight = safeZoneHeight + 'px';
        parent.document.getElementById(window.name).setAttribute("width", safeZoneWidth.toString());
        parent.document.getElementById(window.name).setAttribute("height", safeZoneHeight.toString());
      } else {
        zoneWidth = zoneElement.parentElement.clientWidth + 'px';
        zoneHeight = zoneElement.parentElement.clientWidth * (height / width) + 'px';
      }
      zoneElement.style.width = zoneWidth;
      zoneElement.style.height = zoneHeight;
      zoneElement.style.margin = 'auto';

      fetch('https://www.cloudflare.com/cdn-cgi/trace')
        .then((response) => response.text())
        .then((data) => {
          data = data.trim().split('\n').reduce(function(obj, pair) {
            pair = pair.split('=');
            return { ...obj, [pair[0]]: pair[1] };
          }, {});
          const ip = data['ip'];
          const childElement = Utils.iframeBuilder(zoneId, width, height, ip, configs);
          if (targetElement) {
            targetElement.appendChild(zoneElement);

            zoneWidth = zoneElement.parentElement.clientWidth + 'px';
            zoneHeight = zoneElement.parentElement.clientWidth * (height / width) + 'px';
            zoneElement.style.width = zoneWidth;
            zoneElement.style.height = zoneHeight;
            zoneElement.style.margin = 'auto';

            zoneElement.appendChild(childElement);

            if (targetElement)
            {
              const firstChild = targetElement?.children[0].id;
              if (firstChild)
                parent.document.getElementById(firstChild).remove();
            }
          } else {
            zoneElement.appendChild(childElement);
          }
          childElement.onload = () => {
            switch (configs.logo) {
              case 'hidden':
                let logos = childElement.getElementsByClassName('logo-icon');
                childElement.contentWindow.postMessage({
                  configs,
                  message: 'novanet-logo-status',
                }, '*');

                break;
              default:
                break;
            }
          };
        });
    },
    pageView(context) {
      Novanet.eventIframe.contentWindow.postMessage({
        message: 'novanet-event',
        url: Constants.NovanetEvent,
        body: {
          ...context,
          eventTarget: encodeURIComponent(Constants.WindowLocationUrl),
          eventType: Enums.Events.PageView,
        },
      }, '*');
    },
    productView(context) {
      Novanet.eventIframe.contentWindow.postMessage({
        message: 'novanet-event',
        url: Constants.NovanetEvent,
        body: {
          ...context,
          eventTarget: encodeURIComponent(Constants.WindowLocationUrl),
          eventType: Enums.Events.ProductView,
        },
      }, '*');
    },
    addToCart(context) {
      Novanet.eventIframe.contentWindow.postMessage({
        message: 'novanet-event',
        url: Constants.NovanetEvent,
        body: {
          ...context,
          eventTarget: encodeURIComponent(Constants.WindowLocationUrl),
          eventType: Enums.Events.AddToCart,
        },
      }, '*');
    },
    purchase(context) {
      Novanet.eventIframe.contentWindow.postMessage({
        message: 'novanet-event',
        url: Constants.NovanetEvent,
        body: {
          ...context,
          eventTarget: encodeURIComponent(Constants.WindowLocationUrl),
          eventType: Enums.Events.Purchase,
        },
      }, '*');
    },
    purchaseComplete(context) {
      Novanet.eventIframe.contentWindow.postMessage({
        message: 'novanet-event',
        url: Constants.NovanetEvent,
        body: {
          ...context,
          eventTarget: encodeURIComponent(Constants.WindowLocationUrl),
          eventType: Enums.Events.PurchaseComplete,
        },
      }, '*');
    }
  }
}
Novanet = {
  accountId: null,
  reset() {
    console.log('NOVANET RESET');
  },
  init(context) {
    try {
      console.log('NOVANET RUNNING ...');
      const {event, width, height, zoneId, configs} = context;
      // Events:
      // 0. 'default': Hành vi tiếp cận quảng cáo
      // 1. 'page-view': Hành vi truy cập trang,
      // 2. 'product-view': Hành vi xem sản phẩm,
      // 3. 'add-to-cart': Hành vi thêm vào giỏ hàng
      // 4. 'purchase': Hành vi ấn nút mua hàng
      // 5. 'purchase-complete': Hành vi hoàn tất mua hàng
      switch (event) {
        case 'default':
          Handler.events.default(zoneId, width, height, configs);
          break;
        case 'page-view':
          Handler.events.pageView(context);
          break;
        case 'product-view':
          Handler.events.productView(context);
          break;
        case 'add-to-cart':
          Handler.events.addToCart(context);
          break;
        case 'purchase':
          Handler.events.purchase(context);
          break;
        case 'purchase-complete':
          Handler.events.purchaseComplete(context);
          break;
        default:
          break;
      }
    } catch (ex) {
      console.log('NOVANET EXCEPTION: ', ex);
    }
  },
  push(eventName, ...args) {
    switch (eventName) {
      case 'config':
        const eventIframe = document.createElement('iframe');
        eventIframe.src = Constants.NovanetEvent;
        eventIframe.id = 'novanet-event-iframe-' + args[0];
        eventIframe.style.display = 'none';
        document.body.appendChild(eventIframe);
        this.eventIframe = eventIframe;
        this.accountId = args[0];
        eventIframe.onload = () => {
          Handler.events.pageView({
            event: 'page-view',
            accountId: args[0],
          });
        };
        window.addEventListener('message', (event) => {
          if (event.data?.message === 'novanet-init-client-id') {
            const novanetMeta = document.createElement('meta');
            novanetMeta.setAttribute('property', 'novanet:client_id');
            novanetMeta.content = event.data.clientId;
            document.head.appendChild(novanetMeta);
            document.dispatchEvent(new CustomEvent("novanet-meta-created", {
              detail: {
                clientId: event.data.clientId,
              },
            }));
          }
        });
        break;
    }
  }
};

window.addEventListener('load', () => {
  const url = new URL(document.currentScript.getAttribute('src'));
  Novanet.push('config', url.searchParams.get('accountId'));

  document.addEventListener('novanet-meta-created', (event) => {
    const clientDiv = document.createElement('div');
    clientDiv.innerHTML = event?.detail?.clientId;
    document.body.appendChild(clientDiv);

    if (window.location.pathname.startsWith('/checkouts')) {
      const products = Array.from(document.querySelectorAll('body > div:nth-child(7) > div > div.sidebar > div > div > div > div.order-summary-section.order-summary-section-product-list > table > tbody > tr')).map(elem => {
        const productName = elem.querySelector("td.product-description > span.product-description-name").innerText;
        const productId = elem.dataset.productId;
        const quantity = parseInt(elem.querySelector("td.product-quantity").innerHTML);
        const productGroup = localStorage.getItem(`product:${productId}}:productGroup`)
        return {
          product: {
            id: productId,
            productName,
            productGroup,
          },
          quantity,
        };
      });
      window.Novanet.init({
        event: 'purchase',
        productDetails: products,
      });

      document.querySelector("#form_next_step > button").addEventListener('click', () => {
        window.Novanet.init({
          event: 'purchase-complete',
          productDetails: products,
        });
        products.forEach(item => {
          localStorage.removeItem(`product:${item.product.id}}:productGroup`);
        });
      });
    }
  });
});
