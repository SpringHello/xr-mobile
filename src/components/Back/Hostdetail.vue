<template>
  <div>
    <x-header></x-header>
    <div class="host">
      <div class="host-item">
        <h6 class="title">{{$route.query.name}} <span style="float: right;font-size: .28rem;">主机状态 : {{details.computerStatus ? "开机" : "关机"}}</span>
        </h6>
        <ul>
          <li>系统镜像 : <span style="float: right;color: #333;">{{details.template}}</span></li>
          <li>系统盘 : <span style="float: right;color: #333;"></span></li>
          <li style="text-align: right;color: #4A90E2;">{{details.memory}}G</li>
          <li>内网IP : <span style="float: right;color: #333;">{{details.privateIp}}</span></li>
          <li>主机配置 :<span style="float: right;color: #333;">{{$route.query.configs}}</span></li>
          <li>主机密码 :<span style="float: right;color: #4A90E2;font-size: .28rem">发送密码</span></li>
        </ul>


        <div class="xins">
          <p class="xin-title">主机基础信息</p>
          <ol>
            <li>计费方式 <span>{{details.case_type == 1 ? '包年' : details.case_type == 2 ? '包月' : '实时'}}</span></li>
            <li>创建时间 <span>{{details.createTime}}</span></li>
            <li>有效期 <span>{{details.endTime}}</span></li>
            <li>主机价格 <span>{{$route.query.price}}/{{details.case_type == 1 ? '年' : details.case_type == 2 ? '月' : '小时'}}</span>
            </li>
          </ol>
        </div>
        <div class="xins">
          <p class="xin-title">主机网络信息</p>
          <ol>
            <li>所属VPC <span>{{details.vpc}}</span></li>
            <li>绑定公网 <span style="color: #108EE9;">{{details.publicIp}}</span></li>
            <li>所属负载均衡 <span style="color: #108EE9;">{{details.loadbalance.join('|')}}</span></li>
          </ol>
        </div>
        <div class="disks">
          <p class="disks-title">磁盘与快照</p>
          <ol>
            <li>挂载磁盘 <span>{{details.disk.join('|') }}</span></li>
            <li>挂载磁盘容量统计 <span></span></li>
            <li>主机快照 <span></span></li>
          </ol>
        </div>

        <!--主机操作-->
        <div class="handle">
          <p class="handle-title">主机操作</p>
          <div class="handle-content">
            <router-link v-for="(item,index) in hostHandle" :key="index" :to="item.url">
              <div>
                <img src="">
                <p>{{item.title}}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
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
      XHeader,
    },
    data (){
      window.scrollTo(0, 0);
      return {
        details: {},
        //主机操作
        hostHandle: [
          {img: '', title: '续费', url: '/home'},
          {img: '', title: '升级', url: '/home'},
          {img: '', title: '监控', url: '/home'},
          {img: '', title: '重置主机密码', url: '/home'},
          {img: '', title: '查看操作日志', url: '/home'}
        ]
      }
    },
    methods: {},
    beforeRouteEnter(to, from, next){
      axios.get('information/listVMByComputerId.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          VMId: to.query.id
        }
      }).then(response =>
      {
        next(vm=>
      {
        vm.details = response.data.result
    }
    )
    }
    )
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host {
    background: rgba(243, 243, 243, 1);
    .host-item {
      .title {
        padding: .2rem;
        background: rgba(255, 255, 255, 1);
        font-size: .32rem;
        font-weight: normal;
        color: #222;
        line-height: .45rem;
      }
      ul {
        background: rgba(255, 255, 255, 1);
        border-bottom: 1px solid #D9D9D9;
        margin-bottom: .2rem;
        padding: .3rem;
        li {
          list-style: none;
          font-size: .28rem;
          color: #999;
          line-height: .8rem;
        }
      }
      .xins {
        background: rgba(255, 255, 255, 1);
        margin-bottom: .2rem;
        .xin-title {
          padding: .23rem .3rem;
          font-size: .32rem;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid #e7e7e7;
        }
        ol {
          li {
            padding: 0 0.3rem;
            border-bottom: 1px solid #e7e7e7;
            list-style: none;
            font-size: .28rem;
            color: #333;
            line-height: 1rem;
            span {
              float: right;
              color: #666;
            }
          }
        }
      }
      .disks {
        background: rgba(255, 255, 255, 1);
        margin-bottom: .2rem;
        .disks-title {
          padding: .23rem .3rem;
          font-size: .32rem;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid #e7e7e7;
        }
        ol {
          li {
            padding: 0 .3rem;
            list-style: none;
            font-size: .28rem;
            color: #333;
            line-height: 1rem;
            border-bottom: 1px solid #e7e7e7;
            span {
              color: #4A90E2;
              float: right;
            }
          }
        }
      }

      //主机操作
      .handle {
        background: rgba(255, 255, 255, 1);
        margin-bottom: .2rem;
        border-top: 1px solid #e7e7e7;
        border-bottom: 1px solid #e7e7e7;
        padding: .4rem 0;
        .handle-title {
          padding: 0.2rem .3rem;
          font-size: .32rem;
          color: rgba(51, 51, 51, 1);
        }
        .handle-content {
          padding: .5rem;
          display: flex;
          flex-wrap: wrap;
          a {
            width: 33.3%;
          }
          div {
            text-align: center;
            margin-bottom: .5rem;
            img {
              width: .64rem;
              height: .64rem;
              margin: 0 auto;
              display: block;
            }
            p {
              padding-top: .8rem;
              font-size: .28rem;
              color: #222;
            }
          }
        }
      }
    }
  }
</style>
