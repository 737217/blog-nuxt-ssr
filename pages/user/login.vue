<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="form__wrapper">
          <LoginForm redirectToPage="/" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
  .form__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

