<template>
  <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <sidebar-menu
      v-show="!shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :open-names="openNames"
      @on-select="handleChange"
    ></sidebar-menu>
    <sidebar-menu-shrink
      v-show="shrink"
      :menu-theme="theme"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-select="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>

<script>
  import _ from 'lodash'

  import SidebarMenu from './SidebarMenu.vue'
  import SidebarMenuShrink from './SidebarMenuShrink.vue'

  export default {
    name: 'ShrinkableMenu',
    components: {
      SidebarMenu,
      SidebarMenuShrink
    },
    props: {
      shrink: {
        type: Boolean,
        default: false
      },
      menuList: {
        type: Array,
        required: true
      },
      theme: {
        type: String,
        default: 'dark',
        validator (val) {
          return _.includes(['dark', 'light'], val)
        }
      },
      openNames: {
        type: Array
      }
    },
    computed: {
      bgColor () {
        return this.theme === 'dark' ? '#495060' : '#ffffff'
      },
      shrinkIconColor () {
        return this.theme === 'dark' ? '#ffffff' : '#495060'
      }
    },
    methods: {
      handleChange (menuName) {
        const vm = this
        // TODO: 展开当前菜单尚未实现
        vm.config.hooks.filter_before_menu_select(menuName).then(() => {
          // 默认情况下，通过菜单列表查找到对应的菜单项，并且跳转到 route 参数指定的路由目标
          // 如果没有 route 参数，跳转到名称为 name 的路由
          const menuItem = vm.getMenuItem(menuName)
          vm.$router.push(menuItem.route || { name: menuName })
        })
        vm.$emit('on-change', menuName)
      }
    }
  }
</script>

<style lang="less" scoped>
  .ivu-shrinkable-menu {
    height: 100%;
    width: 100%;
  }
  // 删除那条难看的右边框竖线
  .ivu-shrinkable-menu /deep/ .ivu-menu::after {
    display: none;
  }
</style>