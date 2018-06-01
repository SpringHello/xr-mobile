<template>
  <div>
    <x-header></x-header>
    <div class="ip">
      <div class="ip-item">
        <h6 class="title">{{ipdetails.vpcname}}<span> 修改名称</span></h6>
        <ul>
          <li>系统镜像 :</li>
          <li>内网IP : {{ipdetails.cidr}}<span class="open">主机状态 : {{ipdetails.status ? "正常" : "不正常"}}</span></li>
          <li>主机配置 :
            <span class="password">点击查看主机密码</span>
          </li>
        </ul>
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item v-for="(item,index) in navs" :link="item.url" :key="index">
            <img slot="icon" style="border-radius: 50%;background: #cccccc;">
            <span slot="label">{{ item.title}}</span>
          </grid-item>
        </grid>

        <div class="xins">
          <p class="xin-title">主机基础信息</p>
          <ol>
            <li>计费方式 <span>{{$route.query.case =='1'? '包年':$route.query.case == '2'? '包月' : '实时'}}</span></li>
            <li>创建时间 <span>{{ipdetails.createtime}}</span></li>
            <li>有效期 <span>{{ipdetails.endtime}}</span></li>
            <li>主机价格 <span>{{$route.query.price}}元/{{$route.query.case =='1'? '年':$route.query.case == '2'? '月' : '小时'}}</span></li>
          </ol>
        </div>
        <div class="xins">
          <p class="xin-title">主机网络信息</p>
          <ol>
            <li>所属VPC <span>{{ipdetails.vpcname}}</span></li>
            <li>绑定公网 <span style="color: #108EE9;">{{$route.query.public}}</span></li>
          </ol>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader,Grid, GridItem,} from 'vux'
  export default{
    components: {
      XHeader,
      Grid,
      GridItem,
    },
    data (){
      return {
        ipdetails:{},
        navs: [
          {title: "续费", url: ""},
          {title: "升级", url: ""},
          {title: "监控", url: ""},
        ]
      }
    },
    beforeRouteEnter(to, from, next){
      axios.get('information/getVpcTopo.do', {
        params: {
          vpcId: to.query.vpcid
        }
      }).then(response => {
        next(vm => {
          vm.ipdetails = response.data.result
        })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .ip {
    padding: .5rem;
    .ip-item {
      .title {
        font-size: .8rem;
        font-weight: normal;
        color: rgba(34, 34, 34, 1);
        line-height: 1.2rem;
        span {
          font-size: .65rem;
          color: #2B99F2;
        }
      }
      ul {
        padding: .5rem 0;
        li {
          list-style: none;
          font-size: .65rem;
          color: rgba(34, 34, 34, 1);
          line-height: 1.3rem;
          .open {
            float: right;
            color: rgba(102, 102, 102, 1);
            line-height: .7rem;
            font-size: .7rem;
          }
          .password {
            float: right;
            color: #2B99F2;
            font-size: .65rem;
          }
        }
      }
      .xins {
        .xin-title {
          padding: .7rem 0;
          font-size: .7rem;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid #e7e7e7;
        }
        ol {
          padding: .7rem 0;
          li {
            list-style: none;
            font-size: .7rem;
            color: rgba(102, 102, 102, 1);
            line-height: 1.3rem;
            span {
              float: right;
            }
          }
        }
      }
    }
  }
</style>
