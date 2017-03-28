import { router } from '../../main'
import axios from 'axios'

const API_URL = 'http://localhost:8282/api'
const AUTH_URL = API_URL + '/auth'
const TICKETS_URL = API_URL + '/tickets'

export default {
  user: {
    authenticated: false
  },

  login (context, creds) {
    axios.post(AUTH_URL, creds)
      .then((res) => {
        console.log('res de login: ', res)

        if (res.data.success === true) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id_usuario', res.data.id_usuario)
          this.authenticated = true
          router.push({ path: '/' })
        }

        if (res.data.success === false) {
          this.user = null
          this.statusErro = true
          alert(res.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
        context.error = error
      })
  },

  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('id_usuario')
    this.user.authenticated = false

    if (!localStorage.getItem('token')) {
      console.log('removeu o token')
      router.push({ path: '/login' })
    } else {
      console.log('nao removeu o token')
    }
  },

  checkAuth () {
    const jwt = localStorage.getItem('token')

    if (jwt) {
      this.user.authenticated = true
      console.log('token válido')
    } else {
      this.user.authenticated = false
      console.log('token inválido')
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'JWT ' + localStorage.getItem('token')
    }
  },

  getTickets (context) {
    axios.get(TICKETS_URL, {
      headers: this.getAuthHeader()
    })
    .then((res) => {
      console.log('res de tickets: ', res)
      context.tickets = res.data.data
    })
    .catch((error) => {
      console.log('res do error de tickets: ', error)

      if (error) {
        console.log('oi erro 401')
        router.push({ path: '/login' })
      }
    })
  },

  getTicketById (context, id) {
    const url = TICKETS_URL + '/' + id
    // console.log('url: ', url)

    axios.get(url, {
      headers: this.getAuthHeader()
    })
    .then((res) => {
      console.log('res de ticket by id: ', res)
      context.ticket = res.data.data
    })
    .catch((error) => {
      console.log('res do error de ticket by id: ', error)

      if (error) {
        console.log('oi erro 401')
        router.push({ path: '/login' })
      }
    })
  },

  newTicket (context, infos) {
    const headers = {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    }

    axios.post(TICKETS_URL, {
      id_usuario: localStorage.getItem('id_usuario'),
      categoria: infos.categoria,
      produto: infos.produto,
      mensagem: infos.mensagem,
      resposta: null,
      atendimento: '--',
      status: 'Em aberto'
    }, headers)
    .then((res) => {
      console.log('res de new ticket: ', res)
      context.error = false
    })
    .catch((error) => {
      console.log('erro de new ticket: ', error)
      context.error = error
    })
  },

  updateTicketById (context, infos, idTicket) {
    const headers = {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    }

    const url = TICKETS_URL + '/' + idTicket
    // console.log('url de put: ', url)

    axios.put(url, {
      id_usuario: localStorage.getItem('id_usuario'),
      codigo: infos.codigo,
      categoria: infos.categoria,
      produto: infos.produto,
      mensagem: infos.mensagem,
      resposta: infos.resposta,
      atendimento: '--',
      status: 'Em aberto'
    }, headers)
    .then((res) => {
      console.log('res de updateTicketById ticket: ', res)
      context.error = false
    })
    .catch((error) => {
      console.log('erro de updateTicketById ticket: ', error)
      context.error = error
    })
  },

  closeTicket (context, infos, idTicket) {
    const headers = {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
    }

    const url = TICKETS_URL + '/' + idTicket
    // console.log('url de put: ', url)

    axios.put(url, {
      id_usuario: localStorage.getItem('id_usuario'),
      codigo: infos.codigo,
      categoria: infos.categoria,
      produto: infos.produto,
      mensagem: infos.mensagem,
      resposta: infos.resposta,
      atendimento: '--',
      status: 'Fechado'
    }, headers)
    .then((res) => {
      console.log('res de closeTicket ticket: ', res)
      context.error = false
    })
    .catch((error) => {
      console.log('erro de closeTicket ticket: ', error)
      context.error = error
    })
  }
}
