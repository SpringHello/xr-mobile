<template>
  <div id="orders">
    <x-header>订单管理</x-header>
    <div class="header">
      <tab active-color="#4A90E2" default-color="#333">
        <tab-item :selected="index==0" v-for="(item,index) in tabItems" :key="index" :value="item.type"
                  @on-item-click="setData(item.type)">{{item.name}}
        </tab-item>
      </tab>
    </div>
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
      <ul v-for="(item,index) in lists" :key="index" class="content">
        <p>{{item.type}} <span class="paym">{{item.paymentstatus=='1'? '已支付':'未支付'}}</span></p>
        <li>¥{{item.cost}}</li>
        <li>创建时间：{{item.ordercreatetime}}</li>
        <li>订单编号：{{item.ordernumber}}</li>
        <p class="btns">
          <x-button mini @click.native="check(item)">详情</x-button>
          <x-button type="primary" mini v-show="!item.paymentstatus">支付</x-button>
        </p>
      </ul>
    </mt-loadmore>

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
      next(vm => {
        vm.setAll()
      })
    },
    data(){
      return {
        type: '',
        order_type: '',
        pageType: {
          pageSize: '15',
          page: '1'
        },
        tabItems: [
          {name: '全部', type: 'all'},
          {name: '已支付', type: 'pay'},
          {name: '未支付', type: 'notpay'},
        ],
        lists: [],
      }
    },
    methods: {
      //获取数据
      setAll(){
        axios.get('user/searchOrderByType.do', {
          params: {
            pageSize: this.pageType.pageSize,
            page: this.pageType.page,
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.lists = response.data.result.data
              this.lists.forEach(list => {
                switch (JSON.parse(list.display).订单类型) {
                  case 'host':
                    list.type = '云主机'
                    break
                  case 'vpc':
                    list.type = 'vpc'
                    break
                  case 'disk':
                    list.type = '云磁盘'
                    break
                  case 'publicIp':
                    list.type = '网络'
                    break
                  case 'continue':
                    list.type = '续费'
                    break
                  case 'upconfig':
                    list.type = '升级'
                    break
                  case 'nat' :
                    list.type = '网络'
                    break
                }
              })
            }
          }
        )
      },
      setData(type){
        switch (type) {
          case 'all':
            this.order_type = ''
            break;
          case 'pay':
            this.order_type = '1'
            break;
          case 'notpay':
            this.order_type = '0'
            break;
        }
        axios.get('user/searchOrderByType.do', {
          params: {
            pageSize: this.pageType.pageSize,
            page: this.pageType.page,
            paymentStatus: this.order_type,
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.lists = response.data.result.data
              this.lists.forEach(list => {
                switch (JSON.parse(list.display).订单类型) {
                  case 'host':
                    list.type = '云主机'
                    break
                  case 'vpc':
                    list.type = 'vpc'
                    break
                  case 'disk':
                    list.type = '云磁盘'
                    break
                  case 'publicIp':
                    list.type = '网络'
                    break
                  case 'continue':
                    list.type = '续费'
                    break
                  case 'upconfig':
                    list.type = '升级'
                    break
                  case 'nat' :
                    list.type = '网络'
                    break
                }
              })
            }
          }
        )
      },
      //上拉刷新
      loadBottom(){
        parseInt(this.pageType.page += 1)
        console.log(this.pageType.page)
        this.setData(type)
      },
      //详情
      check(item){
        sessionStorage.setItem('order-item', JSON.stringify(item))
        this.$router.push('orderdetail')
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .content {
    background: rgba(255, 255, 255, 1);
    padding: .35rem .3rem .14rem .28rem;
    margin: .2rem 0;
    p {
      font-size: .32rem;
      color: #000;
      line-height: .45rem;
      .paym {
        float: right;
        color: #E6001B;
      }
    }
    li {
      list-style: none;
      font-size: .28rem;
      color: rgba(153, 153, 153, 1);
      line-height: .4rem;
      padding-top: .24rem;
      &:first-of-type {
        color: #E6001B;
        padding-top: .36rem;
      }
    }
    .btns {
      margin-top: .24rem;
      border-top: 1px solid rgba(217, 217, 217, 1);
      text-align: right;
    }
  }
</style>
