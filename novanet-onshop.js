document.addEventListener('novanet-meta-created', (event) => {
  const clientDiv = document.createElement('div');
  clientDiv.innerHTML = event?.detail?.clientId;
  document.body.appendChild(clientDiv);

  const addToCartButton = document.getElementById('button-add-to-cart');
  if (addToCartButton) {
    const productName = document.querySelector('#main-wrapper > div > div.product-info > div > div > div.col-lg-7.pro-detail.pt-3.pt-lg-5 > h1').firstChild.nodeValue.trim();
    const productId = document.querySelector("#add-to-cart > input[type=hidden]:nth-child(3)").value;
    window.Novanet.init({
      event: 'product-view',
      productDetails: [{
        product: {
          id: productId,
          productName,
        },
      }],
    });

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
    
    const addToCartMobileButton = document.getElementById('button-add-to-cart-mobile');
    if (addToCartMobileButton) {
      addToCartMobileButton.addEventListener('click', () => {
        const quantity = document.querySelector("#add-to-cart > div.show-on-mobile.buy-now-mobile.row.w-100.d-flex > div.col-2.number-quantity.pl-0 > input").value;
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
    window.Novanet.init({
      event: 'purchase',
      productDetails: products,
    });

    document.querySelector(".btn-payment-success").addEventListener('click', () => {
      window.Novanet.init({
        event: 'purchase-complete',
        productDetails: products,
      });
    });
  }
});
