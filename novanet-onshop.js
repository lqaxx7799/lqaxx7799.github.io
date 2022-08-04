window.addEventListener('load', () => {
  const addToCartButton = document.getElementById('button-add-to-cart');
  if (addToCartButton) {
    const productName = document.querySelector('#main-wrapper > div > div.product-info > div > div > div.col-lg-7.pro-detail.pt-3.pt-lg-5 > h1').firstChild.nodeValue.trim();
    const productId = document.querySelector("#add-to-cart > input[type=hidden]:nth-child(3)").value;
    setTimeout(() => {
      window.Novanet.init({
        event: 'product-view',
        productDetails: [{
          product: {
            id: productId,
            productName,
          },
        }],
      });
    }, 300);

    addToCartButton.addEventListener('click', () => {
      const quantity = document.querySelector("#add-to-cart > div.d-flex.flex-wrap.py-2.show-on-pc > div > div > div.buy-total > input").value;
      window.Novanet.init({
        event: 'add-to-cart',
        productDetails: [{
          product: {
            id: productId,
            productName,
          },
          quantity,
        }],
      });
    });
  }
  
  if (window.location.pathname === '/thanh-toan') {
    const products = Array.from(document.querySelectorAll('.cart-product-item')).map(elem => {
      const productName = elem.querySelector("tbody > tr > td.cart-product-info > a").getAttribute('title');
      const quantity = parseInt(elem.querySelector("tbody > tr > td:nth-child(2) > span").innerHTML);
      return {
        product: {
          productName,
        },
        quantity,
      };
    });
    setTimeout(() => {
      window.Novanet.init({
        event: 'purchase',
        productDetails: products,
      });
    }, 300);

    document.querySelector(".btn-payment-success").addEventListener('click', () => {
      window.Novanet.init({
        event: 'purchase-complete',
        productDetails: products,
      });
    });
  }
});