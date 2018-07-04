<template>
  <div>
    <x-header>发票申请记录</x-header>
    <div class="Trace">
      <Card v-for="(item,index) in invoiceList" :key="index" class="card">
        <div slot="header" class="header">快递单号：3891610155053</div>
        <div slot="content" class="content" @click="detele()">
          <li>发票种类:{{item.type == 0 ? '普通发票' : '增值税专用发票'}}</li>
          <li>发票抬头:{{item.title}}</li>
          <li>发票金额:¥{{item.amount}}</li>
        </div>
        <div slot="footer" class="foot">
          <li>发票申请时间:{{item.createtime}}</li>
        </div>
      </Card>
    </div>
    <p v-show="invoiceList.length==0" class="off">暂无数据</p>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader, Card} from 'vux'
  export default{
    components: {
      XHeader,
      Card
    },
    beforeRouteEnter(to, from, next){
      axios.get('user/getInvoiceList.do').then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    data(){
      return {
        invoiceList: [],
      }
    },
    methods: {
      //获取发票申请记录
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.invoiceList = response.data.result.result
        }
      },
      //删除
      detele(){
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .Trace {
    padding: .2rem 0 1.5rem 0;
    .card {
      padding: .23rem .32rem .26rem .28rem;
      li {
        list-style: none;
        font-size: .28rem;
        line-height: .4rem;
      }
      .header {
        font-size: .32rem;
        color: rgba(51, 51, 51, 1);
        line-height: .45rem;
      }
      .content {
        padding: 0 0 .24rem 0;
        li {
          padding-top: .24rem;
          color: rgba(102, 102, 102, 1);
        }
      }
      .foot {
        padding: .22rem 0 .26rem 0;
        border-top: 1px solid rgba(217, 217, 217, 1);
        li {
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }

  .off {
    font-size: .28rem;
    color: #ccc;
    text-align: center;
    margin: 50% 0;
  }

</style>
