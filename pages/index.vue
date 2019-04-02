<template>
  <section class="container">
    <div class="row">
      <div class="col-10">
        <div class="row mt40">
          <div class="col-6">
            <ul class="category__list">
              <li v-for="(category, key) in categories" :key="key" class="category__item">
                <nuxt-link :to="`/category/${category.categories_slug}`">{{ category.categories_title }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div v-for="(article, key) in getArticles" :key="key" class="col-6">
            <ArticleItem :article="article" @deleteArticleItem="deleteArticle($event)" />
          </div>
        </div>
      </div>
      <div class="col-2">
        <!-- <div class="sidebar">
          <nuxt-link :to="'/admin/article/create'" class="btn btn-success">Создать статью</nuxt-link>
          <nuxt-link :to="'/category/create'" class="btn btn-success">Создать категорию</nuxt-link>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import Field from '~/components/ui/Field'
import ArticleItem from '~/components/Article/ArticleItem'

export default {
  data() {
    return {
      articles: [],
      categories: []
    }
  },

  async asyncData({ app: { $axios } }) {
    const articles = await $axios.$get(`/api/article`)
    const categories = await $axios.$get('/api/category')
    return {
      articles,
      categories
    }
  },

  components: {
    Field,
    ArticleItem
  },

  computed: {
    getUser() {
      return this.$store.state.authUser
    },

    getArticles() {
      const art = this.articles.reduce((acc, n) => (!acc[n.id] && (acc[n.id] = n), acc), [])
      return art.filter(item => item)
    }
  },

  methods: {
    // touchData(name, value) {
    //   this[name] = value
    //   this.$v[name].$touch()
    // },

    deleteArticle(id) {
      this.articles = this.articles.filter(item => item.id !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    &__test {
      font-size: 16px;
    }

    .articles__wrapper {
      margin-top: 40px;
    }

    .sidebar {
      margin-top: 40px;
    }

    .mt40 {
      margin-top: 40px;
    }

    .category {
      &__list {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-bottom: 40px;
      }

      &__item {
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
        margin-bottom: 10px;

        a {
          color: #fff;
          font-size: 14px;
          padding: 5px;
          background: #aaa;
          transition: .3s;
          border-radius: .25rem;
        }
      }

      &__item:hover a {
        color: #aaa;
        text-decoration: none;
        background: rgba(170, 170, 170, 0.5);
      }

      &__item:last-child {
        margin-right: 0;
      }
    }
  }
</style>
