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
              <p class="soures-title">{{item.title}}
                <span v-if="item.type=='disk'" style="font-size: .6rem;color: #4A90E2;">
                  {{item.status === 0 ? '欠费' : (item.status === 1 && !item.mounton && !item.mountonname) ? '可挂载' : (item.status === 1 && item.mounton && item.mountonname) ? '已启用（' + item.mountonname + ')' : item.status === -1 ? '异常' : item.status === 2 ? '创建中' : item.status === 3 ? '删除中' : item.status === 4 ? '卸载中' : item.status === 5 ? '挂载中' :item.status === 6 ? '备份中': ''}}
                </span>
              </p>
              <span class="soures-desc">{{item.diskoffer == 'ssd' ? 'SSD存储' : item.diskoffer == 'sas' ? 'SAS存储' : 'SATA存储'}}</span> <span v-if="item.type=='disk'" style="display: inline-block;margin-left: 1rem;" class="soures-desc">{{item.disksize}}G</span>
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
        switch (item.type) {
          case 'host':
            this.address = 'hostDetail'
            var params = {
              id: item.id,
              name: item.title,
              configs: item.desc,
              price: item.price,
              password:item.password
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
                list.push({type: 'host', status: type, title: host.instancename, desc: host.templatename, id: host.computerid, price: host.cpCase, password:host.connectpassword
                })
              })
            }
          }
          break;
        case 'disk':
          url = 'Disk/listDisk.do'
          operate = (response) => {
            response.data.result.forEach(disk => {
              list.push({type: 'disk', title: disk.diskname, desc: disk.diskoffer,id:disk.diskid, status:disk.status,mounton:disk.mounton,mountonname:disk.mountonname,disksize:disk.disksize
              })
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
