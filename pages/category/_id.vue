<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="category">
          <div class="category__title">{{ category.categories_title }}</div>
          <div v-if="category.categories_description">{{ category.categories_description }}</div>
          <div v-if="category.categories_text">{{ category.categories_text }}</div>
          <div v-if="category.categories_created_user || category.created_at" class="category__info">
            <div v-if="category.categories_created_user" class="info__author">{{ category.categories_created_user }}</div>
            <div v-if="category.created_at" class="info__date">{{ category.created_at }}</div>
          </div>
        </div>
        <div v-if="checkAccess(category.categories_created_user)" class="category__controls">
          <nuxt-link :to="`/admin/category/edit/${category.categories_slug}`"><i class="fas fa-pencil-alt" /></nuxt-link>
          <i class="fas fa-times red" @click="showConfirmModal(category.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: []
    }
  },

  async asyncData({params, app: { $axios } }) {
    const category = await $axios.$get(`/api/category/${params.id}`)
    return { category }
  },

  computed: {
    getUser() {
      return this.$store.state.authUser
    }
  },

  methods: {
    checkAccess(createdUser) {
      const user = this.getUser;
      return user ? createdUser === user.id : false
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
            this.$router.push('/')
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

<style lang="scss" scoped>
  .category {
    &__controls {
      border-top: 1px solid #aaa;
      padding: 20px 0;
      margin: 20px 0;

      i {
        opacity: 0.5;
        cursor: pointer;
      }

      i:hover {
        opacity: 1;
      }

      i:first-child {
        margin-right: 5px;
      }

      .red:hover {
        color: #E51000;
      }
    }
  }
</style>
