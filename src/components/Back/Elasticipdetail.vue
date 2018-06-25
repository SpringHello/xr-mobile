<template>
  <div>
    <x-header></x-header>
    <div class="host">
      <div class="host-item">
        <h6 class="title">IP基础信息</h6>
        <ul>
          <li>IP地址 <span>{{details.publicip}}</span></li>
          <li>带宽 <span>{{details.bandwith}}M</span></li>
          <li>状态
            <span>
              {{(details.status==1 || details.status==3 ||details.status==4)? '正常':details.status==0? '欠费':details.status==-1? '异常' :details.status==2?'创建中':details.status==5? '升级中':'--'}}
            </span>
          </li>
          <li>IP价格
            <span>{{details.caseType==1? '包年('+details.cpCase+'/年)':details.caseType==2? '包月('+details.cpCase+'/月)' : '实时('+details.cpCase+'/时)'}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="host">
      <div class="host-item">
        <h6 class="title">IP网络详情</h6>
        <ul>
          <li>所属VPC <span>{{details.vpcname}}</span></li>
          <li>IP用途 <span>{{details.usetype == 0 ? '未使用' : details.usetype == 1 ? '绑定主机' : details.usetype == 2 ? '负载均衡' : details.usetype == 3 ? '源NAT' : 'NAT网关'}}</span>
          </li>
          <li>绑定资源
            <span style="color: #4A90E2;">{{details.computername || details.natgatewayname || details.loadbalancerolename}}</span>
            <span style="color: #4A90E2 " v-if="details.usetype == 0">--</span>
          </li>
          <li>创建时间 <span>{{details.createtime}}</span></li>
        </ul>
      </div>
    </div>

    <div class="opreat">
      <h6 class="title">IP操作</h6>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Grid, GridItem, CellFormPreview, Group, Cell, XHeader, XSwitch, Confirm, Toast} from 'vux'
  export default{
    components: {
      Grid,
      GridItem,
      CellFormPreview,
      Group,
      Cell,
      XHeader,
      XSwitch,
      Confirm,
      Toast
    },
    beforeRouteEnter(to, from, next){
      axios.get('network/listPublicIp.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
        }
      }).then(response => {
          next(vm => {
              vm.setData(response)
            }
          )
        }
      )
    },
    data (){
      window.scrollTo(0, 0);
      return {
        details: {},
        showOK: false,
        messageOK: '',
        showError: false,
        messageError: ''
      }
    },
    methods: {
      //获取数据
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          response.data.result.forEach(item => {
            if (item.id == this.$route.query.id) {
              this.details = item
            }
          })
        }
      }
    },

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host {
    background: rgba(243, 243, 243, 1);
    .host-item {
      .title {
        padding: .23rem 0 .2rem .3rem;
        background: rgba(255, 255, 255, 1);
        font-size: .32rem;
        font-weight: normal;
        color: #222;
        line-height: .45rem;
        border-bottom: 1px solid #D9D9D9;
      }
      ul {
        background: rgba(255, 255, 255, 1);
        margin-bottom: .2rem;
        li {
          padding: .24rem .3rem;
          border-bottom: 1px solid #D9D9D9;
          list-style: none;
          font-size: .28rem;
          color: #333;
          span {
            display: inline-block;
            font-size: .28rem;
            color: #666;
            float: right;
          }
        }
      }
    }
  }

  .opreat {
    .title {
      padding: .23rem 0 .2rem .3rem;
      background: rgba(255, 255, 255, 1);
      font-size: .32rem;
      font-weight: normal;
      color: #222;
      line-height: .45rem;
      border-bottom: 1px solid #D9D9D9;
    }
  }
</style>
