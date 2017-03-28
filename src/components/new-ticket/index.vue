<template>
  <div class="hello">
    <MenuComponent></MenuComponent>

    <div class="container">
      <div class="row" style="margin-top: 50px;" v-if="error === true">
        <h2 class="title">Criar Novo Ticket</h2>

        <div class="col s12 box-tickets">
          <form class="col s12" v-on:submit="onSubmitNewTicket($event)" style="margin-top: 50px;">
            <div class="row">
              <div class="input-field col s12">
                <span>Categoria</span>

                <select v-model="ticket.categoria" class="browser-default">
                  <option disabled value="">Escolha a sua opção</option>
                  <option>Dúvida</option>
                  <option>Conta Violada</option>
                  <option>Reembolso</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <span>Produto</span>

                <select class="browser-default" v-model="ticket.produto">
                  <option disabled value="">Escolha a sua opção</option>
                  <option>General War</option>
                  <option>Barbarians</option>
                  <option>Tablet Samsung</option>
                  <option>Gmail for Business</option>
                  <option>Outros</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea" v-model="ticket.mensagem"></textarea>
                <label for="textarea1">Mensagem</label>
              </div>
            </div>

            <div class="row center-align">
              <button class="btn btn-default" type="submit" data-target="modal1">criar novo ticket</button>
            </div>
          </form>
        </div>
      </div>

      <div class="row" style="margin-top: 50px;" v-if="error === false">
        <div class="col s12 center-align">
          <h2 class="title">Novo ticket criado com sucesso!</h2>
          <router-link to="/">- ir para a Home - </router-link>
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
  name: 'new-ticket',

  components,

  data () {
    return {
      user: auth.user,

      ticket: {
        categoria: '',
        produto: '',
        mensagem: ''
      },

      error: true
    }
  },

  mounted: function () {
    auth.checkAuth()

    auth.getAuthHeader()
    console.log('header: ', auth.getAuthHeader())

    $('select').material_select()
  },

  methods: {
    onSubmitNewTicket: function () {
      console.log('o que tá sendo enviado: ', this.ticket)
      auth.newTicket(this, this.ticket)
    }
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
