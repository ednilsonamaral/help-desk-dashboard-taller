<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">
          <span>Tickets</span>
        </a>

        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>

        <ul class="right hide-on-med-and-down">
          <li><router-link to="/">Inicio</router-link></li>
        </ul>

        <ul class="side-nav" id="mobile-demo">
          <li><router-link to="/">Inicio</router-link></li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted: function () {
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

nav {
  background-color: #29292f;
  margin-bottom: 20px;
}

nav a {
  color: #E02438;
}

nav ul a:hover {
    background-color: #E02438;
}

nav .nav-wrapper {
  padding: 0 20px;
}

nav .nav-wrapper .brand-logo {
  color: #E02438;
  font-style: italic;
  font-weight: bold;
  text-transform: lowercase;
  letter-spacing: -0.01em;
}
</style>
