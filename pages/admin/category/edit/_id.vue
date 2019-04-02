<template>
  <div class="container">
    <div v-if="getUser" class="row">
      <div class="col-9">
        <div class="form__wrapper">
          <form class="form bg-light">
            <div class="form__title">Редактировать категорию</div>
            <no-ssr>
              <Field
                v-if="$v"
                :error="$v.category.categories_title.$error"
                :input="touchData"
                error-message="Только символы алфавита"
                name="title"
                title="Название"
                type="passed"
                :value="category.categories_title"
              />
            </no-ssr>
            <no-ssr>
              <Field
                v-if="$v"
                :error="$v.category.categories_description.$error"
                :input="touchData"
                error-message="Только символы алфавита"
                name="description"
                title="Описание"
                type="passed"
                :value="category.categories_description"
              />
            </no-ssr>
            <no-ssr>
              <Slug :string="category.categories_title" @slug="setSlug($event)" />
            </no-ssr>
            <no-ssr>
              <DropDown
                placeholder="Выберите из списка"
                label="Родительская категория"
                prefix="categories"
                :options="getCategories"
                :selected="[parentCategory]"
                :label-style="{
                  margin: '0 0 6px 0',
                  fontSize: '12px',
                  color: '#aaa'
                }"
                :placeholder-style="{
                  fontSize: '12px',
                  color: '#ccc'
                }"
                @updateOption="selectCategory"
              />

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
      <div class="col-3">Sidebar</div>
    </div>
    <div v-else class="row">
      <div class="col-12 flex-center">
        <no-ssr>
          <LoginForm />
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Vuelidate from 'vuelidate'
import {
  validateDescription
  } from '~/components/utils/validations.js'
import Field from '~/components/ui/Field'
import LoginForm from '~/components/LoginForm'
import Switches from '~/components/ui/Switches'
import DropDown from '~/components/ui/DropDown'
import Slug from '~/components/ui/Slug'

Vue.use(Vuelidate)
if (process.browser) {
  const VueCookies = require('vue-cookies')
  Vue.use(VueCookies)
}

export default {

  data() {
    return {
      errorForm: null,
      loading: false,
      category: {
        categories_active: true,
        categories_parent_id: null
      },
      categories: null,
      parentCategory: null
    }
  },

  async asyncData({ params, app: { $axios } }) {
    const category = await $axios.$get(`/api/category/${params.id}`)
    const categories = await $axios.$get('/api/category')
    const parentCategory = await $axios.$get(`/api/category-by-id/${category.categories_parent_id}`)
    return { category, categories, parentCategory }
  },

  components: {
    Field,
    LoginForm,
    Switches,
    DropDown,
    Slug
  },

  validations: {
    category: {
        categories_title: {
        validateDescription
      },
      categories_description: {
        validateDescription
      }
    }
  },

  computed: {
    ...mapState({ getUser: 'authUser' }),
    getSendButtonStatus() {
      if (process.client) {
        return !this.errorForm && !this.loading && !this.$v.$invalid
      }
    },

    getActiveFieldName() {
      return this.category.categories_active ? 'Активна' : 'Не активна'
    },

    getToken() {
      return this.getUser ? this.getUser.token : null
    },

    getArticleActiveStatus() {
      return this.category.categories_active ? true : false
    },

    getCategories() {
      return this.categories.filter(item => item.id !== this.category.id)
    }
  },

  methods: {
    touchData(name, value) {
      const prefix = `categories_${name}`
      this.category[prefix] = value
      this.$v.category[prefix].$touch()
    },

    toggleActiveStatus() {
      this.category.categories_active = !this.category.categories_active
    },

    sendForm() {
      this.loading = true

      if(this.getToken) {
        this.$axios
        .put(`/api/admin/category/${this.category.categories_slug}`, {
          title: this.category.categories_title,
          description: this.category.categories_description,
          active: this.category.categories_active,
          slug: this.category.categories_slug,
          parent_id: this.category.categories_parent_id
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
            this.$router.push(`/admin/category`)
          } else {
            this.errorForm = true
          }
          this.loading = false
        })
        .catch(err => {
          this.errorForm = true
          this.loading = false
        })
      }
    },

    selectCategory(category) {
      this.category.categories_parent_id = category
    },

    setSlug(slug) {
      this.slug = slug.toLowerCase()
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
