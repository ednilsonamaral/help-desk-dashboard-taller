import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/home/'
import Login from './components/login/'
import NewTicket from './components/new-ticket/'
import EditTicket from './components/edit-ticket/'

import moment from 'moment'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format('DD/MM/YYYY HH:mm')
  }
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: Home
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/newTicket', component: NewTicket
  },
  {
    name: 'editTicket', path: '/editTicket/:id_ticket', component: EditTicket
  }
]

const router = new VueRouter({ routes })

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export { router }
