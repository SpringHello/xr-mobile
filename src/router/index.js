import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Home from '@/components/Home'
import Sort from '@/components/Sort'
import Console from '@/components/Console'
import Mine from '@/components/Mine'

import Warn from '@/components/Back/Warn'

import Dynamic from '@/components/App/Dynamic'  //公告详情
import Prodetail from '@/components/App/Prodetail' // 产品详情
import Sortdetail from '@/components/App/Sortdetail' //活动详情
import host from '@/components/App/Products/Host'
import ecsSnapshot from '@/components/App/Products/EcsSnapshot'
import mirror from '@/components/App/Products/Mirror'
import disk from '@/components/App/Products/Disk'
import diskbackup from '@/components/App/Products/Diskbackup'
import vpc from '@/components/App/Products/Vpc'
import elasticip from '@/components/App/Products/ElasticIP'
import balance from '@/components/App/Products/Balance'
import natgateway from '@/components/App/Products/Natgateway'
import virtualvpn from '@/components/App/Products/Virtualvpn'
import cloudmonitoring from '@/components/App/Products/Cloudmonitoring'
import firewall from '@/components/App/Products/Firewall'
import ddos from '@/components/App/Products/DDOS'


import Workorder from '@/components/Back/Workorder'
import Bhost from '@/components/Back/Bhost'//
import Bdisk from '@/components/Back/Bdisk'//
import Belasticip from '@/components/Back/BelasticIP'//
import Bmirror from '@/components/Back/Bmirror'//
import Bbalance from '@/components/Back/Bbalance'//
import Bnat from '@/components/Back/Bnat'//
import feedback from '@/components/Back/Feedback'//意见反馈
import Hostdetail from '@/components/Back/Hostdetail'//主机资源详情
import Newscenter from '@/components/Back/Newscenter'//消息中心
import Newdetail from '@/components/Back/Newdetail'//消息详情


import Login from '@/components/LR/Login'
import Register from '@/components/LR/Register'
import Reset from '@/components/LR/Reset'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
        {path: '/Bhost', name: 'Bhost', component: Bhost},
        {path: '/Bdisk', name: 'Bdisk', component: Bdisk},
        {path: '/Belasticip', name: 'Belasticip', component: Belasticip},
        {path: '/Bmirror', name: 'Bmirror', component: Bmirror},
        {path: '/Bbalance', name: 'Bbalance', component: Bbalance},
        {path: '/Bnat', name: 'Bnat', component: Bnat},
        {path: '/feedback', name: 'feedback', component: feedback},
        {path: 'Warn', name: 'Warn', component: Warn},
        {path: '/Hostdetail', name: 'hostDetail', component: Hostdetail},
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
    {
      path: '/host',
      name: 'host',
      component: host,
    },
    {
      path: '/ecsSnapshot',
      name: 'ecsSnapshot',
      component: ecsSnapshot,
    },
    {
      path: '/mirror',
      name: 'mirror',
      component: mirror,
    },
    {
      path: '/disk',
      name: 'disk',
      component: disk,
    },
    {
      path: '/diskbackup',
      name: 'diskbackup',
      component: diskbackup,
    },
    {
      path: '/vpc',
      name: 'vpc',
      component: vpc,
    },
    {
      path: '/elasticip',
      name: 'elasticip',
      component: elasticip,
    },
    {
      path: '/balance',
      name: 'balance',
      component: balance,
    },
    {
      path: '/natgateway',
      name: 'natgateway',
      component: natgateway,
    },
    {
      path: '/virtualvpn',
      name: 'virtualvpn',
      component: virtualvpn,
    },
    {
      path: '/cloudmonitoring',
      name: 'cloudmonitoring',
      component: cloudmonitoring,
    },
    {
      path: '/firewall',
      name: 'firewall',
      component: firewall,
    },
    {
      path: '/ddos',
      name: 'ddos',
      component: ddos,
    },
  ]
})
