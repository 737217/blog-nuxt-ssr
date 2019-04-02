<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <div v-if="getUser" class="user">
          <div class="user__name user__row">
            <div class="row">
              <div class="col-6">Имя:</div>
              <div class="col-6">{{ getUser.name }}</div>
            </div>
          </div>
          <div class="user__email user__row">
            <div class="row">
              <div class="col-6">Email:</div>
              <div class="col-6">{{ getUser.email }}</div>
            </div>
          </div>
          <div class="user__role user__row">
            <div class="row">
              <div class="col-6">Роль:</div>
              <div class="col-6">{{ getUser.role }}</div>
            </div>
          </div>
          <nuxt-link :to="''">Редактировать</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    getUser() {
      return this.$store.state.authUser
    }
  }
}
</script>


<style lang="scss" scoped>
  .user {
    padding: 40px;
    border: 1px solid #aaa;
    border-radius: 16px;
    margin: 40px 0 20px;

    &__row {
      margin-bottom: 10px;
    }

    &__name {
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
