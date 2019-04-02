<template>
  <div class="container">
    <div class="row">
      <div class="col-9">
        <div class="form__wrapper">
          <form v-if="article" class="form bg-light">
            <div class="form__title">Редактирование статьи</div>
            <no-ssr>
              <Field
                :error="$v.article.articles_title.$error"
                :input="touchData"
                error-message="Только символы алфавита"
                name="title"
                title="Название"
                type="passed"
                :value="article.articles_title"
              />
            </no-ssr>
            <no-ssr>
              <Field
                :error="$v.article.articles_description.$error"
                :input="touchData"
                error-message="Только символы алфавита"
                name="description"
                title="Описание"
                type="passed"
                :value="article.articles_description"
              />
            </no-ssr>
            <no-ssr>
              <Slug :string="article.articles_title" @slug="setSlug($event)" />
            </no-ssr>
            <no-ssr>
              <DropDown
                placeholder="Выберите из списка"
                label="Категория"
                prefix="articles"
                :options="categories"
                :selected="articleCategory"
                :label-style="{
                  margin: '0 0 6px 0',
                  fontSize: '12px',
                  color: '#aaa'
                }"
                :placeholder-style="{
                  fontSize: '12px',
                  color: '#ccc'
                }"
                :multiple="true"
                @updateOption="selectCategory"
              />
            </no-ssr>
            <no-ssr>
              <div class="form__textarea">
                <label class="field__label">Текст</label>
                <tiny-mce id="desc" v-model="article.articles_text"
                  :other-props="{ plugins :'link image code link image advlist autolink lists charmap print preview fullscreen nonbreaking paste table textpattern hr imagetools wordcount media anchor' }"
                  :toolbar="['formatselect | code link image | advlist autolink lists charmap print preview fullscreen nonbreaking paste table textpattern hr imagetools wordcount media anchor | undo redo']">
                </tiny-mce>
              </div>
            </no-ssr>
            <div>
              <Switches :condition="getArticleActiveStatus" @switcher-status="toggleActiveStatus($event)" class="form__switches" />
              <span class="form__switches-label">{{ getActiveFieldName }}</span>
            </div>
            <no-ssr>
              <button
                type="button"
                class="btn btn-primary form__send-btn"
                @click="sendForm"
              >Отправить</button>
            </no-ssr>
          </form>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Vuelidate from 'vuelidate'
import {
  validateSpecCharacters,
  validateDescription
  } from '~/components/utils/validations.js'
import Field from '~/components/ui/Field'
import Switches from '~/components/ui/Switches'
import DropDown from '~/components/ui/DropDown'
import Slug from '~/components/ui/Slug'

if (process.browser) {
  const VueCookies = require('vue-cookies')
  Vue.use(VueCookies)
  Vue.use(Vuelidate)
}

export default {

  data() {
    return {
      article: {
        articles_active: true
      },
      user: '',
      errorForm: null,
      loading: false,
      categories: null,
      slug: null,
      articleCategory: null,
      articleCategoriesId: null
    }
  },

  async asyncData({params, app: { $axios } }) {
    const data = await $axios.$get(`/api/article/${params.id}`)
    const categories = await $axios.$get(`/api/category`)
    return {
      article: data.article,
      articleCategory: data.article_category,
      categories
      }
  },

  components: {
    Field,
    Switches,
    DropDown,
    Slug
  },

  validations: {
    article: {
      articles_title: {
        validateSpecCharacters
      },
      articles_description: {
        validateSpecCharacters
      }
    }
  },

  computed: {
    ...mapState({ getUser: 'authUser' }),

    // getSendButtonStatus() {
    //   if (process.client) {
    //     console.log('v', this.$v)
    //     return !this.errorForm && !this.loading && !this.$v.$invalid
    //   }
    // },

    getCreatedTime() {
      return this.article.created_at
    },

    getActiveFieldName() {
      return this.article.active ? 'Активна' : 'Не активна'
    },

    getArticleActiveStatus() {
      return this.article.articles_active ? true : false
    },

    getToken() {
      return this.getUser ? this.getUser.token : null
    },
  },

  created() {
    this.article.articles_text = this.article.articles_text || ''
  },

  methods: {
    touchData(name, value) {
      const prefix = `articles_${name}`
      this.article[prefix] = value
      this.$v.article[prefix].$touch()
    },

    toggleActiveStatus(status) {
      this.article.articles_active = status
    },

    sendForm() {
      this.loading = true
      if(this.getToken) {
        this.$axios
        .put(`/api/admin/article/${this.article.articles_slug}`, {
          title: this.article.articles_title,
          description: this.article.articles_description,
          text: this.article.articles_text,
          active: this.article.articles_active,
          old_slug: this.article.articles_slug,
          slug: this.slug,
          categories: this.articleCategoriesId
        },
        {
          headers: {
            Authorization: `Bearer ${this.getToken}`,
            'content-type': 'application/json;charset=UTF-8'
          }
        }
        )
        .then(({ data }) => {
          if (data) {
            this.$router.push('/admin/article')
          } else {
            this.errorForm = true
          }
          this.loading = false
        })
        .catch(err => {
          console.log('err', err)
          this.errorForm = true
          this.loading = false
        })
      }
    },

    selectCategory(categories) {
      this.articleCategoriesId = categories.map(item => item.id)
    },

    setSlug(slug) {
      this.slug = slug.toLowerCase();
    }
  }
}
</script>

<style lang="scss" scoped>
.form__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 100%;
    padding: 40px;
    border-radius: 18px;
    margin-top: 40px;

    &__title {
      margin-bottom: 20px;
      color: #aaa;
      font-size: 18px;
      font-weight: bold;
    }

    &__send-btn {
      margin-top: 20px;
    }

    &__active-field {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #aaa;

      span {
        margin-right: 5px;
        flex-wrap: nowrap;
      }

      input:focus {
        outline: none;
        border: none;
        border-color: unset;
        box-shadow: unset;
      }
    }

    .field__label {
      margin: rem(20px 0 6px);
      font-size: 12px;
      color: #aaa;
      margin: 0;
    }

    &__textarea {
      margin-bottom: 20px;
    }

    &__switches {
        display: inline-block;
      }

      &__switches-label {
        font-size: 12px;
        color: #ccc;
      }
  }
}
</style>
