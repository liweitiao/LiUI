<template>
  <div class="li-switch" :class="{'is-checked': value}" @click="handleClick">
    <span class="li-switch_core" ref="core">
      <span class="li-switch_button"></span>
    </span>
    <input type="checkbox" class="li-switch_input" :name="name" ref="input">
  </div>
</template>

<script>
export default {
  name: 'li-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  mounted () {
    if (this.activeColor || this.inactiveColor) {
      var color = !this.value ? this.activeColor : this.inactiveColor
      this.$refs.core.style.borderColor = color
      this.$refs.core.style.backgroundColor = color
    }
    this.$refs.input.checked = this.value
  },
  methods: {
    handleClick () {
      console.log(this.value)
      this.$emit('input', !this.value)
      this.$refs.input.checked = this.value
    }
  },
  watch: {
    'value' (e) {
    // 修改开关颜色
      if (this.activeColor || this.inactiveColor) {
        var color = !e ? this.activeColor : this.inactiveColor
        this.$refs.core.style.borderColor = color
        this.$refs.core.style.backgroundColor = color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .li-switch{
    display: inline-block;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    .li-switch_core{
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
    .li-switch_button{
      position:absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all .3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
      }
    }
  }
  // 选中样式
  .is-checked {
    .li-switch_core{
      border-color: #409eff;
      background-color: #409eff;
      .li-switch_button {
        transform: translateX(20px);
      }
    }
  }
  // 隐藏input标签
  .li-switch_input{
    position:absolute;
    width: 10;
    height: 10;
    opacity: 1;
    margin: 10;
  }
</style>
