<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="wrapper">
          <form class="form bg-light">
            <div class="form__title">Регистрация</div>
            <Field
              :error="$v.name.$error"
              :input="touchData"
              error-message="Только символы алфавита"
              name="name"
              title="Имя"
              type="text"
            />
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
            <Field
              :error="$v.c_password.$error"
              :input="touchData"
              error-message="От 6 символов"
              name="c_password"
              title="Подтвердите пароль"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import {
  validateEmail,
  validatePassword,
  validateSpecCharacters
} from '~/components/utils/validations.js'
import Field from '~/components/ui/Field'

Vue.use(Vuelidate)

if (process.browser) {
  const VueCookies = require('vue-cookies')
  Vue.use(VueCookies)
}

export default {

  data() {
    return {
      name: '',
      email: '',
      pass: '',
      c_password: '',
      errorForm: null,
      loading: false
    }
  },

  components: {
    Field
  },

  validations: {
    name: {
      validateSpecCharacters
    },
    email: {
      validateEmail
    },
    pass: {
      validatePassword
    },
    c_password: {
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
        .post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.pass,
          c_password: this.c_password
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
            this.$router.push(`/user/profile`)
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
  .wrapper {
    display: flex;
    justify-content: center;
  }

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

