<template>
  <div id="shop-host">
    <XHeader>购买</XHeader>
    <tab active-color="#4A90E2">
      <tab-item selected @on-item-click="click">快速配置</tab-item>
      <tab-item @on-item-click="click">自定义配置</tab-item>
    </tab>
    <div class="public">
      <p>不同区域的资源内网互不相通,请选择与您相近的区域</p>
      <Group>
        <popup-picker title="地域选择" :data="regionaList" v-model="regional" :columns="3" show-name></popup-picker>
      </Group>
      <Group>
        <radio :options="radio" v-model="str" @on-change="change1"></radio>
        <popup-picker title="包年包月计费(惠)" :data="chargeType" v-model="charges" :columns="3" show-name
                      @on-change="change2"></popup-picker>
      </Group>
    </div>
    <div v-show="index==0" class="qucikly">
      <Group>
        <cell title="主机规格选择"></cell>

        <popup-picker title="镜像类型" :data="mirrorTypelist" v-model="mirrorType" :columns="3" show-name
                      @on-change="changeType"></popup-picker>

        <popup-picker title="镜像系统" :data="mirrorCustomlist" v-model="mirrorCustom" :columns="3"
                      @on-change="mirrorValue" show-name></popup-picker>

        <x-switch title="购买公网IP" v-model="buyIP" @on-change="BuyIp"></x-switch>

        <popup-picker title="配置" :data="configs" v-model="config" :columns="3" show-name></popup-picker>
      </Group>

      <Group>
        <cell title="登录设置"></cell>

        <popup-picker title="主机信息" :data="hostMsg" v-model="hostmsg" :columns="3" show-name></popup-picker>

        <x-input title="主机名称" v-model="hostName" placeholder="请输入主机名称" v-show="hostmsg[0]=='custom'"
                 placeholder-align="right" text-align="right"></x-input>

        <cell title="系统用户名" :value="userName"></cell>

        <cell title="登录密码" v-show="hostmsg[0]=='default'" inline-desc="密码为默认密码，创建成功后通过短信和站内信查看"></cell>
        <x-input title="登录密码" v-model="loginPassword" placeholder="请设置登录密码" v-show="hostmsg[0]=='custom'"
                 placeholder-align="right" text-align="right" @on-blur="setPassword"></x-input>

        <x-switch title="自动续费"></x-switch>
      </Group>
      <div class="qucikly-bottom">
        <p>配置价格：<span>¥ 0.00</span></p>
        <button>立即购买</button>
      </div>
    </div>
    <div v-show="index==1" class="custom">

    </div>
  </div>
</template>

<script>
  import RegExp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader, Tab, TabItem, PopupPicker, Group, Radio, Cell, XSwitch, XInput} from 'vux'
  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      PopupPicker,
      Group,
      Radio,
      Cell,
      XSwitch,
      XInput
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
          vm.configs = vm.isBuyConfig
        }
      )
    },
    data () {
      let regionaList = []
      this.$store.state.zoneList.forEach(zone => {
        regionaList.push({name: zone.zonename, value: zone.zoneid})
      })
      return {
        index: 0,
        regional: [''],
        regionaList,
        chargeType: [
          {name: '1月', value: 'Month#1', parent: 0},
          {name: '2月', value: 'Month#2', parent: 0},
          {name: '3月', value: 'Month#3', parent: 0},
          {name: '4月', value: 'Month#4', parent: 0},
          {name: '5月', value: 'Month#5', parent: 0},
          {name: '6月', value: 'Month#6', parent: 0},
          {name: '7月', value: 'Month#7', parent: 0},
          {name: '8月', value: 'Month#8', parent: 0},
          {name: '9月', value: 'Month#9', parent: 0},
          {name: '10月', value: 'Month#10', parent: 0},
          {name: '1年', value: 'Year#1', parent: 0},
          {name: '2年', value: 'Year#2', parent: 0},
          {name: '3年', value: 'Year#3', parent: 0}
        ],
        str: '',
        charges: [],
        radio: [
          {key: 'real', value: '实时计费'}
        ],
        //镜像类型
        mirrorTypelist: [
          {name: '公共镜像', value: 'public', parent: 0},
          {name: '自定义镜像', value: 'custom', parent: 0}
        ],
        mirrorType: [],
        //镜像系统
        mirrorCustomlist: [],
        mirrorCustom: [],
        //是否购买IP
        buyIP: true,
        //配置
        config: [],
        configs: [],
        isBuyConfig: [
          {name: '1核  1G  1Mbps  40GB', value: '1', parent: 0},
          {name: '2核  4G  1Mbps  40GB', value: '2', parent: 0},
          {name: '4核  4G  2Mbps  40GB', value: '4', parent: 0},
          {name: '4核  8G  2Mbps  40GB', value: '4', parent: 0},
        ],
        unBuyConfig: [
          {name: '1核  1G  0Mbps 40GB', value: '1', parent: 0},
          {name: '2核  4G  0Mbps 40GB', value: '2', parent: 0},
          {name: '4核  4G  0Mbps 40GB', value: '4', parent: 0},
          {name: '4核  8G  0Mbps 40GB', value: '4', parent: 0},
        ],
        //主机信息
        hostMsg: [
          {name: '自定义设置', value: 'custom', parent: 0},
          {name: '默认设置', value: 'default', parent: 0}
        ],
        hostmsg: [],
        //系统用户名
        userName: "",
        //主机名称
        hostName: '',
        //登录密码
        loginPassword: '',
      }
    },
    methods: {
      //切换导航
      click(value){
        this.index = value
      },
      changeRegion(value){
        console.log(this.mirrorType)
        console.log(value)
      },
      //实际计费
      change1 (value, label) {
      },
      //包年包月
      change2(value){
      },
      //镜像系统
      //配置
      BuyIp(value){
        if (value) {
          this.configs = this.isBuyConfig
        } else {
          this.configs = this.unBuyConfig
        }
      },
      changeType(){
        this.mirrorCustom = []
      },
      //暂无数据
      mirrorValue(){
        if (this.mirrorCustom[0] == '暂无数据') {
          this.mirrorCustom = []
        }
      },
      //设置登录密码
      setPassword(){
        if (this.loginPassword.trim() == '') {
          this.$vux.toast.text('请设置登录密码', 'middle')
          return
        }
        if (!RegExp.Password.test(this.loginPassword)) {
          this.$vux.toast.text('请输入6-23位包含大小写与数字的密码', 'middle')
          return
        }
      },
    },
    /*computed: mapState([
     // 映射 this.count 为 store.state.count
     'userInfo'
     ])*/
    watch: {
      mirrorType(val, old){
        let url = 'information/listTemplates.do'
        let params = {
          zoneId: $store.state.zone.zoneid,
          // 0代表系统镜像
          user: val[0] == 'public' ? '0' : '1'
        }
        axios.get(url, {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.mirrorCustomlist = []
            for (let type in response.data.result) {
              this.mirrorCustomlist.push({name: type, value: type, parent: 0})
              response.data.result[type].forEach(e => {
                this.mirrorCustomlist.push({name: e.templatename, value: e.templateid, parent: type})
              })
              if (this.mirrorCustomlist.length == 4) {
                this.mirrorCustomlist = [{name: '暂无数据', value: '暂无数据', parent: 0}]
              }
            }
          }
        })

      },
      mirrorCustom(val, old){
        this.userName = val.length == 0 ? '' : val[0] == 'window' ? 'Administrator' : 'root'
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .public {
    p {
      padding: .31rem 0 .16rem .3rem;
      font-size: .24rem;
      color: rgba(153, 153, 153, 1);
      line-height: .33rem;
    }
  }

  .qucikly-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #FFF;
    position: fixed;
    bottom: 0;
    p {
      padding: .32rem 0 .32rem .3rem;
      font-size: .28rem;
      color: rgba(0, 0, 0, 1);
      line-height: .36rem;
      span {
        font-size: .36rem;
        color: rgba(230, 0, 27, 1);
      }
    }
    button {
      font-size: .32rem;
      color: rgba(255, 255, 255, 1);
      line-height: .36rem;
      outline: none;
      border: 0;
      background: rgba(219, 66, 50, 1);
      padding: .33rem .77rem .31rem .78rem;
    }
  }

  .custom {

  }

</style>

