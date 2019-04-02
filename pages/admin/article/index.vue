<template>
  <div v-if="getUser" class="container">
    <div class="row">
      <div class="col-12">
        <div>
          <nuxt-link :to="'/admin/article/create'" class="btn btn-success">Создать статью</nuxt-link>
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
            <tr v-for="(article, key) in articles" :key="key">
              <th scope="row">{{ article.id }}</th>
              <td><nuxt-link :to="`/admin/article/edit/${article.articles_slug}`">{{ article.articles_title }}</nuxt-link></td>
              <td>{{ article.name }}</td>
              <td>{{ getArticleActive(article.articles_active) }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <nuxt-link :to="`/article/${article.articles_slug}`" class="btn btn-primary">View</nuxt-link>
                  <nuxt-link :to="`/admin/article/edit/${article.articles_slug}`" class="btn btn-warning">Edit</nuxt-link>
                  <button type="button" class="btn btn-danger" @click="showConfirmModal(article.id)">Delete</button>
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
      articles: null
    }
  },

  async asyncData({ app: { $axios } }) {
    const articles = await $axios.$get(`/api/article`)
    return { articles }
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
        .delete(`/api/admin/article/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getUser.token}`
          }
        })
        .then(({ data }) => {
          if (data) {
            this.articles = this.articles.filter(item => item.id !== id)
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
