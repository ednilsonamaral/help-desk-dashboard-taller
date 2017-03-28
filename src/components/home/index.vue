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

            <div class="col s12 m4 l4">
              <div class="input-field col s12">
                <select v-model="filter.categoria">
                  <option value="">Escolha a sua opção</option>
                  <option value="1">Dúvida</option>
                  <option value="2">Conta Violada</option>
                  <option value="3">Reembolso</option>
                </select>
                <label>Categoria</label>
              </div>
            </div>

            <div class="col s12 m4 l4">
              <div class="input-field col s12">
                <select v-model="filter.produto">
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

            <div class="col s12 m4 l4">
              <button class="btn btn-default" type="submit" @click="filtersActive($event)">filtrar</button>
            </div>
          </header>

          <section class="table-tickets" style="margin-top: 115px;">
            <table class="table" v-if="filters === true">
              <thead>
                <tr>
                  <th class="center-align">Código</th>
                  <th class="center-align">Categoria</th>
                  <th class="center-align">Produto</th>
                  <th class="center-align">Criado em <i class="fa fa-sort"></i></th>
                  <th class="center-align">Última atualização <i class="fa fa-sort"></i></th>
                  <th class="center-align">Atendimento</th>
                  <th class="center-align">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="ticket in tickets" v-if="ticket.categoria === filter.categoria">
                  <td class="center-align">
                    <router-link v-if="ticket.status !== 'Fechado'" :to="{ name: 'editTicket', params: { id_ticket: ticket._id }}">{{ ticket.codigo }}</router-link>
                    <span v-if="ticket.status === 'Fechado'">{{ ticket.codigo }}</span>
                  </td>

                  <td class="center-align">{{ ticket.categoria }}</td>
                  <td class="center-align">{{ ticket.produto }}</td>
                  <td class="center-align">{{ ticket.created | formatDate }}</td>
                  <td class="center-align">{{ ticket.updated | formatDate }}</td>
                  <td class="center-align">{{ ticket.atendimento }}</td>
                  <td class="center-align">
                    <span v-if="ticket.status !== 'Aguardando'">{{ ticket.status }}</span>

                    <span v-if="ticket.status === 'Aguardando'">
                      <router-link :to="{ name: 'editTicket', params: { id_ticket: ticket._id }}">Responder</router-link>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <br><br><br>

            <table class="table" v-if="filters === false">
              <thead>
                <tr>
                  <th class="center-align">
                    <a href="#" @click="filterOrderBy($event, 'ticket.codigo')">
                      Código
                    </a>
                  </th>

                  <th class="center-align">Categoria</th>
                  <th class="center-align">Produto</th>

                  <th class="center-align">
                    <a href="#" @click="filterOrderBy($event, 'ticket.created')">
                      Criado em <i class="fa fa-sort"></i>
                    </a>
                  </th>


                  <th class="center-align">
                    <a href="#" @click="filterOrderBy($event, 'ticket.updated')">
                      Última atualização <i class="fa fa-sort"></i>
                    </a>
                  </th>

                  <th class="center-align">Atendimento</th>
                  <th class="center-align">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="ticket in orderedTickets">
                  <td class="center-align">
                    <router-link v-if="ticket.status !== 'Fechado'" :to="{ name: 'editTicket', params: { id_ticket: ticket._id }}">{{ ticket.codigo }}</router-link>
                    <span v-if="ticket.status === 'Fechado'">{{ ticket.codigo }}</span>
                  </td>

                  <td class="center-align">{{ ticket.categoria }}</td>
                  <td class="center-align">{{ ticket.produto }}</td>
                  <td class="center-align">{{ ticket.created | formatDate }}</td>
                  <td class="center-align">{{ ticket.updated | formatDate }}</td>
                  <td class="center-align">{{ ticket.atendimento }}</td>
                  <td class="center-align">
                    <span v-if="ticket.status !== 'Aguardando'">{{ ticket.status }}</span>

                    <span v-if="ticket.status === 'Aguardando'">
                      <router-link :to="{ name: 'editTicket', params: { id_ticket: ticket._id }}">Responder</router-link>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import MenuComponent from '../menu/'
import _ from 'lodash'

const components = { MenuComponent }

export default {
  name: 'home',

  components,

  data () {
    return {
      user: auth.user,

      tickets: [],

      filter: {
        categoria: '',
        produto: ''
      },

      filters: false,

      orderColCreated: 'created',
      orderColUpdated: 'updated',
      orderInverse: 1
    }
  },

  mounted: function () {
    auth.checkAuth()
    auth.getTickets(this)

    $('select').material_select()
  },

  methods: {
    filtersActive: function () {
      this.filters = true
    },

    filterOrderBy: function (e, col) {
      this.orderColCreated = col
      this.orderInverse = this.orderInverse * -1
      console.log(this.orderInverse)
    }
  },

  computed: {
    orderedTickets: function () {
      return _.orderBy(this.tickets, 'codigo')
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

@media only screen and (max-width: 690px) {
  table.table {
    overflow: scroll;
  }
}
</style>
