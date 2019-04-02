<template>
  <form class="form bg-light">
    <div class="form__title">Авторизация</div>
    <Field
      :error="$v.email.$error"
      :input="touchData"
      error-message="Не корректный email"
      name="email"
      title="Почта"
      type="email"
    />
    <Field
      :error="$v.pass.$error"
      :input="touchData"
      error-message="От 6 символов"
      name="pass"
      title="Пароль"
      type="password"
    />
    <button
      v-if="getSendButtonStatus"
      type="button"
      class="btn btn-primary form__send-btn"
      @click="sendForm"
    >Отправить</button>
    <button v-else type="button" class="btn btn-primary form__send-btn" disabled>Отправить</button>
  </form>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {
  validateEmail,
  validatePassword
} from '~/components/utils/validations.js'
import Field from '~/components/ui/Field'

Vue.use(Vuelidate)

if (process.browser) {
  const VueCookies = require('vue-cookies')
  Vue.use(VueCookies)
}

export default {

  props: {
    redirectToPage: {
      default: '',
      type: String
    }
  },

  data() {
    return {
      email: '',
      pass: '',
      errorForm: null,
      loading: false
    }
  },

  components: {
    Field
  },

  validations: {
    email: {
      validateEmail
    },
    pass: {
      validatePassword
    }
  },

  computed: {
    getSendButtonStatus() {
      return !this.errorForm && !this.loading && !this.$v.$invalid
    }
  },

  methods: {
    touchData(name, value) {
      this[name] = value
      this.$v[name].$touch()
    },

    sendForm() {
      this.loading = true
      this.$axios
        .post('/api/login', {
          email: this.email,
          password: this.pass
        })
        .then(({ data }) => {
          if (data) {
            this.$store.commit('authUser', {
              auth: true,
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role,
              token: data.token
            })
            this.$cookies.set('authentication', data.token)
            this.redirectToPage && this.$router.push(this.redirectToPage)
          } else {
            this.errorForm = true
          }
          this.loading = false
        })
        .catch(err => {
          this.errorForm = true
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    width: 370px;
    padding: 40px;
    border-radius: 18px;
    margin-top: 40px;

    &__title {
      margin-bottom: 20px;
      color: #aaa;
      font-size: 18px;
      font-weight: bold;
    }

    &__send-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
</style>

