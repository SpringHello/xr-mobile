<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header></x-header>
    <div class="box">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="push(item)">
          <div class="soures">
            <img class="img" src="" :class="{error:item.status=='error',open:item.status=='open',close:item.status=='close',arrears:item.status=='arrears'}">
            <div>
              <p class="soures-title">{{item.title}}</p>
              <p class="soures-desc">系统镜像: {{item.desc}}</p>
            </div>
          </div>
          <p class="check">详细信息</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox, XHeader} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader
    },
    data () {
      return {
        list: [],
        address: '',
      }
    },
    methods: {
      push(item){
        if (item.type =='host') {
            this.address = 'hostDetail'
               var params = {
              id: item.id,
              name: item.title,
              configs: item.desc,
              price: item.price,
              password:item.password
            }
        }
        this.$router.push({path: this.address, query: params})
      },
      setData(list){
        this.list = list
      }
    },
    beforeRouteEnter(to, from, next){
      let url = ''
      let list = []
      let operate = null
      if(to.query.type =='host') {
          url = 'information/listVirtualMachines.do'
          operate = (response) => {
            for (let type in response.data.result) {
              response.data.result[type].list.forEach(host => {
                list.push({type: 'host', status: type, title: host.instancename, desc: host.templatename, id: host.computerid, price: host.cpCase, password:host.connectpassword
                })
              })
            }
          }
      }
      axios.get(url, {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      }).then(response => {
        operate(response)
        next(vm => {
          vm.setData(list)
        })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .box {
    background:rgba(243,243,243,1);
    ul {
      padding: .3rem;
      background:rgba(255,255,255,1);
      li {
        border-bottom: 1px solid #e7e7e7;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .soures {
          .img {
            width: .8rem;
            height: .8rem;
            margin-right: .24rem;
            /*background: #00aaff;*/
            display: inline-block;
          }
          /*.error {*/
            /*background: rgb(242, 71, 71);*/
          /*}*/
          /*.open {*/
            /*background: #00aaff;*/
          /*}*/
          /*.close{*/
            /*background: #ccc;*/
          /*}*/
          /*.arrears{*/
            /*background: yellow;*/
          /*}*/
          > div {
            display: inline-block;
            .soures-title {
              font-size: .32rem;
              color: rgba(34, 34, 34, 1);
            }
            .soures-desc {
              color: rgba(153, 153, 153, 1);
              line-height: .33rem;
              font-size: .24rem;
              padding-top: .08rem;
            }
          }
        }
        .check {
          color: rgba(102, 102, 102, 1);
          font-size: .28rem;
          &::after {
            content: '';
            width: .15rem;
            height: .15rem;
            border-right: 1px solid #999999;
            border-bottom: 1px solid #999999;
            transform: translateY(-.025rem) rotate(311deg);
            display: inline-block;
            margin-left: .2rem;
          }
        }
      }
    }
  }
</style>
