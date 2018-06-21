<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header >云服务器</x-header>
    <div class="box" v-if="list!=''">
      <ul>
            <li v-for="(item,index) in list" :key="index">
              <div class="soures">
                <img class="img"  v-if="item.status=='error'" src="../../assets/img/back/error.png">
                <img class="img"  v-if="item.status=='open'" src="../../assets/img/back/open.png">
                <img class="img"  v-if="item.status=='close'" src="../../assets/img/back/close.png">
                <img class="img"  v-if="item.status=='arrears'" src="../../assets/img/back/arrears.png">
                <div>
                  <p class="soures-title">名称: {{item.title}}</p>
                  <p class="soures-desc">镜像系统: {{item.desc}}</p>
                </div>
              </div>
              <p class="check" @click="push(item)">详细信息</p>
            </li>
      </ul>
    </div>
    <p v-else style="color: #ccc;text-align: center;font-size: .3rem;margin: 50% auto;">暂无数据</p>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox, XHeader,Checker, CheckerItem} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader,
      Checker,
      CheckerItem
    },
    data () {
      return {
        list: [],
        address: '',
        Checkbox:[]
      }
    },
    methods: {
      // 查看详情
      push(item){
        if (item.type =='host') {
            this.address = '/ruicloud/hostdetail'
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
    margin-bottom: 1rem;
    ul {
      padding: .3rem;
      background:rgba(255,255,255,1);
      .vux-tap-active{
        width: 100%;
      }
      li {
        border-bottom: 1px solid #e7e7e7;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .soures {
          .img {
            width: .8rem;
            display: inline-block;
          }
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
      .item-selected{
      background: #ccc;
      }
    }
  }
</style>
