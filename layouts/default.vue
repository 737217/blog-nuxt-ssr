<template>
  <div>
    <Header />
    <nuxt />
    <no-ssr>
      <v-dialog />
    </no-ssr>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from '~/components/Header/Header'
import VueJwtDecode from 'vue-jwt-decode'

if (process.browser) {
  const VueCookies = require('vue-cookies')
  Vue.use(VueCookies)
}

export default {
  components: {
    Header
  },

  created() {
    if (process.client) {
      const token = this.$cookies.get('authentication')
      if (token) {
        const user = this.$store.state.authUser
        if(!user) {
          const decodeToken = VueJwtDecode.decode(token)
          this.$axios
            .post('/api/details', {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
            })
            .then(({ data }) => {
              if (data) {
                this.$store.commit('authUser', {
                  id: data.id,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  token
                })
              }
            })
            .catch(err => {
              this.$cookies.remove('authentication')
              console.log('error', err)
            })
        }
      }
    }
  }
}
</script>


<style>
html {
  font-family: 'IBM Plex Sans', sans-serif;
}
</style>
