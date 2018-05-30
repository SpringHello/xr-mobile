import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Home from '@/components/Home'
import Sort from '@/components/Sort'
import Console from '@/components/Console'
import Mine from '@/components/Mine'

import Dynamic from '@/components/App/Dynamic'  //公告详情
import Prodetail from '@/components/App/Prodetail' // 产品详情
import Sortdetail from '@/components/App/Sortdetail' //活动详情


import Workorder from '@/components/Back/Workorder'
import Sourcedetail from '@/components/Back/Sourcedetail'//资源详情
import Hostdetail from '@/components/Back/Hostdetail'//主机资源详情
import Diskdetail from '@/components/Back/Diskdetail'//磁盘资源详情
import Ipdetail from '@/components/Back/Ipdetail'//弹性IP资源详情
import Balancedetail from '@/components/Back/Balancedetail'//负载均衡资源详情
import Newscenter from '@/components/Back/Newscenter'//消息中心
import Newdetail from '@/components/Back/Newdetail'//消息详情


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
        {path: '/Sourcedetail', name: 'Sourcedetail', component: Sourcedetail},
        {path: '/Hostdetail', name: 'hostDetail', component: Hostdetail},
        {path: '/Diskdetail', name: 'hostDetail', component: Diskdetail},
        {path: '/Ipdetail', name: 'hostDetail', component: Ipdetail},
        {path: '/Balancedetail', name: 'hostDetail', component: Balancedetail},
        {path: '/Newscenter', name: 'hostDetail', component: Newscenter},
        {path: '/Newdetail', name: 'hostDetail', component: Newdetail},
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
    },
    {
      path: '/Prodetail',
      name: 'Prodetail',
      component: Prodetail,
    },
    {
      path: '/Sortdetail',
      name: 'Sortdetail',
      component: Sortdetail,
    },
    {
      path: '/Workorder',
      name: 'Workorder',
      component: Workorder,
    },
  ]
})
