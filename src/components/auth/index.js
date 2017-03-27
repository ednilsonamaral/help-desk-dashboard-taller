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
        console.log(res)

        if (res.data.success === true) {
          localStorage.setItem('token', res.data.token)
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
    this.user.authenticated = false
    localStorage.removeItem('token')
    console.log('ele saiu do sistema!')
    router.push({ path: '/login' })
  },

  checkAuth () {
    const jwt = localStorage.getItem('token')

    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'JWT ' + localStorage.getItem('token')
    }
  },

  getTickets () {
    axios.get(TICKETS_URL, {
      headers: this.getAuthHeader()
    })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
