<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header>云服务器</x-header>
    <Group>
      <popup-picker title="节点选择" :data="nodeList" v-model="nodes" :columns="3"
                    show-name @on-change="nodeChange"></popup-picker>
    </Group>
    <div class="box" v-if="list!=''">
      <ul>
        <li v-for="(item,index) in list" :key="index"
            v-show="item.status=='open' || item.status=='close'||item.status=='wait'">
          <div class="soures" @click="operation(item.id,item.status,item.statusL)">
            <img class="img" v-if="item.status=='open'" src="../../assets/img/back/open.png">
            <img class="img" v-if="item.status=='close'" src="../../assets/img/back/close.png">
            <img class="img" v-if="item.status=='wait'" src="../../assets/img/back/open.png">
            <!--<img class="img" v-if="item.status=='arrears'" src="../../assets/img/back/arrears.png">-->
            <div>
              <p class="soures-title">{{item.title}}</p>
              <p class="soures-desc">镜像系统: {{item.name}}</p>
            </div>
          </div>
          <p class="check" @click="push(item)">详细信息</p>
        </li>
      </ul>
    </div>
    <div v-else class="nodata">
      <img src="../../assets/img/back/zero.png">
      <p> 暂无数据 </p>
    </div>

    <actionsheet v-model="showOpera" :menus="menus" @on-click-menu="clickItem" show-cancel
                 :close-on-clicking-mask="false"></actionsheet>

    <toast v-model="showOK" type="text" is-show-mask :text="messageOK" position="middle" width="60%"></toast>
    <toast v-model="showError" type="text" is-show-mask :text="messageError" position="middle" width="60%"></toast>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox, XHeader, Actionsheet, Toast, PopupPicker} from 'vux'
  function getHost(cb, zoneid) {
    let list = []
    axios.get('information/listVirtualMachines.do', {
      params: {
        zoneId: zoneid
      }
    }).then((response) => {
      for (let type in response.data.result) {
        response.data.result[type].list.forEach(host => {
          list.push({
            status: type,
            title: host.computername,
            name: host.templatename,
            desc: host.serviceoffername,
            id: host.computerid,
            price: host.cpCase,
            password: host.connectpassword,
            statusL: host.status
          })
        })
      }
      cb(list)
    })
  }
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader,
      Actionsheet,
      Toast,
      PopupPicker
    },
    beforeRouteEnter(to, from, next){
      let cb = (list) => {
        next(vm => {
          vm.setData(list)
          $store.state.zoneList.forEach(e => {
            vm.nodeList.push({name: e.zonename, value: e.zoneid})
          })
        })
      }
      getHost(cb, $store.state.zone.zoneid)
    },
    data () {
      window.scrollTo(0, 0);
      return {
        //节点选择
        nodeList: [],
        nodes: [$store.state.zone.zoneid],

        list: [],
        address: '',
        showOpera: false,
        menus: {},
        //开机
        menusOpen: {
          restart: '<span style="color: #4A90E2;">重启</span>',
          close: '<span style="color:#4A90E2;">关机</span>',
        },
        //欠费
        menusArrears: {},
        //关机
        menusClose: {
          start: '<span style="color: #4A90E2;">开启</span>',
        },
        //选择的主机对象
        id: '',
        status: '',
        showOK: false,
        messageOK: '',
        showError: false,
        messageError: ''

      }
    },
    mounted(){
      let cb = (list) => {
        this.setData(list)
      }
      this.setInt = setInterval(() => {
        getHost(cb, this.nodes[0])
      }, 5000)

    },
    methods: {
      //节点选择
      nodeChange(){
        axios.get('information/listVirtualMachines.do', {
          params: {
            zoneId: this.nodes[0]
          }
        }).then((response) => {
          this.list = []
          for (let type in response.data.result) {
            response.data.result[type].list.forEach(host => {
              this.list.push({
                status: type,
                title: host.computername,
                name: host.templatename,
                desc: host.serviceoffername,
                id: host.computerid,
                price: host.cpCase,
                password: host.connectpassword,
                statusL: host.status
              })
            })
          }
        })
      },
      // 查看详情
      push(item){
        this.address = '/ruicloud/hostdetail'
        var params = {
          id: item.id,
          name: item.title,
          configs: item.desc,
          price: item.price,
          password: item.password
        }
        if (item.id) {
          this.$router.push({path: this.address, query: params})
        } else {
          this.$vux.toast.text('暂无详情信息', 'middle')
        }
      },
      // 操作
      operation(id, type, statusL){
        this.id = id
        switch (type) {
          case 'open':
            this.status = statusL
            this.menus = this.menusOpen
            break;
          case 'close':
            this.menus = this.menusClose
            this.status = statusL
            break;
          case 'arrears':
            this.menus = this.menusArrears
            break;
        }
        this.showOpera = true
      },
      clickItem(key){
        //重启
        if (key == 'restart') {
          axios.get('information/rebootVirtualMachine.do', {
            params: {
              VMId: this.id
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.showOK = true
              this.messageOK = response.data.message
            } else {
              this.showError = true
              this.messageError = response.data.message

            }
          })
        }
        // 启动
        if (key == 'start') {
          this.status = 2
          axios.get('information/startVirtualMachine.do', {
            params: {
              VMId: this.id,
              zoneId: $store.state.zone.zoneid
            }
          }).then(response => {
            this.loading = false
            if (response.status == 200 && response.data.status == 1) {
              this.showOK = true
              this.messageOK = response.data.message
            } else {
              this.status = 1
            }
          })
        }
        //关机
        if (key == 'close') {
          this.status = 2
          axios.get('information/stopVirtualMachine.do', {
            params: {
              VMId: this.id,
              forced: true,
              zoneId: $store.state.zone.zoneid
            }
          })
            .then(response => {
              this.loading = false
              if (response.status == 200 && response.data.status == 1) {
                this.status = 2
                this.showOK = true
                this.messageOK = response.data.message
              } else {
                this.status = 1
              }
            })
        }
      },
      setData(list){
        this.list = list
      }
    },
    created(){
      this.nodeChange();
    },
    beforeDestroy(){
      clearInterval(this.setInt)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .box {
    margin-top: .2rem;
    border-top: 1px solid #e7e7e7;
    ul {
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid #e7e7e7;
      li {
        border-bottom: 1px solid #e7e7e7;
        list-style: none;
        display: flex;
        align-items: center;
        margin-left: .3rem;
        justify-content: space-between;
        padding: .2rem .3rem .2rem 0;
        .soures {
          width: 78%;
          display: flex;
          align-items: center;
          .img {
            width: .8rem;
            margin-right: .24rem;
          }
          > div {
            .soures-title {
              font-size: .32rem;
              color: rgba(34, 34, 34, 1);
            }
            .soures-desc {
              color: rgba(153, 153, 153, 1);
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
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }

  .nodata {
    text-align: center;
    margin: 50% auto;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    p {
      font-size: .36rem;
      color: rgba(153, 153, 153, 1);
      line-height: 0;
    }
  }

</style>
