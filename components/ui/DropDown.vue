<template>
  <div>
    <div class="label" :style="labelStyle">
      {{ label }}
      <div class="form-control" :style="placeholderStyle" @click="toggleMenu">
        <span v-if="getSelectedTitle" class="form__title">{{ getSelectedTitle }}</span>
        <span v-else>{{ placeholder }}</span>
        <!-- <ArrowIco :class="showMenu ? 'arrow-rotate-up' : 'arrow-rotate-down'" /> -->
      </div>

      <ul v-if="showMenu" class="dropdown-list">
        <li v-for="(option, key) in options" :key="key" :class="checkItemClass(option.id) && 'active-item'" @click="updateOption(option)">
          <span>
            {{ option.categories_title }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
// import ArrowIco from '~/assets/images/arrow-dropdown.svg';

export default {
  directives: {
    ClickOutside
  },

  components: {
    // ArrowIco,
  },

  props: {
    options: {
      default: () => [],
      type: Array
    },
    selected: {
      default: () => [],
      type: Array
    },
    placeholder: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    labelStyle: {
      default: () => {},
      type: Object
    },
    placeholderStyle: {
      default: () => {},
      type: Object
    },
    multiple: {
      default: false,
      type: Boolean
    },
    prefix: {
      default: '',
      type: String
    }
  },

  data() {
    return {
      selectedOption: [],
      showMenu: false,
      placeholderText: 'Выберите из списка',
      multipleSelected: []
    }
  },

  computed: {
    getSelectedTitle() {
      if(this.prefix) {
        if(!this.multiple) {
          return this.selectedOption.length ? this.selectedOption[0][`${this.prefix}_title`] : null
        }
      }
      return this.selectedOption ? this.selectedOption.title : null
    }
  },

  created() {
    if(this.selected) {
      this.selectedOption = this.selected
    }
    if(this.multiple && this.selected) {
      this.showMenu = true
    }
  },

  methods: {
    updateOption(option) {
      const isItemSelected = this.selectedOption
          ? this.selectedOption.find(item => item.id === option.id)
          : null
      if(!this.multiple) {
        this.showMenu = false;
        this.selectedOption = isItemSelected ? null : [option]
        this.$emit('updateOption', option.id);
      } else {
        this.selectedOption = isItemSelected
          ? this.selectedOption.filter(item => item.id !== option.id)
          : this.addItemToSelected(option)
        this.$emit('updateOption', this.selectedOption);
      }
    },

    addItemToSelected(option) {
      this.selectedOption.push(option)
      return this.selectedOption
    },

    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    checkItemClass(optionId) {
      if(this.selectedOption) {
        return this.selectedOption.find(item => item.id === optionId)
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow-rotate-up {
  transform: rotate(180deg);
  transition: 0.3s;
  width: 12px;
  height: 8px;
}

.arrow-rotate-down {
  transform: rotate(0deg);
  transition: 0.3s;
  width: 12px;
  height: 8px;
}

.btn-group {
  height: 40px;
  position: relative;
}

.btn-group a:hover {
  text-decoration: none;
}

.form__input {
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
}

.dropdown-toggle {
  color: #636b6f;
  min-width: 160px;
  padding: 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
}

.dropdown-toggle:hover {
  background: #e1e1e1;
  cursor: pointer;
}

.dropdown-menu {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  float: left;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}

.dropdown-menu > li > span {
  padding: 10px 30px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  text-decoration: none;
}
.dropdown-menu > li > span:hover {
  background: #efefef;
  color: #409FCB;
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.form__title {
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

li {
  list-style: none;
}

.dropdown-list {
  padding: 6px 12px;
  background: #fff;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom-left-radius: .25rem;
  border-bottom-right-radius: .25rem;

  .active-item {
    background: #aaa;
    color: #fff;
  }
}

.dropdown-list li:hover {
  background: #ccc;
  cursor: pointer;
}

.form-control {
  cursor: pointer;
}
</style>

