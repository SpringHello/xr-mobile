<template>
  <div>
    <x-header>代金券</x-header>
    <div class="header">
      <tab active-color="#4A90E2" default-color="#333">
        <tab-item :selected="index==0" v-for="(item,index) in tabItems" :key="index" :value="item.type"
                  @on-item-click="setData(item.type)">{{item.name}}
        </tab-item>
      </tab>
    </div>

    <div class="content" v-for="(item,index) in vouchers">
      <div class="content-top"
           :class="{yhui:item.operator=='优惠券',xjin:item.operator=='现金券',zkou:item.operator=='折扣券'}">
        <div class="top-left">
          <p>¥ <span>{{item.money}}</span></p>
          <p>{{item.remark}}</p>
        </div>
        <div class="top-middle">
          <p>{{item.operator}}</p>
          <p>{{item.starttime}}</p>
          <p>{{item.endtime}}</p>
        </div>
        <button
          :class="{byhui:item.operator=='优惠券',bxjin:item.operator=='现金券',bzkou:item.operator=='折扣券'}"
          v-show="!item.maketicketover">立即使用
        </button>
        <p class="top-right" v-show="item.maketicketover">
          <img src="../../assets/img/account/used.png">
        </p>
      </div>
      <p class="content-bottom">
        {{item.ticketdescript}}
      </p>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, XHeader, Tab, TabItem, XButton} from 'vux'
  export default{
    components: {
      Group,
      XHeader,
      Tab,
      TabItem,
      XButton
    },
    beforeRouteEnter(to, from, next){
      axios.get('ticket/getUserTicket.do', {
        params: {
          pageSize: 10,
          page: 1,
        }
      }).then(response => {
        next(vm => {
          vm.vouchers = response.data.result
        })
      })
    },
    data(){
      window.scrollTo(0, 0);
      return {
        isuse: '',
        tabItems: [
          {name: '全部', type: 'all'},
          {name: '已使用', type: 'used'},
          {name: '未使用', type: 'onuse'},
        ],
        pageType: {
          pageSize: '10',
          page: '1'
        },
        vouchers: []
      }
    },
    methods: {
      //获取数据
      setData(type){
        switch (type) {
          case 'all':
            this.isuse = ''
            break;
          case 'used':
            this.isuse = '1'
            break;
          case 'onuse':
            this.isuse = '0'
            break;
        }
        axios.get('ticket/getUserTicket.do', {
          params: {
            pageSize: this.pageType.pageSize,
            page: this.pageType.page,
            isuse: this.isuse
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.vouchers = response.data.result
          }
        })
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .content-top {
    margin-top: .2rem;
    padding: .24rem .3rem .35rem .43rem;
    display: flex;
    align-items: center;
    .top-left {
      width: 35%;

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
    .top-right {
      width: 25%;
      text-align: right;
      img {
        width: 2rem;
        position: relative;
        top: 1rem;
      }
    }
    button {
      border: none;
      outline: none;
      background: rgba(255, 255, 255, 1);
      border-radius: .3rem;
      font-size: .2rem;
      line-height: .28rem;
      padding: .08rem .2rem;
    }
  }

  .yhui {
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
  }

  .content-bottom {
    font-size: .2rem;
    color: rgba(153, 153, 153, 1);
    line-height: .28rem;
    background: #FFF;
    padding: .12rem 0 .21rem .41rem;

  }

  .byhui {
    color: #4768B1;
  }

  .bxjin {
    color: #FF881C;
  }

  .bzkou {
    color: #E6001B;
  }
</style>
