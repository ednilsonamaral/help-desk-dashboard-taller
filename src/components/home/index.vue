<template>
  <div class="hello">
    <MenuComponent></MenuComponent>

    <div class="container">
      <div>
        <h1 class="center-align text-welcome">Bem vindo ao Suporte de Usuário da <span class="title-taller">Taller</span></h1>

        <router-link to="/newTicket" class="btn btn-default">criar novo ticket</router-link>
      </div>

      <div class="row" style="margin-top: 50px;">
        <h2 class="title">Histórico dos Tickets</h2>

        <div class="col s12 box-tickets">
          <header class="filtros">
            <h3 class="title">Filtrar por:</h3>

            <div class="col s4">
              <div class="input-field col s12">
                <select>
                  <option value="">Escolha a sua opção</option>
                  <option value="1">Dúvida</option>
                  <option value="2">Conta Violada</option>
                  <option value="3">Reembolso</option>
                </select>
                <label>Categoria</label>
              </div>
            </div>

            <div class="col s4">
              <div class="input-field col s12">
                <select>
                  <option value="">Escolha a sua opção</option>
                  <option value="1">General War</option>
                  <option value="2">Barbarians</option>
                  <option value="3">Tablet Samsung</option>
                  <option value="4">Gmail for Business</option>
                  <option value="5">Outros</option>
                </select>
                <label>Produto</label>
              </div>
            </div>

            <div class="col s4">
              <button class="btn btn-default" type="submit">filtrar</button>
            </div>
          </header>

          <section class="table-tickets" style="margin-top: 200px;">
            <ul>
              <li v-for="t in tickets">
                <router-link v-if="t.status !== 'Fechado'" :to="{ name: 'editTicket', params: { id_ticket: t._id }}">{{ t.codigo }}</router-link>
                <span v-if="t.status === 'Fechado'">{{ t.codigo }}</span>
                - {{ t.categoria }} - {{ t.produto }} - {{ t.created | formatDate }} - {{ t.updated | formatDate }} - {{ t.atendimento }} - {{ t.status }}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import MenuComponent from '../menu/'

const components = { MenuComponent }

export default {
  name: 'home',

  components,

  data () {
    return {
      user: auth.user,

      tickets: []
    }
  },

  mounted: function () {
    auth.checkAuth()
    auth.getTickets(this)

    $('select').material_select()
  }
}
</script>

<style>
.box-tickets {
  border: 1px solid #29292f;
  box-shadow: 1px 1px 1px #acacac;
  padding-bottom: 20px !important;
}

.title {
  font-size: 20px;
}

.filtros .title {
  font-size: 18px;
}

.dropdown-content li > a, .dropdown-content li > span {
  color: #E02438;
}
</style>
