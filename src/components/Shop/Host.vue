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
        <radio :options="radio" v-model="str"></radio>
        <popup-picker title="包年包月计费(惠)" :data="chargeType" v-model="charges" :columns="3" show-name></popup-picker>
      </Group>
    </div>
    <div v-show="index==0" class="qucikly">
      <Group>
        <cell title="主机规格选择"></cell>

        <popup-picker title="镜像类型" :data="mirrorTypeList" v-model="mirrorType" :columns="3" show-name
                      @on-change="changeType"></popup-picker>

        <popup-picker title="镜像系统" :data="mirrorCustomList" v-model="mirrorCustom" :columns="3"
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
      <div class="bottom">
        <p>配置价格：<span>¥ 0.00</span></p>
        <button @click="publicBuy">立即购买</button>
      </div>
    </div>
    <div v-show="index==1" class="custom">
      <Group>
        <cell title="主机规格选择"></cell>
        <popup-picker title="类型" :data="genreList" v-model="genre" :columns="3" show-name></popup-picker>

        <popup-picker title="镜像类型" :data="mirrorTypeList" v-model="mirrorType" :columns="3" show-name
                      @on-change="changeType"></popup-picker>

        <popup-picker title="镜像系统" :data="mirrorCustomList" v-model="mirrorCustom" :columns="3"
                      @on-change="mirrorValue" show-name></popup-picker>

        <popup-picker title="系统盘" :data="systemDiskList" v-model="systemDisk" :columns="3" show-name></popup-picker>

        <popup-picker title="核心数" :data="coreList" v-model="cores" :columns="3" show-name
                      @on-show="showCore" @on-change="coreValue"></popup-picker>

        <popup-picker title="内存" :data="memoryList" v-model="memory" :columns="3" show-name
                      @on-show="showCore"></popup-picker>
      </Group>

      <Group>
        <cell title="网络与带宽"></cell>

        <popup-picker title="私有云VPC" :data="vpcList" v-model="vpc" :columns="3" show-name></popup-picker>

        <popup-picker title="网卡" :data="networkCardList" v-model="networkCard" :columns="3" show-name></popup-picker>

        <x-switch title="购买公网IP" v-model="buyIP" @on-change="BuyIp"></x-switch>
        <x-number title="带宽(MB)" v-model="bandwidth" :min="1" :max="100" class="number" button-style="round"
                  :fillable='true' v-show="buyIP"></x-number>
      </Group>

      <Group>
        <cell title="云硬盘"></cell>

        <div style="padding: 0 .3rem">
          <x-button type="primary">添加数据盘</x-button>
        </div>
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
      <div class="bottom">
        <p>配置价格：<span>¥ 0.00</span></p>
        <button>立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  import RegExp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader, Tab, TabItem, PopupPicker, Group, Radio, Cell, XSwitch, XInput, XNumber, XButton} from 'vux'
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
      XInput,
      XNumber,
      XButton
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
          vm.configs = vm.isBuyConfig
        }
      )
    },
    data () {
      let regionaList = [], regional = []
      this.$store.state.zoneList.forEach(zone => {
        if (zone.isdefault == 1) {
          regional[0] = zone.zoneid
        }
        regionaList.push({name: zone.zonename, value: zone.zoneid})
      })
      return {
        index: 0,
        regional,
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
        str: 'real',
        charges: [],
        radio: [
          {key: 'real', value: '实时计费'}
        ],
        //镜像类型
        mirrorTypeList: [
          {name: '公共镜像', value: 'public', parent: 0},
          {name: '自定义镜像', value: 'custom', parent: 0}
        ],
        mirrorType: [],
        //镜像系统
        mirrorCustomList: [],
        mirrorCustom: [],
        //是否购买IP
        buyIP: true,
        //配置
        config: ['1'],
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
        hostmsg: ['default'],
        //系统用户名
        userName: "Administrator",
        //主机名称
        hostName: '',
        //登录密码
        loginPassword: '',
        //类型
        genreList: [
          {name: '标准型', value: 'standard'},
          {name: '内存优化型', value: 'optimization'},
          {name: '高I/O型', value: 'IO',}
        ],
        genre: [],
        //系统盘
        systemDiskList: [
          {name: 'SAS存储', value: 'sas'},
          {name: 'SSD存储', value: 'ssd'}
        ],
        systemDisk: [],
        //核心数
        info: [
          {
            zoneId: '39a6af0b-6624-4194-b9d5-0c552d903858',
            kernelList: [
              {
                name: '1核',
                value: '1',
                RAMList: [
                  {name: '1G', value: '1'},
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'}
                ]
              },
              {
                name: '2核',
                value: '2',
                RAMList: [
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'}
                ]
              },
              {
                name: '4核',
                value: '4',
                RAMList: [
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '8核',
                value: '8',
                RAMList: [
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'},
                  {name: '64G', value: '64'}
                ]
              },
              {
                name: '16核',
                value: '16',
                RAMList: [
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'},
                  {name: '64G', value: '64'},
                  {name: '128G', value: '128'}
                ]
              },
              {
                name: '32核',
                value: '32',
                RAMList: [
                  {name: '64G', value: '64'},
                  {name: '128G', value: '128'}
                ]
              },
              {
                name: '64核',
                value: '64',
                RAMList: [
                  {name: '128G', value: '128'},
                  {name: '256G', value: '256'},
                ]
              }
            ],
          },
          {
            zoneId: '1ce0d0b9-a964-432f-8078-a61100789e30',
            kernelList: [
              {
                name: '1核',
                value: '1',
                RAMList: [
                  {name: '1G', value: '1'},
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'}
                ]
              },
              {
                name: '2核',
                value: '2',
                RAMList: [
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'}
                ]
              },
              {
                name: '4核',
                value: '4',
                RAMList: [
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '8核',
                value: '8',
                RAMList: [
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'},
                  {name: '64G', value: '64'}
                ]
              },
              {
                name: '16核',
                value: '16',
                RAMList: [
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'},
                  {name: '64G', value: '64'},
                  {name: '128G', value: '128'}
                ]
              },
              {
                name: '32核',
                value: '32',
                RAMList: [
                  {name: '64G', value: '64'},
                  {name: '128G', value: '128'}
                ]
              },
              {
                name: '64核',
                value: '64',
                RAMList: [
                  {name: '128G', value: '128'},
                  {name: '256G', value: '256'},
                ]
              }
            ],
          },
          {
            zoneId: 'a0a7df65-dec3-48da-82cb-cff9a55a4b6d',
            kernelList: [
              {
                name: '1核',
                value: '1',
                RAMList: [
                  {name: '1G', value: '1'},
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'}
                ]
              },
              {
                name: '2核',
                value: '2',
                RAMList: [
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '12G', value: '12'},
                ]
              },
              {
                name: '4核',
                value: '4',
                RAMList: [
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '12G', value: '12'},
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '8核',
                value: '8',
                RAMList: [
                  {name: '16G', value: '16'},
                  {name: '24G', value: '24'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '16核',
                value: '16',
                RAMList: [
                  {name: '16G', value: '16'},
                  {name: '24G', value: '24'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '32核',
                value: '32',
                RAMList: [
                  {name: '32G', value: '32'}
                ]
              }
            ],
          },
          {
            zoneId: '3205dbc5-2cba-4d16-b3f5-9229d2cfd46c',
            kernelList: [
              {
                name: '1核',
                value: '1',
                RAMList: [
                  {name: '1G', value: '1'},
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'}
                ]
              },
              {
                name: '2核',
                value: '2',
                RAMList: [
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '12G', value: '12'},
                ]
              },
              {
                name: '4核',
                value: '4',
                RAMList: [
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '12G', value: '12'},
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '8核',
                value: '8',
                RAMList: [
                  {name: '16G', value: '16'},
                  {name: '24G', value: '24'},
                  {name: '32G', value: '32'},
                ]
              },
              {
                name: '16核',
                value: '16',
                RAMList: [
                  {name: '16G', value: '16'},
                  {name: '24G', value: '24'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '32核',
                value: '32',
                RAMList: [
                  {name: '32G', value: '32'}
                ]
              }
            ],
          },
          {
            zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
            kernelList: [
              {
                name: '1核',
                value: '1',
                RAMList: [
                  {name: '1G', value: '1'},
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'}
                ]
              },
              {
                name: '2核',
                value: '2',
                RAMList: [
                  {name: '2G', value: '2'},
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'}
                ]
              },
              {
                name: '4核',
                value: '4',
                RAMList: [
                  {name: '4G', value: '4'},
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'}
                ]
              },
              {
                name: '8核',
                value: '8',
                RAMList: [
                  {name: '8G', value: '8'},
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '16核',
                value: '16',
                RAMList: [
                  {name: '16G', value: '16'},
                  {name: '32G', value: '32'}
                ]
              },
              {
                name: '32核',
                value: '32',
                RAMList: [
                  {name: '32G', value: '32'}
                ]
              }
            ],
          }
        ],
        coreList: [],
        cores: [],
        //内存
        memoryList: [],
        memory: [],
        //私有云VPC
        vpcList: [],
        vpc: [],
        //网卡
        networkCardList: [],
        networkCard: [],
        //带宽
        bandwidth: 20,
      }
    },
    methods: {
      publicBuy(){
        if (this.mirrorType.length == 0) {
          this.$vux.toast.text('请选择一个镜像类型', 'middle')
          return
        }
        if (this.mirrorCustom.length == 0) {
          this.$vux.toast.text('请选择一个镜像系统', 'middle')
          return
        }

      },
      //切换导航
      click(value){
        this.index = value
      },
      //实际计费
      //包年包月
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
      //核心数
      showCore(){
        this.info.forEach(e => {
          if (e.zoneId == this.regional[0]) {
            this.coreList = e.kernelList
          }
        })
      },
      coreValue(){
        this.info.forEach(e => {
          e.kernelList.forEach(i => {
            if (i.value == this.cores[0]) {
              this.memoryList = i.RAMList
            }
          })
        })
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
            this.mirrorCustomList = []
            for (let type in response.data.result) {
              this.mirrorCustomList.push({name: type, value: type, parent: 0})
              response.data.result[type].forEach(e => {
                this.mirrorCustomList.push({name: e.templatename, value: e.templateid, parent: type})
              })
              if (this.mirrorCustomList.length == 4) {
                this.mirrorCustomList = [{name: '暂无数据', value: '暂无数据', parent: 0}]
              }
            }
          }
        })

      },
      mirrorCustom(val, old){
        this.userName = val.length == 0 ? '' : val[0] == 'window' ? 'Administrator' : 'Root'
      },
      str(){
        if (this.str != '') {
          this.charges = []
        }
      },
      charges(){
        if (this.charges.length != 0) {
          this.str = ''
        }

      },
      regional(val){
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: val[0],
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.vpcList = []
            response.data.result.forEach(e => {
              this.vpcList.push({name: e.vpcname, value: e.vpcid,})
            })
          }
        })
      },
      vpc(val){
        axios.get('network/listNetworkBuyComputer.do', {
          params: {
            zoneId: this.regional[0],
            vpcId: val[0]
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.networkCardList = []
            response.data.result.forEach(e => {
              this.networkCardList.push({name: e.name, value: e.ipsegmentid,})
            })
          }
        })
      }
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

  .bottom {
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


</style>

