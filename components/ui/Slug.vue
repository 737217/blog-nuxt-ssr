<template>
  <div>
    <label :style="labelStyle">
      {{ label }}
      <input v-model="getTranslit" type="text" class="form-control" :style="inputStyle">
    </label>
  </div>
</template>

<script>
export default {
  props: {
    string: {
      default: '',
      type: String
    },
    labelStyle: {
      default: () => {
        return {
          margin: '0 0 6px 0',
          fontSize: '12px',
          color: '#aaa',
          width: '100%'
        }
      },
      type: Object
    },
    inputStyle: {
      default: () => {
        return {
          color: '#aaa'
        }
      },
      type: Object
    },
    label: {
      default: 'Slug',
      type: String
    },
    toLowerCase: {
      default: true,
      type: Boolean
    }
  },

  data() {
    return {
      arrRu: new Array ('Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э', ' '),
      arrEn: new Array ('Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','','','\'','\'','E', 'e', '-')
    }
  },

  computed: {
    getTranslit() {
      if(this.string) {
        let text = this.string
        for(var i=0; i < this.arrRu.length; i++){
          var reg = new RegExp(this.arrRu[i], "g");
          text = text.replace(reg, this.arrEn[i]);
        }
        this.$emit('slug', text)
        return this.toLowerCase ? text.toLowerCase() : text;
      }
    }
  }
}
</script>
