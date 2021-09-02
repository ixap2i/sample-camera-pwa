<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  mehtods: {
    checkInstalledSW: function() {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          // @ts-ignore
          navigator.serviceWorker.register('/sw.js')
            // @ts-ignore
            .then(function(registration) {
              // 登録成功
              console.log('ServiceWorker 登録成功: ', registration.scope);
            })
            // @ts-ignore
            .catch(function(err) {
              // 登録失敗 :(
              console.log('ServiceWorker 登録失敗: ', err);
            });
        });
      } else {
        console.log('nothin');
      }
    }
  },
  mounted: {
    checkInstalledSW();
  }
}

</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
