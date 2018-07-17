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
    <div v-show="index==0"></div>
    <div v-show="index==1"></div>
  </div>
</template>

<script>
  import {XHeader, Tab, TabItem, PopupPicker, Group, Radio} from 'vux'
  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      PopupPicker,
      Group,
      Radio
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    data () {
      let regionaList = []
      this.$store.state.zoneList.forEach(zone => {
        regionaList.push({name: zone.zonename, value: zone.zoneid})
      })
      return {
        index: 0,
        regional: [],
        regionaList,
        chargeType: [
          {name: '1月', value: 'Month#1'},
          {name: '2月', value: 'Month#2'},
          {name: '3月', value: 'Month#3'},
          {name: '4月', value: 'Month#4'},
          {name: '5月', value: 'Month#5'},
          {name: '6月', value: 'Month#6'},
          {name: '7月', value: 'Month#7'},
          {name: '8月', value: 'Month#8'},
          {name: '9月', value: 'Month#9'},
          {name: '10月', value: 'Month#10'},
          {name: '1年', value: 'Year#1'},
          {name: '2年', value: 'Year#2'},
          {name: '3年', value: 'Year#3'}
        ],
        str: '',
        charges: [],
        radio: [
          {key: 'real', value: '实时计费'}
        ],
      }
    },
    methods: {
      //切换导航
      click(value){
        this.index = value
      },
      //实际计费

      change1 (value, label) {
        console.log(this.str)
      },

      //包年包月
      change2(value){
        console.log(this.str)
        console.log(this.charges)
        /*if (value.length != 0) {
         this.str = ''
         }*/
      }

    },
    /*computed: mapState([
     // 映射 this.count 为 store.state.count
     'userInfo'
     ])*/
    watch: {
      str(val, old){
        console.log(val, old)
      },
      /*charges(old, value){
       console.log(this.str)
       this.$set(this, 'str', '')
       console.log(this.str)
       }*/
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

</style>

