// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// @ts-nocheck
'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        // 登録成功
        console.log('ServiceWorker 登録成功: ', registration.scope);
      })
      .catch(function(err) {
        // 登録失敗 :(
        console.log('ServiceWorker 登録失敗: ', err);
      });
  });
}
