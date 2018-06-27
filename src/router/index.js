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
import certification from '@/components/Back/Certification'//
import idcard from '@/components/Back/Idcard'//
import RZresult from '@/components/Back/RZresult'//
import feedback from '@/components/Back/Feedback'//意见反馈
import Hostdetail from '@/components/Back/Hostdetail'//主机资源详情
import Diskdetail from '@/components/Back/Diskdetail'//云硬盘详情
import Elasticipdetail from '@/components/Back/Elasticipdetail'//弹性IP详情
import Boundresources from '@/components/Back/Boundresources'//绑定资源
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
      path: '/ruicloud',
      name: 'Main',
      component: Main,
      children: [
        {path: '/', name: 'Home', component: Home},
        {path: 'Home', name: 'Home', component: Home},
        {path: 'Sort', name: 'Sort', component: Sort},
        {path: 'Console', name: 'Console', component: Console},
        {path: 'Mine', name: 'Mine', component: Mine},
        {path: '/ruicloud/Bhost', name: 'Bhost', component: Bhost},
        {path: '/ruicloud/Bdisk', name: 'Bdisk', component: Bdisk},
        {path: '/ruicloud/Belasticip', name: 'Belasticip', component: Belasticip},
        {path: '/ruicloud/Bmirror', name: 'Bmirror', component: Bmirror},
        {path: '/ruicloud/Bbalance', name: 'Bbalance', component: Bbalance},
        {path: '/ruicloud/Bnat', name: 'Bnat', component: Bnat},
        {path: '/ruicloud/feedback', name: 'feedback', component: feedback},
        {path: '/ruicloud/certification', name: 'certification', component: certification},
        {path: '/ruicloud/idcard', name: 'idcard', component: idcard},
        {path: '/ruicloud/RZresult', name: 'RZresult', component: RZresult},
        {path: '/ruicloud/Warn', name: 'Warn', component: Warn},
        {path: '/ruicloud/Hostdetail', name: 'hostDetail', component: Hostdetail},
        {path: '/ruicloud/Diskdetail/:diskId', name: 'diskdetail', component: Diskdetail},
        {path: '/ruicloud/Elasticipdetail/:ipId', name: 'elasticipdetail', component: Elasticipdetail},
        {path: '/ruicloud/Boundresources/:id/:pid', name: 'boundresources', component: Boundresources},
        {path: '/ruicloud/Newscenter', name: 'Newscenter', component: Newscenter},
        {path: '/ruicloud/Newdetail', name: 'Newdetail', component: Newdetail},
      ]
    },
    {
      path: '/ruicloud/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/ruicloud/Register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/ruicloud/Reset',
      name: 'Reset',
      component: Reset,
    },
    {
      path: '/ruicloud/Dynamic',
      name: 'Dynamic',
      component: Dynamic,
    },
    {
      path: '/ruicloud/Prodetail',
      name: 'Prodetail',
      component: Prodetail,
    },
    {
      path: '/ruicloud/Workorder',
      name: 'Workorder',
      component: Workorder,
    },
    {
      path: '/ruicloud/host',
      name: 'host',
      component: host,
    },
    {
      path: '/ruicloud/ecsSnapshot',
      name: 'ecsSnapshot',
      component: ecsSnapshot,
    },
    {
      path: '/ruicloud/mirror',
      name: 'mirror',
      component: mirror,
    },
    {
      path: '/ruicloud/disk',
      name: 'disk',
      component: disk,
    },
    {
      path: '/ruicloud/diskbackup',
      name: 'diskbackup',
      component: diskbackup,
    },
    {
      path: '/ruicloud/vpc',
      name: 'vpc',
      component: vpc,
    },
    {
      path: '/ruicloud/elasticip',
      name: 'elasticip',
      component: elasticip,
    },
    {
      path: '/ruicloud/balance',
      name: 'balance',
      component: balance,
    },
    {
      path: '/ruicloud/natgateway',
      name: 'natgateway',
      component: natgateway,
    },
    {
      path: '/ruicloud/virtualvpn',
      name: 'virtualvpn',
      component: virtualvpn,
    },
    {
      path: '/ruicloud/cloudmonitoring',
      name: 'cloudmonitoring',
      component: cloudmonitoring,
    },
    {
      path: '/ruicloud/firewall',
      name: 'firewall',
      component: firewall,
    },
    {
      path: '/ruicloud/ddos',
      name: 'ddos',
      component: ddos,
    },
  ]
})
