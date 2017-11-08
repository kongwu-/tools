import Vue from 'vue'
import Router from 'vue-router'
import javaUnBox from '@/views/java_unbox'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/java-unbox',
      name: 'java-unbox',
      component: javaUnBox
    }
  ]
})
