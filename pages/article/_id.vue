<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="article">
          <div class="article__title">{{ article.articles_title }}</div>
          <div v-if="article.articles_description">{{ article.articles_description }}</div>
          <div v-if="article.articles_text">{{ article.articles_text }}</div>
          <div v-if="article.articles_created_user || article.articles_created_at" class="article__info">
            <div v-if="article.articles_created_user" class="info__author">{{ article.articles_created_user }}</div>
            <div v-if="article.articles_created_at" class="info__date">{{ article.articles_created_at }}</div>
          </div>
        </div>
        <div v-if="checkAccess(article.articles_created_user)" class="article__controls">
          <i class="fas fa-pencil-alt" />
          <i class="fas fa-times red" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: []
    }
  },

  async asyncData({params, app: { $axios } }) {
    const article = await $axios.$get(`/api/article/${params.id}`)
    return { article }
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .article {
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
