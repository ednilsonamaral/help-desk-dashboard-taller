<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted: function () {
    // auth.checkAuth()

    $('.button-collapse').sideNav({
      edge: 'left',
      closeOnClick: true
    })
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
}
</style>
