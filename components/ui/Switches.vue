<template>
  <div class="switcher" @click="toggleSwitcher">
    <div class="lever" :class="state ? 'lever--right' : 'lever--left'" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: this.condition
    }
  },

  props: {
    condition: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    toggleSwitcher() {
      this.state = !this.state
      this.$emit('switcher-status', this.state)
    }
  }
}
</script>

<style lang="scss" scoped>
  .switcher {
    width: 30px;
    height: 14px;
    border: 1px solid #ccc;
    position: relative;
    border-radius: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background: #fff;
  }

  .lever {
    width: 12px;
    height: 12px;
    position: absolute;
    transition: 0.3s;
    border-radius: 50%;
  }

  .lever--right {
    right: 0;
    background: #007bff;
  }

  .lever--left {
    right: calc(100% - 10px);
    background: #ccc;
  }
</style>
