import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Home from '@/components/Home'

import Login from '@/components/LR/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {path: 'Home', name: 'Home', component: Home}
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    }
  ]
})
