<template>
  <div id="orderconfirm">
    <x-header>订单确认</x-header>
    <div class="orderdetails">
      <div class="resources">
        <p>资源详情</p>
        <ul>
          <li>地域：</li>
          <li>机型：</li>
          <li>镜像：</li>
          <li>存储：</li>
          <li>网络：</li>
          <li>弹性IP：</li>
          <li>宽带：</li>
        </ul>
      </div>
      <div class="billing">
        <p>计费详情</p>
        <ul>
          <li>计费类型：</li>
          <li>购买时长：</li>
          <li>购买数量：</li>
          <li>原价：</li>
          <li>活动优惠：</li>
        </ul>
      </div>
    </div>
    <Group>
      <x-switch :title="xtitle" v-model="xvalue"></x-switch>
      <cell title="选择优惠券" :value="text" @click.native="select" v-show="xvalue"></cell>

    </Group>
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
          <button @click="uesTicket(ticket.remark,ticket.operatorid)">立即使用
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
        ticketId: '',
        text: '选择',
        showTickets: false
      }
    },
    beforeRouteEnter(to, from, next){
      let params = {}
      /*if (to.query.countOrder) {
       params.countOrder = to.query.countOrder
       }*/
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
          this.orderData = response.data.result.data[0]
        }
        axios.get('ticket/getUserTicket.do', {
          params: {
            ticketType: '',
            isuse: 0,
            totalCost: this.orderData.originalcost
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
      uesTicket(name, id){
        this.text = this.ticketNname = name
        this.ticketId = id
        this.showTickets = !this.showTickets
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .orderdetails {
    background: rgba(255, 255, 255, 1);
    li {
      list-style: none;
      font-size: .24rem;
      line-height: .33rem;
      padding-bottom: .24rem;
    }
    p {
      font-size: .32rem;
      line-height: .45rem;
    }
    .resources {
      margin-left: .3rem;
      border-bottom: 1px solid #e7e7e7;
      color: #333;
      p {
        padding-bottom: .21rem;
        padding-top: .4rem;
      }
    }
    .billing {
      color: #999;
      margin-left: .3rem;
      p {
        padding-bottom: .21rem;
        padding-top: .4rem;
      }
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
