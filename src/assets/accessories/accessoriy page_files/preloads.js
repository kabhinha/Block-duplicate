
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.e9ebf04875266944df05.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/388.latest.en.1658a4772b1e03df6701.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/441.latest.en.0f2c6cff2138a0904d5b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/598.latest.en.e186c95620d21d5c9a36.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.4a2096c9d81d02f5536f.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/731.latest.en.13d4de92b88330e8fea9.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/774.latest.en.7867c07f92b20fba0782.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/844.latest.en.7fcd45ae446a9a5574e8.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/Redesign.latest.en.1d7710101a4a1029f063.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/388.latest.en.df16872f1e48c24666dd.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.e73cab4b1bb1fcdbd393.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/774.latest.en.1b231ed8ab2615919160.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/661.latest.en.ce37aebb11b25abd7a4e.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0215/8508/files/ratio-logo-black_0bc1ed91-69bc-4d7b-ad5b-42907f6cf8a2_x320.png?v=1631229708"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res[0], next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  