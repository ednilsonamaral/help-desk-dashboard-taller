<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">
        <span>Tickets</span>
      </a>

      <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>

      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/login" v-if="user.authenticated" @click="logout()">Sair</router-link></li>
      </ul>

      <ul class="side-nav" id="mobile-demo">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/login" v-if="user.authenticated" @click="logout()">Sair</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import auth from '../auth'

export default {
  name: 'menu',

  data () {
    return {
      user: auth.user
    }
  },

  mounted: function () {
    auth.checkAuth()

    $('.button-collapse').sideNav({
      edge: 'left',
      closeOnClick: true
    })
  }
}
</script>

<style>
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

.title-taller {
  color: #E02438;
  font-style: italic;
  font-weight: bold;
  text-transform: lowercase;
  letter-spacing: -0.01em;
}
</style>
