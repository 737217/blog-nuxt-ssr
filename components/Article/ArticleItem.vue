<template>
  <div class="article">
    <nuxt-link :to="`/article/${article.articles_slug}`" class="article__title">{{ article.articles_title }}</nuxt-link>
    <div v-if="article.articles_description" class="article__description">{{ article.articles_description }}</div>
    <div v-if="checkAccess(article.articles_created_user)" class="article__controls">
      <nuxt-link v-if="article.articles_slug" :to="`/admin/article/edit/${article.articles_slug}`"><i class="fas fa-pencil-alt" /></nuxt-link>
      <i class="fas fa-times red" @click="showConfirmModal" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      default: () => {},
      type: Object
    }
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

    deleteItem() {
      const articleId = this.article.id
      this.$axios
        .delete(`/api/admin/article/${articleId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getUser.token}`
          }
        })
        .then(({ data }) => {
          if (data) {
            this.$emit('deleteArticleItem', articleId)
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

    showConfirmModal() {
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
              this.deleteItem()
            }
          }
        ]
      });
    },

    hideConfirmModal() {
      this.$modal.hide('dialog');
    }
  }
}
</script>

<style lang="scss" scoped>
  .article {
    padding: 40px;
    border: 1px solid #aaa;
    border-radius: 8px;
    margin-bottom: 40px;
    position: relative;

    &__title {
      font-size: 25px;
      font-weight: bold;
    }

    &__controls {
      position: absolute;
      top: 10px;
      right: 15px;

      i {
        opacity: 0.5;
        cursor: pointer;
        font-size: 12px;
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
  /deep/ div.dialog-content {
    text-align: center !important;
  }
</style>

