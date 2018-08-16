<template>
  <div id="orders">
    <x-header>订单管理</x-header>
    <div class="header">
      <tab active-color="#4A90E2" default-color="#333">
        <tab-item :selected="index==0" v-for="(item,index) in tabItems" :key="index" :value="item.type"
                  @on-item-click="changeType(item.type)">{{item.name}}
        </tab-item>
      </tab>
    </div>

    <ul v-for="(item,index) in lists" :key="item.ordernumber" class="content"
        @click="showDel(item.ordernumber)">
      <p>{{item.type}} <span class="paym">{{item.paymentstatus=='1'? '已支付':'未支付'}}</span></p>
      <li>¥{{item.cost}}</li>
      <li>创建时间：{{item.ordercreatetime}}</li>
      <li>订单编号：{{item.ordernumber}}</li>
      <p class="btns">
        <x-button mini @click.native="check(item)">详情</x-button>
        <x-button type="primary" mini v-show="!item.paymentstatus" @click.native="pay">支付</x-button>
      </p>
    </ul>


    <actionsheet v-model="showDelete" :menus="menusDelete" :close-on-clicking-mask="false" show-cancel
                 @on-click-menu="deleteOrder"></actionsheet>

  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, XHeader, Tab, TabItem, XButton, Actionsheet} from 'vux'
  import $ from 'jquery'
  export default{
    components: {
      Group,
      XHeader,
      Tab,
      TabItem,
      XButton,
      Actionsheet
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.searchNext()
      })
    },
    data(){
      window.scrollTo(0, 0);
      return {
        loading: false,
        type: '',
        alls: 0,
        order_type: '',
        pageType: {
          pageSize: '10',
          page: 0
        },
        tabItems: [
          {name: '全部', type: 'all'},
          {name: '已支付', type: 'pay'},
          {name: '未支付', type: 'notpay'},
        ],
        lists: [],
        showDelete: false,
        order: '',
        menusDelete: {
          del: '<span style="color: red;">删除</span>'
        },
      }
    },
    mounted(){
      $(window).scroll(() => {
        var scrollTop = $(window).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(window).height();
        if (scrollTop + windowHeight == scrollHeight) {
          this.searchNext()
        }
      });
    },
    methods: {
      //获取下一页数据
      searchNext(){
        this.pageType.page += 1
        let params = {
          pageSize: this.pageType.pageSize,
          page: this.pageType.page,
        }
        if (this.order_type) {
          params.paymentStatus = this.order_type
        }
        axios.get('user/searchOrderByType.do', {
          params
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              response.data.result.data.forEach(list => {
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
              this.lists = this.lists.concat(response.data.result.data)
            }
          }
        )
      },
      //详情
      check(item){
        sessionStorage.setItem('order-item', JSON.stringify(item))
        this.$router.push('orderdetail')
      },
      //改变状态
      changeType(type){
        switch (type) {
          case 'all':
            this.order_type = ''
            break
          case 'pay':
            this.order_type = '1'
            break
          case 'notpay':
            this.order_type = '0'
            break
        }
        this.lists = []
        this.pageType.page = 0
        this.searchNext()
      },
      //订单删除
      showDel(ordernumber){
        this.order = ordernumber
        this.showDelete = true
      },
      deleteOrder(key){
        if (key == 'del') {
          axios.get('continue/delOrderpay.do', {
            params: {
              order: this.order,
            }
          }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.lists = this.lists.filter(item => {
                  return item.ordernumber != this.order
                })
                this.$vux.toast.text(response.data.message, 'middle')
              } else {
                this.$vux.toast.text(response.data.message, 'middle')
              }
            }
          )
        }
      },
      //支付
      pay()
      {
        this.$router.push('home')
      }
      ,
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #orders {
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
        border-top: 1px solid #e7e7e7;
        text-align: right;
      }
    }
  }

</style>
