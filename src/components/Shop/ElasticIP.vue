<template>
  <div id="shop-ip">
    <XHeader>购买</XHeader>
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

    <Group class="ip">
      <cell title="网络与带宽"></cell>

      <popup-picker title="私有云VPC" :data="vpcList" v-model="vpc" :columns="2" show-name></popup-picker>
      <x-number title="带宽(MB)" v-model="bandwidth" :min="1" :max="100" class="number" button-style="round"
                :fillable='true'></x-number>

      <x-switch title="自动续费" v-model="renewal" inline-desc="开启后，资源到期会自动续费，请确保账户内有足够的余额。"></x-switch>
    </Group>

    <div class="bottom">
      <p>配置价格：<span>¥{{IpPrices}}</span></p>
      <button @click="IPtoOrder">立即购买</button>
    </div>
  </div>
</template>

<script>
  import RegExp from '@/util/RegExp'
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {
    XHeader,
    PopupPicker,
    Group,
    Radio,
    Cell,
    XSwitch,
    XNumber,
    XButton,
  } from 'vux'
  export default{
    components: {
      XHeader,
      PopupPicker,
      Group,
      Radio,
      Cell,
      XNumber,
      XSwitch,
    },
    beforeRouteEnter(to, from, next){
      axios.get('network/listVpcBuyComputer.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
        }
      }).then(response => {
        next(vm => {
          vm.vpc = [response.data.result[0].vpcid]
          response.data.result.forEach(ip => {
            vm.vpcList.push({name: ip.vpcname, value: ip.vpcid})
          })
        })
      })
    },
    data (){
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
        for (let i = 20; i <= 1000; i += 10) {
          diskType.push({name: `${i}GB`, value: `${i}`, parent: type.value})
        }
      })
      return {
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
        //私有云VPC
        vpcList: [],
        vpc: [],
        //带宽
        bandwidth: 1,
        //是否自动续费
        renewal: true,
        //弹性IP价格
        IpPrices: '',
      }
    },
    created(){
      this.IPprices();
    },
    methods: {
      //查询VPC
      checkVPC(){
        this.vpcList = []
        axios.get('network/listVpcBuyComputer.do', {
          params: {
            zoneId: this.regional[0]
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach(ip => {
              this.vpcList.push({name: ip.vpcname, value: ip.vpcid})
            })
          }
        })
      },
      //弹性ip价格
      IPprices(){
        let timeout = setTimeout(() => {
          this.IpPrices = '查询中'
        }, 1000)
        if (this.charges.length != 0) {
          var times = this.charges[0].split('#')
        }
        axios.post('device/queryIpPrice.do', {
          brand: this.bandwidth,
          timeType: this.str == 'current' ? 'current' : times[0],
          timeValue: this.str == 'current' ? '1' : times[1],
          zoneId: this.regional[0]
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            clearTimeout(timeout)
            this.IpPrices = (response.data.cost).toFixed(2)
          }
        })
      },
      //立即购买
      IPtoOrder(){
        if (this.charges.length != 0) {
          var times = this.charges[0].split('#')
        }
        axios.get('network/createPublicIp.do', {
          params: {
            timeType: this.str == 'current' ? 'current' : times[0],
            timeValue: this.str == 'current' ? '1' : times[1],
            zoneId: this.regional[0],
            count: '1',
            isAutorenew: this.renewal ? '1' : '0',
            brandWith: this.bandwidth,
            vpcId: this.vpc[0]
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('countOrder', this.IpPrices.toString())
            this.$router.push('orderconfirm')
          } else {
            this.$vux.toast.text(response.data.message, 'middle')
          }
        })
      },
    },
    watch: {
      str(){
        if (this.str != '') {
          this.charges = []
          this.IPprices();
        }
      },
      charges(value){
        if (value.length != 0) {
          this.str = ''
          this.IPprices();
        }
      },
      regional(){
        this.checkVPC();
      },
      bandwidth(){
        this.IPprices();
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
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
