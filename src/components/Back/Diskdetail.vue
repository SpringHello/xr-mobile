<template>
  <div>
    <x-header></x-header>
    <!--<div class="host">-->
      <!--<div class="host-item">-->
        <!--<h6 class="title">{{$route.query.name}} <span>修改名称</span></h6>-->
        <!--<ul>-->
          <!--<li>系统镜像 : {{details.template}}</li>-->
          <!--<li>内网IP : {{details.privateIp}}<span class="opon">主机状态 : {{details.computerStatus ? "开机" : "关机"}}</span></li>-->
          <!--<li>主机配置 :{{$route.query.configs}}-->
            <!--<span class="password">点击查看主机密码</span>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<grid :show-lr-borders="false" :show-vertical-dividers="false">-->
          <!--<grid-item v-for="(item,index) in navs" :link="item.url" :key="index">-->
            <!--<img slot="icon" style="border-radius: 50%;background: #cccccc;">-->
            <!--<span slot="label">{{ item.title}}</span>-->
          <!--</grid-item>-->
        <!--</grid>-->

        <!--<div class="xins">-->
          <!--<p class="xin-title">主机基础信息</p>-->
          <!--<ol>-->
            <!--<li>计费方式 <span>{{details.case_type == 1 ? '包年' : details.case_type == 2 ? '包月' : '实时'}}</span></li>-->
            <!--<li>创建时间 <span>{{details.createTime}}</span></li>-->
            <!--<li>有效期 <span>{{details.endTime}}</span></li>-->
            <!--<li>主机价格 <span>{{$route.query.price}}元/小时</span></li>-->
          <!--</ol>-->
        <!--</div>-->
        <!--<div class="xins">-->
          <!--<p class="xin-title">主机网络信息</p>-->
          <!--<ol>-->
            <!--<li>所属VPC <span>{{details.vpc}}</span></li>-->
            <!--<li>绑定公网 <span style="color: #108EE9;">{{details.publicIp}}</span></li>-->
          <!--</ol>-->
        <!--</div>-->

      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Grid, GridItem, CellFormPreview, Group, Cell, XHeader} from 'vux'
  export default{
    components: {
      Grid,
      GridItem,
      CellFormPreview,
      Group,
      Cell,
      XHeader
    },
    data (){
      return {
        details: '',
        navs: [
          {title: "续费", url: ""},
          {title: "升级", url: ""},
          {title: "监控", url: ""},
        ]
      }
    },
    methods: {},
    beforeRouteEnter(to, from, next){
      axios.get('Disk/listDisk.do',{
        params:{
          zoneId: $store.state.zone.zoneid,
//          diskId:to.query.id
        }
      }).then(response=>{
          next(vm=>{
              vm.details=response.data.result
          })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host {
    padding: .5rem;
    .host-item {
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
          .opon {
            float: right;
            color: rgba(102, 102, 102, 1);
            line-height: .7rem;
            font-size: .7rem;
          }
          .password {
            float: right;
            color: #2B99F2;
            font-size: .7rem;
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
