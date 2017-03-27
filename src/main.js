import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/home/'
import Login from './components/login/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: Home
  },
  {
    path: '/login', component: Login
  }
]

const router = new VueRouter({ routes })

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

export { router }
