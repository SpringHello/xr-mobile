<template>
  <div class="host">
    <x-header></x-header>
    <div class="host-item">
      <h6 class="title">{{details.instancename}}</h6>
      <ul>
        <li>系统镜像：{{details.templatename}}</li>
        <li>内网IP：{{details.privateip}}<span>主机状态：{{details.computerstate ? "开机" : "关机"}}</span></li>
        <li>主机配置：{{details.serviceoffername}}</li>
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
          <li>计费方式 <span>{{details.caseType == 1 ? '包年' : details.caseType == 2 ? '包月' : '实时'}}</span> </li>
          <li>创建时间 <span>{{details.createtime}}</span> </li>
          <li>有效期 <span>{{details.endtime}}</span> </li>
          <li>主机价格 <span></span> </li>
        </ol>
      </div>
      <div class="xins">
        <p class="xin-title">主机网络信息</p>
        <ol>
          <li>所属VPC <span>{{details.vpcname}}</span> </li>
          <li>绑定公网 <span style="color: #108EE9;">{{details.publicip}}</span> </li>
        </ol>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import { Grid, GridItem ,CellFormPreview ,Group, Cell} from 'vux'
  export default{
    components: {
      Grid,
      GridItem,
      CellFormPreview,
      Group,
      Cell
    },
    data (){
      return {
        details:JSON.parse(sessionStorage.getItem('items')),
        navs:[
          {title:"续费",url:""},
          {title:"升级",url:""},
          {title:"监控",url:""},
        ]
      }
    },
    methods:{},
  }
</script>

<style  rel="stylesheet/less" lang="less" scoped>
.host{
  padding: 1rem;
  .host-item{
    .title{
      font-size:.85rem;
      font-weight: normal;
      color:rgba(34,34,34,1);
      line-height:1.2rem;
    }
    ul{
      padding: .8rem 0;
      li{
        list-style: none;
        font-size:.7rem;
        color:rgba(34,34,34,1);
        line-height:1.3rem;
        span{
          float: right;
          color:rgba(102,102,102,1);
          line-height:.6rem;
        }
      }
    }
    .xins{
      .xin-title{
        padding: .8rem 0;
        font-size: .75rem;
        color:rgba(51,51,51,1);
        border-bottom: 1px solid #e7e7e7;
      }
      ol{
        padding: .8rem 0;
        li{
          list-style: none;
          font-size:.75rem;
          color:rgba(102,102,102,1);
          line-height:1.5rem;
          span{
            float: right;
          }
        }
      }
    }
  }
}
</style>
