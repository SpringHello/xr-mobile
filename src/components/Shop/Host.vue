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
        <cell title="主机规格选择" class="title"></cell>

        <popup-picker title="镜像类型" :data="mirrorTypeList" v-model="mirrorType" :columns="3" show-name
                      @on-change="changeType"></popup-picker>

        <popup-picker title="镜像系统" :data="mirrorCustomList" v-model="mirrorCustom" :columns="3"
                      @on-change="mirrorValue" show-name></popup-picker>

        <checklist label-position="left" :options="IP" v-model="checkIp" class="ip"></checklist>

        <popup-picker title="配置" :data="configs" v-model="config" :columns="2" show-name
                      @on-change="configChange"></popup-picker>
        <cell title="防火墙" value="默认设置" is-link></cell>
        <p style="font-size: .22rem;color: #999;padding: 0 .3rem .2rem .3rem;">
          默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。</p>
      </Group>

      <Group>
        <cell title="登录设置" class="title"></cell>

        <popup-picker title="主机信息" :data="hostMsg" v-model="hostmsg" :columns="3" show-name></popup-picker>

        <x-input title="主机名称" v-model="hostName" placeholder="请输入主机名称" v-show="hostmsg[0]=='custom'"
                 placeholder-align="right" text-align="right"></x-input>

        <cell title="系统用户名" :value="userName"></cell>

        <cell title="登录密码" v-show="hostmsg[0]=='default'" inline-desc="密码为默认密码，创建成功后通过短信和站内信查看"></cell>
        <x-input title="登录密码" v-model="loginPassword" placeholder="请设置登录密码" v-show="hostmsg[0]=='custom'"
                 placeholder-align="right" text-align="right" @on-blur="setPassword"></x-input>

        <x-switch title="自动续费" v-model="renewal"></x-switch>
      </Group>
      <div class="bottom">
        <p>配置价格：<span>¥ {{Qprices}}</span></p>
        <button @click="QtoOrder">立即购买</button>
      </div>
    </div>
    <div v-show="index==1" class="custom">
      <Group>
        <cell title="主机规格选择" class="title"></cell>
        <popup-picker title="类型" :data="genreList" v-model="genre" :columns="3" show-name></popup-picker>

        <popup-picker title="镜像类型" :data="mirrorTypeList" v-model="mirrorType" :columns="3" show-name
                      @on-change="changeType"></popup-picker>

        <popup-picker title="镜像系统" :data="mirrorCustomList" v-model="mirrorCustom" :columns="3"
                      @on-change="mirrorValue" show-name></popup-picker>

        <popup-picker title="系统盘" :data="systemDiskList" v-model="systemDisk" :columns="3" show-name></popup-picker>

        <popup-picker title="核心数" :data="coreList" v-model="cores" :columns="3" show-name></popup-picker>

        <popup-picker title="内存" :data="memoryList" v-model="memory" :columns="3" show-name></popup-picker>
      </Group>

      <Group>
        <cell title="网络与带宽" class="title"></cell>

        <popup-picker title="私有云VPC" :data="vpcList" v-model="vpc" :columns="2" show-name></popup-picker>

        <popup-picker title="网卡" :data="networkCardList" v-model="networkCard" :columns="2" show-name></popup-picker>

        <checklist label-position="left" :options="IP"
                   v-model="checkIp" class="ip"></checklist>
        <x-number title="带宽(MB)" v-model="bandwidth" :min="1" :max="100" class="number" button-style="round"
                  :fillable='true' v-show="checkIp[0]"></x-number>
        <cell title="防火墙" value="默认设置" is-link></cell>
        <p style="font-size: .22rem;color: #999;padding: 0 .3rem .2rem .3rem;">
          默认防火墙仅打开22、3389、443、80端口，您可以在创建之后再控制台自定义防火墙规则。</p>
      </Group>

      <Group>
        <cell title='云硬盘' value="添加数据盘" :inline-desc="'可添加数量：'+diskListNums" @click.native="addDisk"
              class="Cdisk"></cell>
        <popup-picker v-for="(disk,index) in diskList" :key="index" :data="diskType" v-model="disk.value"
                      :columns="3"
                      show-name>
          <template slot="title">
            <span>数据盘</span>
            <img src="../../assets/img/back/del.png" style="width: .32rem;vertical-align: middle;"
                 @click.stop.prevent="delDisk(index)">
          </template>
        </popup-picker>
      </Group>


      <Group>
        <cell title="登录设置" class="title"></cell>

        <popup-picker title="主机信息" :data="hostMsg" v-model="hostmsg" :columns="3" show-name></popup-picker>

        <x-input title="主机名称" v-model="hostName" placeholder="请输入主机名称" v-show="hostmsg[0]=='custom'"
                 placeholder-align="right" text-align="right"></x-input>

        <cell title="系统用户名" :value="userName"></cell>

        <cell title="登录密码" v-show="hostmsg[0]=='default'" inline-desc="密码为默认密码，创建成功后通过短信和站内信查看"></cell>
        <x-input title="登录密码" v-model="loginPassword" placeholder="请设置登录密码" v-show="hostmsg[0]=='custom'"
                 placeholder-align="right" text-align="right" @on-blur="setPassword"></x-input>

        <x-switch title="自动续费" v-model="renewal"></x-switch>
      </Group>
      <div class="bottom">
        <p>配置价格：<span>¥ {{Cprices}}</span></p>
        <button @click="CtoOrder">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  import RegExp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {
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
    XButton,
    Checklist
  } from 'vux'
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
      XButton,
      Checklist
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
          vm.configs = vm.isBuyConfig
        }
      )
    },
    data () {
      window.scrollTo(0, 0);
      let regionaList = [], regional = []
      this.$store.state.zoneList.forEach(zone => {
        if (zone.isdefault == 1) {
          regional[0] = zone.zoneid
        }
        regionaList.push({name: zone.zonename, value: zone.zoneid})
      })
      let diskType = [
        {name: 'SATA存储', value: 'sata', parent: 0},
        {name: 'SAS存储', value: 'sas', parent: 0},
        {name: 'SSD存储', value: 'ssd', parent: 0},
      ];
      diskType.forEach(type => {
        diskType.push({name: '20GB', value: '20', parent: type.value})
        for (let i = 50; i <= 1000; i += 50) {
          diskType.push({name: `${i}GB`, value: `${i}`, parent: type.value})
        }
      })
      return {
        index: 0,
        regional,
        regionaList,
        chargeType: [
          {name: '1月', value: 'month#1', parent: 0},
          {name: '2月', value: 'month#2', parent: 0},
          {name: '3月', value: 'month#3', parent: 0},
          {name: '4月', value: 'month#4', parent: 0},
          {name: '5月', value: 'month#5', parent: 0},
          {name: '6月', value: 'month#6', parent: 0},
          {name: '7月', value: 'month#7', parent: 0},
          {name: '8月', value: 'month#8', parent: 0},
          {name: '9月', value: 'month#9', parent: 0},
          {name: '10月', value: 'month#10', parent: 0},
          {name: '1年', value: 'year#1', parent: 0},
          {name: '2年', value: 'year#2', parent: 0},
          {name: '3年', value: 'year#3', parent: 0}
        ],
        str: 'current',
        charges: [],
        radio: [
          {key: 'current', value: '实时计费'}
        ],
        //镜像类型
        mirrorTypeList: [
          {name: '公共镜像', value: 'public', parent: 0},
          {name: '自定义镜像', value: 'custom', parent: 0}
        ],
        mirrorType: ['public'],
        //镜像系统
        mirrorCustomList: [],
        mirrorCustom: [],
        //是否购买IP
        IP: ['购买公网IP'],
        checkIp: ['购买公网IP'],
        //配置
        config: ['1#1#1#40#sas#1'],
        configs: [],
        isBuyConfig: [
          {name: '1核  1G  1Mbps  40GB(SAS存储)', value: '1#1#1#40#sas#1', parent: 0},
          {name: '2核  4G  1Mbps  40GB(SAS存储)', value: '2#4#1#40#sas#1', parent: 0},
          {name: '4核  4G  2Mbps  40GB(SSD存储)', value: '4#4#2#40#ssd#2', parent: 0},
          {name: '4核  8G  2Mbps  40GB(SSD存储)', value: '4#8#2#40#ssd##2', parent: 0},
        ],
        unBuyConfig: [
          {name: '1核  1G  0Mbps 40GB(SAS存储)', value: '1#1#0#40#sas#1', parent: 0},
          {name: '2核  4G  0Mbps 40GB(SAS存储)', value: '2#4#0#40#sas#1', parent: 0},
          {name: '4核  4G  0Mbps 40GB(SSD存储)', value: '4#4#0#40#ssd#2', parent: 0},
          {name: '4核  8G  0Mbps 40GB(SSD存储)', value: '4#8#0#40#ssd#2', parent: 0},
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
        genre: ['standard'],
        //系统盘
        systemDiskList: [
          {name: 'SAS存储', value: 'sas'},
          {name: 'SSD存储', value: 'ssd'}
        ],
        systemDisk: ['sas'],
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
        cores: ['1'],
        //内存
        memoryList: [],
        memory: ['1'],
        //私有云VPC
        vpcList: [],
        vpc: [],
        //网卡
        networkCardList: [],
        networkCard: [],
        //带宽
        bandwidth: 1,
        //数据盘
        diskListNums: '4',
        diskType,
        diskList: [{value: ['ssd', '20']}],
        //价格
        Qprices: 0,
        Cprices: 0,
        //是否自动续费
        renewal: false,
      }
    },
    created(){
      this.changeMirrorType();
      this.showCore();
      this.coreValue();
      this.vpcChange();
      this.networkCardChange();
      this.queryQprices();
      this.queryCprices();
    },
    methods: {
      //切换导航
      click(value){
        this.index = value
        if (value == 1) {
          this.queryCprices();
        }
      },
      //配置
      configChange(){
        this.queryQprices();
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
          if (e.zoneId == this.regional[0]
          ) {
            this.coreList = e.kernelList
          }
        })
      },
      coreValue(){
        this.info.forEach(e => {
          e.kernelList.forEach(i => {
            if (i.value == this.cores[0]
            ) {
              this.memoryList = i.RAMList
            }
          })
        })
      },
      // 添加磁盘
      addDisk(){
        if (this.diskList.length < 5) {
          this.diskList.push({value: ['ssd', '20']})
          this.diskListNums = 5 - this.diskList.length
        } else {
          this.$vux.toast.text('数据盘最多5个', 'middle')
        }
      },
      //删除数据盘
      delDisk(index){
        this.diskList.splice(index, 1)
        this.diskListNums = 5 - this.diskList.length
      },
      //镜像类型
      changeMirrorType(){
        let url = 'information/listTemplates.do'
        let params = {
          zoneId: $store.state.zone.zoneid,
          // 0代表系统镜像
          user: this.mirrorType[0] == 'public' ? '0' : '1'
        }
        axios.get(url, {params}).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.mirrorCustomList = []
              for (let type in response.data.result) {
                this.mirrorCustomList.push({name: type, value: type, parent: 0})
                response.data.result[type].forEach(e => {
                    this.mirrorCustomList.push({name: e.templatename, value: e.systemtemplateid, parent: type})
                  }
                )
                this.mirrorCustom = ['window', response.data.result.window[0].systemtemplateid]
                if (this.mirrorCustomList.length == 4) {
                  this.mirrorCustomList = [{name: '暂无数据', value: '暂无数据', parent: 0}]
                }
              }
            }
          }
        )
      },
      //VPC
      vpcChange(){
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.regional[0],
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.vpcList = []
              this.vpc = [response.data.result[0].vpcid]
              response.data.result.forEach(e => {
                  this.vpcList.push({name: e.vpcname, value: e.vpcid,})
                }
              )
            }
          }
        )
      },
      networkCardChange(){
        axios.get('network/listNetworkBuyComputer.do', {
          params: {
            zoneId: this.regional[0],
            vpcId: this.vpc[0]
          }
        }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.networkCardList = []
              this.networkCard = [response.data.result[0].ipsegmentid]
              response.data.result.forEach(e => {
                  this.networkCardList.push({name: e.name, value: e.ipsegmentid,})
                }
              )
            }
          }
        )
      },
      //查询价格(quickly)
      queryQprices(){
        let timeout = setTimeout(() => {
          this.Qprices = '查询中'
        }, 1000)
        var param = this.config[0].split('#')
        if (this.charges.length != 0) {
          var times = this.charges[0].split('#')
        }
        let bill = axios.post('device/QueryBillingPrice.do',
          {
            cpuNum: param[0],
            diskSize: param[3],
            diskType: param[4],
            memory: param[1],
            timeType: this.str == 'current' ? 'current' : times[0],
            timeValue: this.str == 'current' ? '1' : times[1],
            zoneId: $store.state.zone.zoneid,
          }
        )
        let ip = axios.post('device/queryIpPrice.do', {
          brand: param[2],
          timeType: this.str == 'current' ? 'current' : times[0],
          timeValue: this.str == 'current' ? '1' : times[1],
          zoneId: $store.state.zone.zoneid,
        })
        Promise.all([bill, ip]).then(response => {
          clearTimeout(timeout)
          this.Qprices = (response[0].data.cost + response[1].data.cost).toFixed(2)
        })
      },
      //查询价格(custom)
      queryCprices(){
        let timeout = setTimeout(() => {
          this.Cprices = '查询中'
        }, 1000)
        /*主机价格*/
        if (this.charges.length != 0) {
          var times = this.charges[0].split('#')
        }
        let bill = axios.post('device/QueryBillingPrice.do', {
          cpuNum: this.cores[0],
          diskType: this.systemDisk[0],
          memory: this.memory[0],
          diskSize: '40',
          timeType: this.str == 'current' ? 'current' : times[0],
          timeValue: this.str == 'current' ? '1' : times[1],
          zoneId: $store.state.zone.zoneid,
        })
        /*IP价格*/
        let ip = axios.post('device/queryIpPrice.do', {
          brand: this.bandwidth.toString(),
          timeType: this.str == 'current' ? 'current' : times[0],
          timeValue: this.str == 'current' ? '1' : times[1],
          zoneId: $store.state.zone.zoneid,
        })
        let diskSize = ''
        let diskType = ''
        this.diskList.forEach(disk => {
          diskType += disk.value[0] + ','
          diskSize += disk.value[1] + ','
        })
        /*云硬盘价格*/
        let disk = axios.post('device/QueryBillingPrice.do', {
          diskSize,
          diskType,
          cpuNum: '0',
          memory: '0',
          timeType: this.str == 'current' ? 'current' : times[0],
          timeValue: this.str == 'current' ? '1' : times[1],
          zoneId: $store.state.zone.zoneid,
        })
        Promise.all([bill, ip, disk]).then(response => {
            clearTimeout(timeout)
            this.Cprices = (response[0].data.cost + response[1].data.cost + response[2].data.cost).toFixed(2)
          }
        )
      },
      //立即购买(quickly)
      QtoOrder(){
        var param = this.config[0].split('#')
        if (this.charges.length != 0) {
          var times = this.charges[0].split('#')
        }
        let params = {
          zoneId: this.regional[0],
          timeType: this.str == 'current' ? 'current' : times[0],
          timeValue: this.str == 'current' ? '1' : times[1],
          templateId: this.mirrorCustom[1],
          isAutoRenew: this.renewal ? '1' : '0',
          count: '1',
          cpuNum: param[0],
          memory: param[1],
          bandWidth: param[2],
          rootDiskType: param[4],
          networkId: 'no',
          vpcId: 'no'
        }
        if (this.hostmsg[0] == 'custom') {
          params.VMName = this.hostName
          params.password = this.loginPassword
        }
        axios.get('information/deployVirtualMachine.do', {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('countOrder', this.Qprices.toString())
            this.$router.push('orderconfirm')
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
      //自定义购买（custom）
      CtoOrder(){
        if (this.charges.length != 0) {
          var times = this.charges[0].split('#')
        }
        let diskSize = ''
        let diskType = ''
        this.diskList.forEach(disk => {
          diskType += disk.value[0] + ','
          diskSize += disk.value[1] + ','
        })

        let params = {
          zoneId: this.regional[0],
          timeType: this.str == 'current' ? 'current' : times[0],
          timeValue: this.str == 'current' ? '1' : times[1],
          templateId: this.mirrorCustom[1],
          isAutoRenew: this.renewal ? '1' : '0',
          count: '1',
          cpuNum: this.cores[0],
          memory: this.memory[0],
          bandWidth: this.bandwidth,
          rootDiskType: this.systemDisk[0],
          networkId: this.networkCard[0],
          vpcId: this.vpc[0],
          diskType,
          diskSize,
        }
        if (this.hostmsg[0] == 'custom') {
          params.VMName = this.hostName
          params.password = this.loginPassword
        }
        axios.get('information/deployVirtualMachine.do', {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('countOrder', this.Cprices.toString())
            this.$router.push('orderconfirm')
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },

    },
    /*computed: mapState([
     // 映射 this.count 为 store.state.count
     'userInfo'
     ])*/
    watch: {
      mirrorType(val, old){
        this.changeMirrorType();
      },
      mirrorCustom(val, old){
        this.userName = val.length == 0 ? '' : val[0] == 'window' ? 'Administrator' : 'Root'
      },
      str(){
        if (this.str != '') {
          this.charges = []
          this.queryQprices();
          this.queryCprices();
        }
      },
      charges(value){
        if (value.length != 0) {
          this.str = ''
          this.queryQprices();
          this.queryCprices();
        }
      },
      regional(){
        this.vpcChange();
        this.networkCardChange();
      },
      genre(val){
        switch (val[0]) {
          case 'standard':
            this.systemDisk = ['sas']
            this.cores = ['1']
            this.memory = ['1']
            break;
          case 'optimization':
            this.systemDisk = ['ssd']
            this.cores = ['4']
            this.memory = ['4']
            break;
          case 'IO':
            this.systemDisk = ['ssd']
            this.cores = ['16']
            this.memory = ['16']
            break;
        }
      },
      systemDisk(){
        this.queryCprices();
      },
      checkIp(val){
        let config = this.config[0]
        let configArr = config.split('#')
        if (val == '购买公网IP') {
          this.configs = this.isBuyConfig
          configArr[2] = configArr[5]
        } else {
          this.configs = this.unBuyConfig
          configArr[2] = 0
        }
        this.config = [configArr.join('#')]
      },
      vpc(){
        this.networkCardChange();
      },
      cores(){
        this.showCore();
        this.coreValue();
        this.queryCprices();

      },
      memory(){
        this.queryCprices();
      },
      'diskList': {
        handler(){
          this.queryCprices();
        },
        deep: true
      },
      bandwidth(){
        this.queryCprices();
      },

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #shop-host {
    margin-bottom: 2rem;

    .public {
      p {
        padding: .31rem 0 0 .3rem;
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
      border-top: 1px solid #D7D7D7;
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
        background: rgba(219, 66, 50, 1);
        padding: .33rem .77rem .31rem .78rem;
      }
    }

  }
</style>

