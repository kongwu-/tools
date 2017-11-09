import Vue from 'vue'
import Router from 'vue-router'
import javaUnBox from '@/views/java_unbox'
import javaBox from '@/views/java_box'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/java-unbox',
    name: 'java-unbox',
    component: javaUnBox
  },{
    path: '/java-box',
    name: 'java-box',
    component: javaBox
  }]
})
