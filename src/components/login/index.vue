<template>
  <div class="container">
    <div class="row">
      <div>
        <h1 class="center-align text-welcome">Bem vindo ao Suporte de Usuário da <span class="title-taller">Taller</span></h1>
        <h2 class="center-align description-welcome">Por favor, digite seu e-mail e senha cadastrado para entrar</h2>
      </div>

      <div v-if="error">
        {{ error }}
      </div>

      <form class="col s12" v-on:submit="onSubmit($event)">
        <div class="row">
          <div class="input-field col s12">
            <input id="email_field" type="email" v-model="user.email">
            <label for="email_field">E-mail</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input id="password_field" type="password" v-model="user.password">
            <label for="password_field">Senha</label>
          </div>
        </div>

        <div class="row center-align">
          <button class="btn btn-default" type="submit" data-target="modal1">entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'login',

  data () {
    return {
      user: {
        email: '',
        password: ''
      },

      error: '',

      statusErro: false
    }
  },

  mounted: function () {
    console.log('token de login: ', localStorage.getItem('token'))
  },

  methods: {
    onSubmit: function () {
      console.log('nome de usuário: ', this.user.email)
      console.log('statusErro: ', this.statusErro)

      const credentials = {
        email: this.user.email,
        password: this.user.password
      }

      auth.login(this, credentials)
    }
  }
}
</script>

<style>
.text-welcome {
  font-size: 24px;
  font-weight: normal;
}

.description-welcome {
  font-size: 20px;
}

input:not([type]):focus:not([readonly]), input[type=text]:focus:not([readonly]), input[type=password]:focus:not([readonly]), input[type=email]:focus:not([readonly]), input[type=url]:focus:not([readonly]), input[type=time]:focus:not([readonly]), input[type=date]:focus:not([readonly]), input[type=datetime]:focus:not([readonly]), input[type=datetime-local]:focus:not([readonly]), input[type=tel]:focus:not([readonly]), input[type=number]:focus:not([readonly]), input[type=search]:focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
  border-bottom: 1px solid #E02438;
  box-shadow: 0 1px 0 0 #E02438;
}

input:not([type]):focus:not([readonly])+label, input[type=text]:focus:not([readonly])+label, input[type=password]:focus:not([readonly])+label, input[type=email]:focus:not([readonly])+label, input[type=url]:focus:not([readonly])+label, input[type=time]:focus:not([readonly])+label, input[type=date]:focus:not([readonly])+label, input[type=datetime]:focus:not([readonly])+label, input[type=datetime-local]:focus:not([readonly])+label, input[type=tel]:focus:not([readonly])+label, input[type=number]:focus:not([readonly])+label, input[type=search]:focus:not([readonly])+label, textarea.materialize-textarea:focus:not([readonly])+label {
  color: #E02438;
}

.btn-default {
  background-color: #E02438;
}

.btn:hover, .btn:focus {
  background-color: #29292f;
}
</style>
