import App from './views/App.vue'
import iView from 'iview'
import VueQuillEditor from 'vue-quill-editor'
import VueAMap from 'vue-amap'

import 'iview/dist/styles/iview.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import '../assets/style/style.less'

import config from './config'
import router from './router'
import store from './store'

import mixins from './mixins'
import mixinsAuth from './mixins/auth'
import mixinsApp from './mixins/app'

import pluginXIcon from './plugins/x-icon'
import pluginImageViewer from './plugins/image-viewer'
import pluginHtmlViewer from './plugins/html-viewer'
import pluginApi from './plugins/api'
import pluginDataView from './plugins/data-view'
import pluginDialogs from './plugins/dialogs'

export default {
  install (Vue, options = {}) {
    Vue.use(VueQuillEditor)
    Vue.use(VueAMap)
    Vue.use(iView)
    Vue.use(pluginXIcon)

    Vue.use(pluginImageViewer)
    Vue.use(pluginHtmlViewer)
    Vue.use(pluginApi)
    Vue.use(pluginDataView)
    Vue.use(pluginDialogs)

    Vue.mixin(mixins)
    Vue.mixin(mixinsAuth)
    Vue.mixin(mixinsApp)

    // Custom mixins
    Vue.mixin(config.mixins)

    // 初始化vue-amap
    VueAMap.initAMapApiLoader({
      // 高德的key
      key: 'ef2eab681308c797896f023a49889e2c',
      // 插件集合
      plugin: [
        'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
        'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',
        'AMap.Geolocation', 'AMap.Geocoder'
      ],
      // 高德 sdk 版本，默认为 1.4.4
      v: '1.4.4'
    });

    const AppConstructor = Vue.extend(App)

    window.app = new AppConstructor({
      el: '#app',
      router,
      store
      // store,
      // render: h => h(App),
      // data: {
      //   currentPageName: ''
      // },
      // created () {
      //   let tagsList = []
      //   appRouter.map(item => {
      //     if (item.children.length <= 1) {
      //       tagsList.push(item.children[0])
      //     } else {
      //       tagsList.push(...item.children)
      //     }
      //   })
      //   this.$store.commit('setTagsList', tagsList)
      // }
    })
  }
}
