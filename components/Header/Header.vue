<template>
  <div class="navbar navbar-light bg-light">
    <div class="container">
      <div class="flex-wide">
        <nuxt-link :to="'/'" class="logo btn btn-link">Blog</nuxt-link>
        <div v-if="getUser" class="controlls">
          <nuxt-link v-if="getUser" :to="`/user/profile`" class="btn btn-link">{{ getUser.name }}</nuxt-link>
          <span>|</span>
          <button class="btn btn-link" @click="logout">Logout</button>
          <span v-if="isUserAdmin">|</span>
          <nuxt-link v-if="isUserAdmin" :to="'/admin'" class="btn btn-link">Admin Panel</nuxt-link>
        </div>
        <div v-else class="controlls">
          <nuxt-link :to="`/user/login`" class="btn btn-link">Login</nuxt-link>
          <span>|</span>
          <nuxt-link :to="'/user/registration'" class="btn btn-link">Register</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.authUser
    }
  },

  computed: {
    getUser() {
      return this.$store.state.authUser
    },

    isUserAdmin() {
      return this.getUser.role === 'admin' ? true : false
    }
  },

  methods: {
    logout() {
      this.$cookies.remove('authentication')
      this.$store.commit('authUser', null)
      this.$router.push('/')
    }
  }
}
</script>



<style lang="scss" scoped>
  .logo {
    padding-left: 0;
  }

  .controlls {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>

