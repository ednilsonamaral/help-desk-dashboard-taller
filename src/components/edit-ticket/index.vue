<template>
  <div class="hello">
    <MenuComponent></MenuComponent>

    <div class="container">
      <div class="row" style="margin-top: 50px;" v-if="error === true">
        <h2 class="title">Editando Ticket</h2>

        <div class="col s12 box-tickets">
          <form class="col s12" style="margin-top: 50px;">
            <div class="row">
              <header class="col s12">
                <h3 class="codigo-ticket">Ticket {{ ticket.codigo }}</h3>
                <h4 class="categoria-ticket">Categoria: {{ ticket.categoria }}</h4>
                <h5 class="produto-ticket">Produto: {{ ticket.produto }}</h5>
                <h6 class="created-ticket">Criado em: {{ ticket.created | formatDate }}</h6>
              </header>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea" v-model="ticket.mensagem"></textarea>
                <label for="textarea1">Mensagem</label>
              </div>
            </div>

            <div class="row" v-if="ticket.status === 'Aguardando'">
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea" v-model="ticket.resposta"></textarea>
                <label for="textarea1">Resposta</label>
              </div>
            </div>

            <div class="row center-align">
              <div class="col s12">
                <button class="btn btn-save" type="submit" @click="onSubmitEditTicket($event)" data-target="modal1">confirmar e salvar</button>
                <button class="btn btn-default" type="submit" @click="onSubmitCloseTicket($event)" data-target="modal1">fechar ticket</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row" style="margin-top: 50px;" v-if="error === true && atendimento === true">
        <h2 class="title">Histórico de Atendimento</h2>

        <div class="col s12 box-tickets" style="padding-top: 50px;">
          <div class="row">
            <section class="col s12 atendimento">
              <h6 class="created-ticket">Data em: {{ ticket.created | formatDate }} - José da Silva</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
          </div>

          <div class="row center-align">
            <div class="col s12">
              <button class="btn btn-default" type="submit" data-target="modal1">fechar ticket</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-top: 50px;" v-if="error === false">
        <div class="col s12 center-align">
          <h2 class="title">Ticket editado/fechado com sucesso!</h2>
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

      idTicket: '',

      ticket: [],

      error: true,

      atendimento: false
    }
  },

  mounted: function () {
    auth.checkAuth()

    auth.getAuthHeader()
    console.log('header: ', auth.getAuthHeader())

    this.idTicket = this.$route.params.id_ticket
    auth.getTicketById(this, this.idTicket)

    $('select').material_select()
  },

  methods: {
    onSubmitEditTicket: function () {
      console.log('o que tá sendo enviado para updateTicketById: ', this.ticket)
      auth.updateTicketById(this, this.ticket, this.idTicket)
    },

    onSubmitCloseTicket: function () {
      console.log('o que tá sendo enviado para closeTicket: ', this.ticket)
      auth.closeTicket(this, this.ticket, this.idTicket)
    }
  }
}
</script>

<style>
.btn-save {
  background-color: #29292f;
}

.btn-save:focus, .btn-save:hover{
  background-color: #E02438;
}

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

textarea.materialize-textarea {
  padding: 3rem 0 1.6rem 0;
}

.codigo-ticket {
  font-size: 26px;
}

.categoria-ticket {
  font-size: 23px;
}

.produto-ticket {
  font-size: 20px;
}

.created-ticket {
  font-size: 17px;
}

.atendimento {
  border-bottom: 1px solid #29292f;
}
</style>
