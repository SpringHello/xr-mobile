<template>
  <div id="shop-disk">
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
    <Group class="disk">
      <x-input title="磁盘名称" placeholder="请输入磁盘名" placeholder-align="right" text-align="right"
               v-model="diskName"></x-input>
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
      <x-switch title="自动续费" v-model="renewal"></x-switch>
    </Group>

    <div class="bottom">
      <p>配置价格：<span>¥ {{diskPrice}}</span></p>
      <button @click="DtoOrder">立即购买</button>
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
  export default{
    components: {
      XHeader,
      PopupPicker,
      Group,
      Radio,
      Cell,
      XSwitch,
      XInput,
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
        diskType.push({name: '20GB', value: '20', parent: type.value})
        for (let i = 50; i <= 1000; i += 50) {
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
        //云硬盘
        diskListNums: '4',
        diskType,
        diskList: [{value: ['ssd', '20']}],
        //是否自动续费
        renewal: true,
        diskName: '',
        diskPrice: '',
      }
    },
    created(){
      this.Dprices();
    },
    methods: {
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
      //硬盘价格
      Dprices(){
        let timeout = setTimeout(() => {
          this.diskPrice = '查询中'
        }, 1000)
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
          cpuNum: '0',
          diskSize,
          diskType,
          memory: '0',
        }
        axios.post('device/QueryBillingPrice.do', params).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              clearTimeout(timeout)
              this.diskPrice = (response.data.cost).toFixed(2)
            }
          }
        )
      },
      //云硬盘购买
      DtoOrder(){
        if (this.charges.length != 0) {
          var times = this.charges[0].split('#')
        }
        let diskSize = ''
        let diskOfferingId = ''
        this.diskList.forEach(disk => {
          diskOfferingId += disk.value[0] + ','
          diskSize += disk.value[1] + ','
        })
        axios.get('Disk/createVolume.do', {
          params: {
            zoneId: this.regional[0],
            timeType: this.str == 'current' ? 'current' : times[0],
            timeValue: this.str == 'current' ? '1' : times[1],
            diskSize,
            diskOfferingId,
            diskName: this.diskName,
            isAutorenew: this.renewal ? '1' : '0'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            sessionStorage.setItem('countOrder', this.diskPrice.toString())
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
          this.Dprices();
        }
      },
      charges(value){
        if (value.length != 0) {
          this.str = ''
          this.Dprices();
        }
      },
      regional(){
      },
      'diskList': {
        handler(){
          this.Dprices();
        },
        deep: true
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
