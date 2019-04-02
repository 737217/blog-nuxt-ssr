<template>
  <div v-if="getUser" class="container">
    <div class="row">
      <div class="col-12">
        <div>
          <nuxt-link :to="'/admin/category/create'" class="btn btn-success">Создать категорию</nuxt-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">author</th>
              <th scope="col">active</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, key) in categories" :key="key">
              <th scope="row">{{ category.id }}</th>
              <td><nuxt-link :to="`/admin/category/edit/${category.categories_slug}`">{{ category.categories_title }}</nuxt-link></td>
              <!-- <td>{{ category.name }}</td> -->
              <td>{{ getArticleActive(category.categories_active) }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <nuxt-link :to="`/admin/category/edit/${category.categories_slug}`" class="btn btn-warning">Edit</nuxt-link>
                  <button type="button" class="btn btn-danger" @click="showConfirmModal(category.id)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      categories: null
    }
  },

  async asyncData({ app: { $axios } }) {
    const categories = await $axios.$get(`/api/category`)
    return { categories }
  },

  computed: {
    getUser() {
      return this.$store.state.authUser
    }
  },

  methods: {
    getArticleActive(item) {
      return item ? 'Активна' : 'Не активна'
    },

    deleteItem(id) {
      this.$axios
        .delete(`/api/admin/category/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getUser.token}`
          }
        })
        .then(({ data }) => {
          if (data) {
            this.categories = this.categories.filter(item => item.id !== id)
          } else {
            this.errorForm = true
          }
          this.loading = false
        })
        .catch(err => {
          this.errorForm = true
          this.loading = false
        })
    },

    showConfirmModal(id) {
      this.$modal.show('dialog', {
        title: 'Удалить элемент?',
        buttons: [
          {
            title: 'Отмена',
            handler: () => {
              this.hideConfirmModal()
            }
          },
          {
            title: 'Удалить',
            handler: () => {
              this.hideConfirmModal()
              this.deleteItem(id)
            }
          }
        ]
      })
    },

    hideConfirmModal() {
      this.$modal.hide('dialog');
    }
  }
}
</script>
