import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
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
import Work from '@/components/Back/Work'
import Workdetail from '@/components/Back/Workdetail'
import Bhost from '@/components/Back/Bhost'//
import Bdisk from '@/components/Back/Bdisk'
import Belasticip from '@/components/Back/BelasticIP'
import Bmirror from '@/components/Back/Bmirror'
import Bbalance from '@/components/Back/Bbalance'
import Bnat from '@/components/Back/Bnat'
import certification from '@/components/Back/Certification'
import CertficaOK from '@/components/Back/CertficaOK'
import idcard from '@/components/Back/Idcard'
import RZsuccess from '@/components/Back/RZsuccess'
import RZfail from '@/components/Back/RZfail'
import Setting from '@/components/Back/Setting'
import PhoneVali from '@/components/Back/PhoneVali'
import EmailVali from '@/components/Back/EmailVali'
import ResetPhone from '@/components/Back/ResetPhone'
import ResetEmail from '@/components/Back/ResetEmail'
import BoundEmail from '@/components/Back/BoundEmail'
import ChangePassworld from '@/components/Back/ChangePassworld'
import Invoice from '@/components/Back/Invoice'//发票管理
import Account from '@/components/Back/Account'//账户余额
import Vouchers from '@/components/Back/Vouchers'//代金券
import Orders from '@/components/Back/Orders'
import Orderdetail from '@/components/Back/Orderdetail'
import TicketVali from '@/components/Back/TicketVali'
import Applyinvoice from '@/components/Back/Applyinvoice'
import Traceinvoice from '@/components/Back/Traceinvoice'
import Expense from '@/components/Back/Expense'//当月消费
import feedback from '@/components/Back/Feedback'//意见反馈
import Hostdetail from '@/components/Back/Hostdetail'//主机资源详情
import Diskdetail from '@/components/Back/Diskdetail'//云硬盘详情
import Elasticipdetail from '@/components/Back/Elasticipdetail'//弹性IP详情
import Newscenter from '@/components/Back/Newscenter'//消息中心
import Newdetail from '@/components/Back/Newdetail'//消息详情


/*登录注册相关*/
import Login from '@/components/LR/Login'
import Agreement from '@/components/LR/Agreement'
import Register from '@/components/LR/Register'
import RegisterSuccess from '@/components/LR/RegisterSuccess'
import Reset from '@/components/LR/Reset'


/*活动相关*/
import Active1 from '@/components/Active/Active1'
import Active2 from '@/components/Active/Active2'
import Active3 from '@/components/Active/Active3'

/* 拼团活动 */
import GroupBooking from '@/components/Active/groupBooking/HomePage'
import ShareLink from '@/components/Active/groupBooking/SharePage'
import ActivityLink from '@/components/Active/groupBooking/LinkPage'




Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/ruicloud',
      name: 'App',
      component: App,
      children: [
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
        {path: '/ruicloud/Bhost', name: 'Bhost', component: Bhost},
        {path: '/ruicloud/Bdisk', name: 'Bdisk', component: Bdisk},
        {path: '/ruicloud/Belasticip', name: 'Belasticip', component: Belasticip},
        {path: '/ruicloud/Bmirror', name: 'Bmirror', component: Bmirror},
        {path: '/ruicloud/Bbalance', name: 'Bbalance', component: Bbalance},
        {path: '/ruicloud/Bnat', name: 'Bnat', component: Bnat},
        {path: '/ruicloud/feedback', name: 'feedback', component: feedback},
        {path: '/ruicloud/certification', name: 'certification', component: certification},
        {path: '/ruicloud/CertficaOK', name: 'CertficaOK', component: CertficaOK},
        {path: '/ruicloud/idcard', name: 'idcard', component: idcard},
        {path: '/ruicloud/RZsuccess', name: 'RZsuccess', component: RZsuccess},
        {path: '/ruicloud/RZfail', name: 'RZfail', component: RZfail},
        {path: '/ruicloud/Setting', name: 'Setting', component: Setting},
        {path: '/ruicloud/phonevali', name: 'PhoneVali', component: PhoneVali},
        {path: '/ruicloud/emailvali', name: 'EmailVali', component: EmailVali},
        {path: '/ruicloud/resetPhone', name: 'ResetPhone', component: ResetPhone},
        {path: '/ruicloud/resetEmail', name: 'ResetEmail', component: ResetEmail},
        {path: '/ruicloud/BoundEmail', name: 'BoundEmail', component: BoundEmail},
        {path: '/ruicloud/ChangePassworld', name: 'ChangePassworld', component: ChangePassworld},
        {path: '/ruicloud/invoice', name: 'Invoice', component: Invoice},
        {path: '/ruicloud/applyinvoice', name: 'Applyinvoice', component: Applyinvoice},
        {path: '/ruicloud/ticketVali', name: 'TicketVali', component: TicketVali},
        {path: '/ruicloud/traceinvoice', name: 'Traceinvoice', component: Traceinvoice},
        {path: '/ruicloud/Warn', name: 'Warn', component: Warn},
        {path: '/ruicloud/workorder', name: 'Workorder', component: Workorder,},
        {path: '/ruicloud/work', name: 'Work', component: Work,},
        {path: '/ruicloud/workdetail', name: 'Workdetail', component: Workdetail,},
        {path: '/ruicloud/expense', name: 'Expense', component: Expense},
        {path: '/ruicloud/orders', name: 'Orders', component: Orders},
        {path: '/ruicloud/orderdetail', name: 'Orderdetail', component: Orderdetail},
        {path: '/ruicloud/account', name: 'Account', component: Account},
        {path: '/ruicloud/vouchers', name: 'Vouchers', component: Vouchers},
        {path: '/ruicloud/Hostdetail', name: 'hostDetail', component: Hostdetail},
        {path: '/ruicloud/Diskdetail/:diskId', name: 'diskdetail', component: Diskdetail},
        {path: '/ruicloud/Elasticipdetail/:ipId', name: 'elasticipdetail', component: Elasticipdetail},
        {path: '/ruicloud/Newscenter', name: 'Newscenter', component: Newscenter},
        {path: '/ruicloud/Newdetail', name: 'Newdetail', component: Newdetail},
        {path: '/ruicloud/active_1', name: 'active_1', component: Active1},
        {path: '/ruicloud/active_2', name: 'active_2', component: Active2},
        {path: '/ruicloud/active_3', name: 'active_3', component: Active3},
        {path: '/ruicloud/groupBooking', name: 'groupBooking', component: GroupBooking},
        {path: '/ruicloud/shareLink', name: 'shareLink', component: ShareLink},
        {path: '/ruicloud/activityLink', name: 'activityLink', component: ActivityLink},
        {
          path: '/ruicloud/Login',
          name: 'Login',
          component: Login,
        },
        {
          path: '/ruicloud/agreement',
          name: 'Agreement',
          component: Agreement,
        },
        {
          path: '/ruicloud/Register',
          name: 'Register',
          component: Register,
        },
        {
          path: '/ruicloud/registerSuccess',
          name: 'RegisterSuccess',
          component: RegisterSuccess,
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
    },
  ]
})
