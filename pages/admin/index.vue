<template>
  <div v-if="getUser" class="container">
    <div class="row">
      <div class="col-3">
        <nav>
          <ul>
            <li><nuxt-link to="/admin/article">Статьи</nuxt-link></li>
            <li><nuxt-link to="/admin/category">Категории</nuxt-link></li>
            <li><nuxt-link to="/admin/article">Настройки</nuxt-link></li>
          </ul>
        </nav>
      </div>
      <div class="col-9">content</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.state.authUser
    }
  },

  created() {
    if(!this.getUser) {
      this.$router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
