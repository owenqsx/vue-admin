/**
 * 数据驱动组件
 */
// import config from '../../config'
import components from './components'

export default {
  install (Vue, options = {}) {
    Vue.mixin({
      components,
      computed: {},
      methods: {
        /**
         * 计算获取某个对象的某个字段显示取值
         * @param field 字段设置（逻辑上对应于列）
         * @param item 数据对象（逻辑上对应于行）
         */
        async getFieldValue (field, item) {
          const vm = this
          // 0. 首先，field.key 可能是函数或者 Promise，要先通过
          // finalize 获取计算获得的 key 值
          const key = await vm.finalize(field.key, item)
          // 1. 根据 field.key 定位初始的取值
          let value = vm.evaluate(item, key)
          // 2. 根据 filter 过滤
          if (field.filter) {
            value = field.filter.apply(vm, [value])
          }
          // 3. 根据 mapper 过滤
          if (field.mapper) {
            const mapper = await vm.finalize(field.mapper, item)
            value = (value in mapper && mapper[value]) ||
              mapper.__default__ || value
          }
          return value
        },
        /**
         * 设置列表字段的默认值
         * @param field
         */
        setListViewFieldDefault (field) {
          const vm = this
          const defaults = {
            type: 'text'
          }
          Object.keys(defaults).forEach(key => {
            const value = defaults[key]
            if (typeof field[key] === 'undefined') {
              vm.$set(field, key, value)
            }
          })
        }
      }
    })
  }
}