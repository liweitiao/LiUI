<template>
  <transiton name="dialog-fade">
    <div class="li-dialog_wrapper" v-show="visible">
      <div class="li-dialog" :style="{width: width, marginTop: top}">
        <div class="li-dialog_header">
          <slot name="title">
            <span class="li-dialog_title">
              {{ title }}
            </span>
          </slot>
          <button class="li-dialog_headerbtn" @click="handleClose">
            <i class="li-icon-close"><svg t="1611902473758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4397" width="28" height="28"><path d="M551.424 512l195.072-195.072c9.728-9.728 9.728-25.6 0-36.864l-1.536-1.536c-9.728-9.728-25.6-9.728-35.328 0L514.56 475.136 319.488 280.064c-9.728-9.728-25.6-9.728-35.328 0l-1.536 1.536c-9.728 9.728-9.728 25.6 0 36.864L477.696 512 282.624 707.072c-9.728 9.728-9.728 25.6 0 36.864l1.536 1.536c9.728 9.728 25.6 9.728 35.328 0L514.56 548.864l195.072 195.072c9.728 9.728 25.6 9.728 35.328 0l1.536-1.536c9.728-9.728 9.728-25.6 0-36.864L551.424 512z" p-id="4398"></path></svg></i>
          </button>
        </div>
        <div class="li-dialog_body">
          <slot></slot>
        </div>
        <div class="li-dialog_footer">
          <slot name="footer" v-if="$slots.footer"></slot>
        </div>
      </div>
    </div>
  </transiton>
</template>

<script>
export default {
  name: 'li-dialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
      console.log(this.visible)
    }
  }
}
</script>

<style lang="scss" scoped>
.li-dialog_wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0,0.5);
  .li-dialog{
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    box-sizing: border-box;
    width: 30%;
    &_header{
      padding: 20px 20px 10px;
      .li-dialog_title{
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .li-dialog_headerbtn{
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .li-icon-close{
          color:909399
        }
      }
    }
    &_body{
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &_footer{
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      ::v-deep .li-button:first-child{
        margin-right: 20px;
      }
    }
  }
}
.dialog-fade-enter-active{
  animation: fade 1s;
}
.dialog-fade-leave-active{
  animation: fade 1s reverse;
}
@keyframes fade{
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
