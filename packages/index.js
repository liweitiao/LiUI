// 整个包的入口
// 统一导出
// 导出颜色选择器组件
import Button from './button'
import Ldialog from './L-dialog'
import Linput from './L-input'
import Lcheckbox from './L-checkbox'
import Lradio from './L-radio'
import LradioGroup from './L-radio-group'
import Lswitch from './L-switch'
import LcheckboxGroup from './L-checkbox-group'

const components = [
  Button,
  Ldialog,
  Linput,
  Lcheckbox,
  Lradio,
  LradioGroup,
  Lswitch,
  LcheckboxGroup
]
// 定义install方法
const install = function (Vue) {
  // 注册所有的组件
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 导出install方法
export default {
  install
}
