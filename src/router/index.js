import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Home from '@/components/Home'
import Sort from '@/components/Sort'
import Console from '@/components/Console'
import Mine from '@/components/Mine'

import Dynamic from '@/components/App/Dynamic'

import Login from '@/components/LR/Login'
import Register from '@/components/LR/Register'
import Reset from '@/components/LR/Reset'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {path: '/', name: 'Home', component: Home},
        {path: 'Home', name: 'Home', component: Home},
        {path: 'Sort', name: 'Sort', component: Sort},
        {path: 'Console', name: 'Console', component: Console},
        {path: 'Mine', name: 'Mine', component: Mine},
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/Reset',
      name: 'Reset',
      component: Reset,
    },
    {
      path: '/Dynamic',
      name: 'Dynamic',
      component: Dynamic,
    }
  ]
})
