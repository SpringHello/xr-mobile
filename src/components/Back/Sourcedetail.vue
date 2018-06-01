<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header></x-header>
    <div class="box">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="push(item)">
          <div class="soures">
            <img src="" :class="{error:item.status=='error',open:item.status=='open',close:item.status=='close',arrears:item.status=='arrears'}">
            <div>
              <p class="soures-title">{{item.title}}</p>
              <span class="soures-desc">{{item.desc}}</span>
            </div>
          </div>
          <p class="check">查看详情</p>
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
        switch (item.type) {
          case 'host':
            this.address = 'hostDetail'
               var params = {
              id: item.id,
              name: item.title,
              configs: item.desc,
              price: item.price
            }
            break;
          case 'disk':
            this.address = 'diskDetail'
            var params={
                id:item.id
            }
            break;
          case 'ip':
            this.address = 'ipDetail'
            var params ={
              vpcid:item.vpcId,
              public:item.public,
              case:item.case,
              price:item.price
            }
            break;
          case 'balance':
            this.address = 'balanceDetail'
            break;
        }
        this.$router.push({path: this.address, query: params})
      },
      setData(list){
        this.list = list
      }
    },
    beforeRouteEnter(to, from, next){
      let url = ''
      let type = to.query.type
      let list = []
      let operate = null
      switch (to.query.type) {
        case 'host':
          url = 'information/listVirtualMachines.do'
          operate = (response) => {
            for (let type in response.data.result) {
              response.data.result[type].list.forEach(host => {
                list.push({type: 'host', status: type, title: host.instancename, desc: host.serviceoffername, id: host.computerid, price: host.cpCase
                })
              })
            }
          }
          break;
        case 'disk':
          url = 'Disk/listDisk.do'
          operate = (response) => {
            response.data.result.forEach(disk => {
              list.push({type: 'disk', title: disk.diskname, desc: disk.diskoffer,id:disk.diskid})
            })
          }
          break;
        case 'ip':
          url = 'network/listPublicIp.do'
          operate = (response) => {
            response.data.result.forEach(ip => {
              list.push({type: 'ip', title: ip.vpcname, desc: ip.publicip,vpcId:ip.vpcid,public:ip.publicip,price:ip.cpCase,case:ip.caseType})
            })
          }
          break;
        case 'balance':
          url = 'loadbalance/listLoadBalanceRole.do'
          operate = (response) => {
            for (let type in response.data.result) {
              response.data.result[type].forEach(balance => {
                var name = balance.lbname || balance.name
                var text = balance._internal ? '内网负载均衡' : '公网负载均衡'
                list.push({type: 'balance', status: type, title: name, desc: text})
              })
            }
          }
          break;
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
    ul {
      padding: 0 .5rem;
      li {
        padding: .5rem 0;
        border-bottom: 1px solid #e7e7e7;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .soures {
          display: flex;
          img {
            width: 2.5rem;
            height: 2.5rem;
            margin-right: .5rem;
            background: #00aaff;
            vertical-align: middle;
          }
          .error {
            background: rgb(242, 71, 71);
          }
          .open {
            background: #00aaff;
          }
          .close{
            background: #ccc;
          }
          .arrears{
            background: yellow;
          }
          > div {
            font-size: .7rem;
            .soures-title {
              color: rgba(34, 34, 34, 1);
            }
            .soures-desc {
              color: rgba(153, 153, 153, 1);
              line-height: 1.5rem;
            }
          }
        }
        .check {
          color: rgba(102, 102, 102, 1);
          font-size: .7rem;
          &::after {
            content: '';
            width: 10px;
            height: 10px;
            border-right: 1px solid #999999;
            border-bottom: 1px solid #999999;
            transform: translateY(.05rem) rotate(311deg);
            display: inline-block;
            margin-left: .3rem;
          }
        }
      }
    }
  }
</style>
