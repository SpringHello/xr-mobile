<template>
  <div id="hostdetails">
    <x-header></x-header>
    <div class="host">
      <div class="host-item">
        <div class="top">
          <h6 class="title" style="vertical-align: middle;">{{name}}<span
            style="color: #4A90E2;font-size: .24rem;line-height:.33rem;padding-left: .3rem; "
            @click="rename=true">
            <img src="../../assets/img/back/Fill.png"> 修改名称</span>
          </h6>
          <ul>
            <li>主机状态：{{details.computerStatus ? "开机" : "关机"}}</li>
            <li>系统镜像：{{details.template}}</li>
            <li>系统盘：<span style="color:rgba(74,144,226,1);">{{details.memory}}G</span></li>
            <li>内网IP：{{details.privateIp}}</li>
            <li>主机配置：{{$route.query.configs}}</li>
            <li>主机密码：<span style="color:rgba(74,144,226,1);" @click="sendPassword">发送密码</span></li>
          </ul>
          <img src="../../assets/img/back/open.png" class="img">
        </div>
        <div class="xins">
          <p class="xin-title">主机基础信息</p>
          <ol>
            <li>计费方式 <span>{{details.case_type == 1 ? '包年' : details.case_type == 2 ? '包月' : '实时'}}</span></li>
            <li>创建时间 <span>{{details.createTime}}</span></li>
            <li>有效期 <span>{{details.endTime}}</span></li>
            <li>主机价格
              <span>{{$route.query.price}}/{{details.case_type == 1 ? '年' : details.case_type == 2 ? '月' : '小时'}}</span>
            </li>
          </ol>
        </div>
        <div class="xins">
          <p class="xin-title">主机网络信息</p>
          <ol>
            <li>所属VPC <span>{{details.vpc}}</span></li>
            <li>绑定公网 <span style="color: #108EE9;">{{details.publicIp}}</span></li>
            <li>所属负载均衡 <span style="color: #108EE9;">{{balance}}</span></li>
          </ol>
        </div>
        <div class="disks">
          <p class="disks-title">磁盘与快照</p>
          <ol>
            <li>挂载磁盘 <span>{{disk}}</span></li>
            <li>挂载磁盘容量统计 <span></span></li>
            <li>主机快照 <span></span></li>
          </ol>
        </div>

        <!--主机操作-->
        <div class="handle">
          <p class="handle-title">主机操作</p>
          <div class="handle-content">
            <router-link v-for="(item,index) in hostHandle" :key="index" :to="item.url">
              <div @click="onOpen(item.url)">
                <img :src="item.img">
                <p>{{item.title}}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div v-transfer-dom>
          <confirm v-model="showSend"
                   title="发送主机密码"
                   @on-confirm="sendOk">
            <div style="text-align:center;">
              <p style="font-size: .3rem;color: #888;padding-bottom: .2rem;">请输入控制台登录密码</p>
              <input v-model="lookPassword" type="text"
                     style="outline: none;border:none;border-bottom: 1px solid #e7e7e7;text-align: center;font-size: .36rem;color: #333;width: 70%;">
              <div style="padding-top: .35rem;">
                <check-icon :value.sync="email" v-show="$store.state.userInfo.loginname"><span
                  style="font-size: .3rem;color: #888;">邮箱接收</span></check-icon>
                <check-icon :value.sync="phone" v-show="$store.state.userInfo.phone"><span
                  style="font-size: .3rem;color: #888;">短信接收</span></check-icon>
              </div>
            </div>
          </confirm>
        </div>
        <div v-transfer-dom>
          <confirm v-model="rename"
                   title="主机重命名"
                   @on-confirm="Cname">
            <div style="text-align:center;">
              <p style="font-size: .3rem;color: #888;padding-bottom: .2rem;">请输入主机名</p>
              <input v-model="newName" type="text"
                     style="text-align: center;font-size: .36rem;color: #333;width: 70%;outline: none;border: none;border-bottom: 1px solid #e7e7e7">
            </div>
          </confirm>
        </div>
        <toast v-model="show" type="text" is-show-mask text="暂未开放" position="middle" width="25%"></toast>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {
    Confirm,
    TransferDomDirective as TransferDom,
    CellFormPreview,
    Group,
    Cell,
    XHeader,
    Toast,
    CheckIcon
  } from 'vux'
  export default{
    components: {
      Confirm,
      TransferDom,
      CellFormPreview,
      Group,
      Cell,
      XHeader,
      Toast,
      CheckIcon
    },
    data (){
      window.scrollTo(0, 0);
      return {
        //重命名
        rename: false,
        name: this.$route.query.name,
        newName: '',
        //暂未开放
        show: false,
        showSend: false,
        details: {},
        balance: '',
        disk: '',
        //主机操作
        hostHandle: [
          {img: require('../../assets/img/back/xufei.png'), title: '续费', url: ''},
          {img: require('../../assets/img/back/shengji.png'), title: '升级', url: ''},
          {img: require('../../assets/img/back/jkong.png'), title: '监控', url: ''},
          {img: require('../../assets/img/back/mima.png'), title: '重置主机密码', url: ''},
          {img: require('../../assets/img/back/riji.png'), title: '查看操作日志', url: ''}
        ],
        //发送主机密码
        lookPassword: '',
        email: false,
        phone: true,
      }
    },
    methods: {
      //暂未开放
      onOpen(url){
        if (url == '') {
          this.show = true
        }
      },
      //主机重命名
      Cname(){
        if (this.newName) {
          axios.post('information/changeVmName.do', {
            name: this.newName,
            vmId: this.details.computerId,
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.name = this.newName
            }
          })

        } else {
          this.$vux.toast.text('请输入主机名', 'middle')
        }
      },
      //发送密码弹窗
      sendPassword(){
        this.showSend = true
      },
      //确认发送
      sendOk(){
        if (this.lookPassword) {
          axios.post('log/sendVMPassword.do', {
            VMId: this.details.computerId,
            password: this.lookPassword,
            letter: '1',
            email: this.email ? '1' : '0',
            phone: this.phone ? '1' : '0'
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$vux.toast.text(response.data.message, 'middle')
            } else {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        } else {
          this.$vux.toast.text('请输入控制台登录密码', 'middle')
        }

      },

    },
    beforeRouteEnter(to, from, next){
      axios.get('information/listVMByComputerId.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          VMId: to.query.id
        }
      }).then(response => {
          next(vm => {
              vm.details = response.data.result
              vm.balance = vm.details.loadbalance.join('|')
              vm.disk = vm.details.disk.join('|')
            }
          )
        }
      )
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host {
    .host-item {
      .top {
        background: rgba(255, 255, 255, 1);
        padding: .14rem .18rem .12rem .3rem;
        border-bottom: 1px solid #e7e7e7;
        margin-bottom: .2rem;
        .title {
          font-size: .32rem;
          font-weight: normal;
          color: #222;
          line-height: .45rem;
          padding-bottom: .28rem;
        }
        ul {
          li {
            list-style: none;
            font-size: .28rem;
            color: #333;
            line-height: .4rem;
            padding-bottom: .2rem;
          }
        }
        .img {
          position: absolute;
          right: 0;
          top: 1.3rem;
        }
      }
      .xins {
        background: rgba(255, 255, 255, 1);
        margin-bottom: .2rem;
        border-bottom: 1px solid #e7e7e7;
        .xin-title {
          margin-left: .3rem;
          padding: .23rem 0 .2rem 0;
          font-size: .32rem;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid #e7e7e7;
        }
        ol {
          margin-left: .3rem;
          li {
            padding-right: .3rem;
            border-bottom: 1px solid #e7e7e7;
            list-style: none;
            font-size: .28rem;
            color: #333;
            line-height: .8rem;
            span {
              float: right;
              color: #666;
            }
            &:last-of-type {
              border-bottom: none;
            }
          }
        }
      }
      .disks {
        background: rgba(255, 255, 255, 1);
        border-bottom: 1px solid #e7e7e7;
        margin-bottom: .2rem;
        .disks-title {
          margin-left: .3rem;
          padding: .23rem 0 .2rem 0;
          font-size: .32rem;
          color: rgba(51, 51, 51, 1);
          border-bottom: 1px solid #e7e7e7;
        }
        ol {
          margin-left: .3rem;
          li {
            padding-right: .3rem;
            border-bottom: 1px solid #e7e7e7;
            list-style: none;
            font-size: .28rem;
            color: #333;
            line-height: .8rem;
            span {
              color: #4A90E2;
              float: right;
            }
            &:last-of-type {
              border-bottom: none;
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
              width: .8rem;
              height: .8rem;
              margin: 0 auto;
              display: block;
            }
            p {
              padding-top: .32rem;
              font-size: .28rem;
              color: #222;
            }
          }
        }
      }
    }
  }
</style>
