import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import App from './App'
import routes from './routes'
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-default/index.css'
import fullCalendar from 'vue-fullcalendar'


Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.component('full-calendar', fullCalendar)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
