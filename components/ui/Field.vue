<template>
  <div>
    <label v-if="showLabel">
      <div class="field__label">{{ title }}</div>
      <div v-if="type === 'file'" :class="['field__type-file', {'error-input': error}]">
        <span>{{ placeholder }}</span>
      </div>
      <textarea
        v-if="type === 'textarea'"
        :name="name"
        :id="name"
        :placeholder="'Введите текст сообщения'"
        :rows="rows"
        :class="['form-control', { 'error-input': error }]"
        @input="input(name, $event.target.value)"
      />
      <input
        v-else-if="type === 'text'"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :class="['form-control', { 'error-input': error }]"
        @input="input(name, $event.target.value)"
      >
      <input
        v-else-if="type === 'passed'"
        :id="name"
        :placeholder="placeholder"
        :value="value"
        :class="['form-control', { 'error-input': error }]"
        type="text"
        @input="input(name, $event.target.value)"
      >
      <input
        v-else-if="type === 'email'"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :class="['form-control', { 'error-input': error }]"
        @input="input(name, $event.target.value)"
      >
      <input
        v-mask="type === '+7 999 999 99 99'"
        v-else-if="type === 'tel'"
        :id="name"
        :type="type"
        :placeholder="'+7'"
        :class="['form-control', { 'error-input': error }]"
        @input="input(name, $event.target.value)"
      >
      <input
        v-else-if="type === 'password'"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :class="['form-control', { 'error-input': error }]"
        @input="input(name, $event.target.value)"
      >

      <input
        v-else-if="type === 'file'"
        ref="file"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        class="form-control"
        @input="input(name, $event.target.value, getElement())"
      >
    </label>
    <div v-if="error" class="error">{{ errorMessage }}</div>
    <div v-if="signature" class="signature">{{ signature }}</div>
  </div>
</template>

<script>
import Vue from 'vue';
// import tinymce from 'vue-tinymce-editor'

if (process.browser) {
  const VueInputMask = require('vue-inputmask').default
  Vue.use(VueInputMask)
  // Vue.component('tinymce', tinymce)
}

export default {

  props: {
    name: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    type: {
      default: '',
      type: String
    },
    element: {
      default: 'input',
      type: String
    },
    showLabel: {
      default: true,
      type: Boolean
    },
    placeholder: {
      default: '',
      type: String
    },
    signature: {
      default: '',
      type: String
    },
    rows: {
      default: '5',
      type: String
    },
    error: {
      default: false,
      type: Boolean
    },
    errorMessage: {
      default: '',
      type: String
    },
    input: {
      default: () => {},
      type: Function
    },
    value: {
      default: '',
      type: String
    }
  },

  // data() {
  //   return {
  //       editor: ClassicEditor,
  //       editorData: '<p>Content of the editor.</p>',
  //       editorConfig: {
  //           // The configuration of the editor.
  //       }
  //   };
  // },

  methods: {
    getElement: function() {
      return this.$refs.file
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  width: 100%;
}

.form__input {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: rem(14px 16px);

  background: #fafafa;
  border: 1px solid rgba(38, 36, 36, 0.08);
  border-radius: rem(8px);
  outline: none;
}

.field__label {
  margin: rem(20px 0 6px);
  font-size: 12px;
  color: #aaa;
}

.field__input-type-file {
  display: none;
}

.field__type-file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: rem(14px 16px);

  color: rgba(0, 0, 0, 0.32);

  background: #fafafa;
  border: 1px dashed rgba(38, 36, 36, 0.08);
  border-radius: rem(8px);
  outline: none;
  cursor: pointer;
}

::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.32);

  transition: opacity 250ms ease-in-out;
}
:focus::-webkit-input-placeholder {
  opacity: 0.5;
}
:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.32);

  transition: opacity 250ms ease-in-out;
}

.signature {
  margin-top: rem(8px);

  color: rgba(0, 0, 0, 0.32);
}

.field__input-type-textarea {
  resize: none;
}

div.error {
  color: #ff6464;
  margin-top: -5px;
  margin-bottom: 10px;
  font-size: 12px;
}

.error-input {
  border: 1px solid #ff6464 !important;
}
</style>
