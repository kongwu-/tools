import Vue from 'vue'
import Router from 'vue-router'
import javaUnBox from '@/views/java_unbox'
import javaBox from '@/views/java_box'
import jsonFormat from '@/views/json_format'
import index from '@/index'
import wrapper from '@/wrapper'
Vue.use(Router)

export default new Router({
  routes: [{
    path:'/',
    component:index
  },{
    path:'wrapper',
    component:wrapper,
    children:[
      {
        path: '/java-unbox',
        name: 'java-unbox',
        component: javaUnBox
      },{
        path: '/java-box',
        name: 'java-box',
        component: javaBox
      },{
        path: '/json-format',
        name: 'json-format',
        component: jsonFormat
      }
    ]
  }]
})
