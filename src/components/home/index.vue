<template>
  <div class="hello">
    <MenuComponent></MenuComponent>

    <div class="container">
      <div>
        <h1 class="center-align text-welcome">Bem vindo ao Suporte de Usuário da <span class="title-taller">Taller</span></h1>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import MenuComponent from '../menu/'

const components = { MenuComponent }

export default {
  name: 'hello',

  components,

  data () {
    return {
      user: auth.user
    }
  },

  mounted: function () {
    console.log('oi')
    auth.getTickets()
  }
}
</script>

<style></style>
