import routesMain from './routes-main'
import menus from './menus'
import hooks from './hooks'

export default {
  name: '我的项目',
  version: '0.0.1',
  main_routes: routesMain,
  home_route: { name: 'main_home' },
  api_root: 'http://127.0.0.1:3000', // DEMO: use json-server in the demo folder
  menus,
  hooks
}
