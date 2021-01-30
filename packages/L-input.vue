<template>
  <div class="li-input" :class="{'li-input_suffix': showSuffix}">
    <input
    class="li-input-inner"
    :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
    :class="{'is-disabled': disabled}">
    <span class="li-input_suffix">
      <i v-if="clearable" @click="clear"><svg t="1611886141075" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3653" width="14" height="14"><path d="M511.049143 0C229.302857 0 0 229.522286 0 511.634286c0 282.185143 229.302857 511.707429 511.049143 511.707428 281.819429 0 511.122286-229.522286 511.122286-511.707428C1022.171429 229.522286 792.868571 0 511.049143 0z m228.790857 683.666286a40.301714 40.301714 0 0 1-56.905143 57.051428l-171.885714-172.032-171.812572 172.032a40.082286 40.082286 0 0 1-56.905142 0 40.301714 40.301714 0 0 1 0-57.051428l171.885714-172.032-171.885714-172.032a40.301714 40.301714 0 0 1 56.905142-56.978286l171.885715 172.032 171.812571-172.032a40.228571 40.228571 0 1 1 56.905143 57.051429l-171.885714 171.958857 171.885714 172.032z" fill="#DDDDDD" p-id="3654"></path></svg></i>
    </span>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'li-input',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      passwordVisible: false
    }
  },
  computed: {
    showSuffix () {
      return this.clearable || this.showPassword
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    clear () {
      console.log(this.value)
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.li-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .li-input-inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,045,.355,1);
      width: 100%;

      &:focus{
        outline: none;
        border-color: #409eff;
      }

      // input禁用样式
      &.is-disabled{
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor:not-allowed;
      }
  }
}

.li-input_suffix{
    .li-input_inner{
      padding-right: 30px;
    }
    .li-input_suffix{
      position: absolute;
      right: 10px;
      height: 100%;
      top: 0;
      line-height: 40px;
      text-align: center;
      color: #c0c4cc;
      transition: all .3s;
      z-index: 900;
      i{
        color: #c0c4cc;
        font-size: 14px;
        cursor: pointer;
        transition: color .2s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
</style>
