<template>
  <div id="orderconfirm">
    <x-header>订单确认</x-header>
    <div class="orderdetails">
      <div class="resources">
        <p class="title">资源详情</p>
        <ul>
          <li v-for="(item,index) in orderData.资源" :key="index">
            <p v-for="(value,key) of item" class="item">{{key}}：{{value}}</p>
          </li>
        </ul>
      </div>
      <div class="billing">
        <p class="title">计费详情</p>
        <ul>
          <li>计费类型：{{orderData.类型}}</li>
          <li>购买时长：{{orderData.时长}}</li>
          <li>购买数量：{{orderData.数量}}</li>
          <li>原价：{{orderData.原价}}</li>
        </ul>
      </div>
    </div>
    <Group>
      <x-switch :title="xtitle" v-model="xvalue" @on-change="useOrnot"></x-switch>
      <cell title="选择优惠券" :value="text" @click.native="select" v-show="xvalue"></cell>

    </Group>

    <div class="pay">
      <p>应付金额：<span>¥ {{payMoney}}</span></p>
      <button @click="pay">去支付</button>
    </div>

    <div class="tickets" :class="{'tickets-none':showTickets}">
      <div v-for="(ticket,index) in tickets" :key="index"
           style="background-color: #FFF;margin: .2rem .2rem 0 .2rem;border-radius:.1rem;">
        <div class="content-top">
          <div class="top-left">
            <p>¥ <span>{{ticket.money}}</span></p>
            <p>{{ticket.remark}}</p>
          </div>
          <div class="top-middle">
            <p>{{ticket.operator}}</p>
            <p>{{ticket.starttime}}</p>
            <p>{{ticket.endtime}}</p>
          </div>
          <button @click="uesTicket(ticket.remark,ticket.tickettype,ticket.money,ticket.operatorid)">立即使用
          </button>
        </div>
        <p class="content-bottom">
          {{ticket.ticketdescript}}
        </p>
      </div>
      <p style="text-align: center;">
        <button @click="select" class="btn">不使用优惠券</button>
      </p>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {XHeader, XSwitch, Group, Cell} from 'vux'
  export default{
    components: {
      XHeader,
      XSwitch,
      Group,
      Cell
    },
    data (){
      return {
        xtitle: `使用优惠券`, //(可使用优惠券：2)
        xvalue: false,
        // 订单详情对象
        orderData: {},
        // 存放优惠券数据
        tickets: [],
        ticketNname: '',
        text: '选择',
        showTickets: false,
        payMoney: 0,
        orderNum: '',
        ticketId: ''
      }
    },
    beforeRouteEnter(to, from, next){
      let params = {}
      params.totalCost = sessionStorage.getItem('countOrder')
      axios.get('user/searchOrderByBuy.do', {
        params
      }).then(response => {
        next(vm => {
          vm.setOrder(response)
        })
      })
    },
    created(){
    },
    methods: {
      setOrder(response){
        if (response.status == 200 && response.data.status == 1) {
          this.orderData = JSON.parse(response.data.result.data[0].display)
          this.orderNum = response.data.result.data[0].ordernumber
        }
        this.payMoney = sessionStorage.getItem('countOrder')
        axios.get('ticket/getUserTicket.do', {
          params: {
            ticketType: '',
            isuse: 0,
            totalCost: sessionStorage.getItem('countOrder')
          }
        }).then(response => {
          this.tickets = response.data.result
        })
      },
      //选择优惠券
      select(){
        this.showTickets = !this.showTickets
      },
      //立即使用
      uesTicket(name, type, money, id){
        this.text = this.ticketNname = name
        this.showTickets = !this.showTickets
        this.ticketId = id
        if (type == 1) {
          this.payMoney = (parseFloat(sessionStorage.getItem('countOrder')) * money / 10).toFixed(2)
        } else if (type == 0) {
          this.payMoney = (parseFloat(sessionStorage.getItem('countOrder')) - money).toFixed(2)
        }
      },
      //是否使用优惠卷
      useOrnot(value){
        if (value == false) {
          this.payMoney = sessionStorage.getItem('countOrder')
        }
      },
      //去支付
      pay(){
        axios.get('information/zfconfirm.do', {
          params: {
            order: this.orderNum,
            ticket: this.ticketId,
            money: this.payMoney,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('payData', JSON.stringify(response.data.result))
            this.$router.push('hostOrder')
          }
        })
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .orderdetails {
    background: rgba(255, 255, 255, 1);
    .resources {
      margin-left: .3rem;
      border-bottom: 1px solid #e7e7e7;
      color: #333;
      li {
        list-style: none;
        .item {
          font-size: .24rem;
          line-height: .33rem;
          padding-bottom: .24rem;
        }
      }
      .title {
        font-size: .32rem;
        line-height: .45rem;
        padding-bottom: .21rem;
        padding-top: .4rem;
      }
    }
    .billing {
      color: #999;
      margin-left: .3rem;
      .title {
        font-size: .32rem;
        line-height: .45rem;
        padding-bottom: .21rem;
        padding-top: .4rem;
      }
      li {
        list-style: none;
        font-size: .24rem;
        line-height: .33rem;
        padding-bottom: .24rem;
      }
    }
  }

  .pay {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #FFF;
    position: fixed;
    bottom: 0;
    p {
      padding: .32rem 0 .32rem .3rem;
      font-size: .28rem;
      color: rgba(0, 0, 0, 1);
      line-height: .36rem;
      span {
        font-size: .36rem;
        color: rgba(230, 0, 27, 1);
      }
    }
    button {
      font-size: .32rem;
      color: rgba(255, 255, 255, 1);
      line-height: .36rem;
      outline: none;
      border: 0;
      background: rgba(219, 66, 50, 1);
      padding: .33rem .77rem .31rem .78rem;
    }
  }

  .tickets {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all .2s;
    background-color: rgb(243, 243, 243);
    z-index: 250;
  }

  .tickets-none {
    transform: translateZ(0);

  }

  .content-top {
    background: url(../../assets/img/account/new-use.png) no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .1rem .3rem .38rem .4rem;
    .top-left {
      width: 30%;
      p {
        font-size: .2rem;
        color: rgba(255, 255, 255, 1);
        line-height: .28rem;
        &:first-of-type {
          font-size: .36rem;
          line-height: .5rem;
          span {
            font-size: .88rem;
            line-height: 1.23rem;
            padding-left: .16rem;
          }
        }
      }
    }
    .top-middle {
      width: 40%;
      p {
        font-size: .2rem;
        line-height: .28rem;
        color: rgba(255, 255, 255, 1);
        &:first-of-type {
          font-size: .28rem;
          line-height: .4rem;
          padding-bottom: .06rem;
        }
      }
    }
    button {
      width: 25%;
      border: none;
      outline: none;
      background: rgba(255, 255, 255, 1);
      border-radius: .3rem;
      font-size: .2rem;
      line-height: .28rem;
      padding: .08rem .2rem;
      color: #4768B1;
    }
  }

  /* .yhui {
     background: url(../../assets/img/account/new-use.png) no-repeat center;
     background-size: cover;
   }
   .xjin {
     background: url(../../assets/img/account/cash.png) no-repeat center;
     background-size: cover;
   }
   .zkou {
     background: url(../../assets/img/account/discount.png) no-repeat center;
     background-size: cover;
   }*/

  .content-bottom {
    font-size: .2rem;
    color: rgba(153, 153, 153, 1);
    line-height: .28rem;
    padding: .12rem 0 .21rem .41rem;

  }

  .btn {
    outline: none;
    border: none;
    font-size: .32rem;
    color: #FFF;
    background-color: #4A90E2;
    padding: .2rem .3rem;
  }
</style>
