<template>
  <div class="background">
    <h2 v-if="isCloud">我是小小新睿云云客，特惠云主机分享给你</h2>
    <h2 v-else>特惠产品 你我共享</h2>
    <div class="center">
      <div class="item" :class="{onSelect: select == index}" v-for="(item,index) in productGroups" @click="selectItem(index)">
        <div class="item-title">
          {{ isCloudText }}
        </div>
        <ul>
          <li>{{ item.cpu}}核<span>CPU</span></li>
          <li>{{ item.memory}}G<span>内存</span></li>
          <li>{{ item.bandwidth}}M<span>宽带</span></li>
          <li>{{ item.disk}}G<span>SSD</span></li>
        </ul>
        <div class="item-content">
          <group>
            <popup-picker title="区域选择" :data="areaData" v-model="item.area" @on-change="getoriginalPrice(index)" :columns="3" show-name></popup-picker>
            <popup-picker title="系统选择" :data="systemGroup" v-model="item.system" :columns="3" show-name></popup-picker>
          </group>
        </div>
        <div class="item-footer">
          <p>¥{{ item.currentPrice }}<span>/月</span><span>原价¥{{ item.originalCost}}/月</span></p>
        </div>
      </div>
    </div>
    <div class="qucikly-bottom">
      <p>价格：<span>¥{{currentPrice}}</span><span>/月</span><span>¥{{ originalCost}}/月</span></p>
      <button @click="buyNow(select)">立即购买</button>
    </div>
    <!--  老用户弹窗 只有写内联样式才生效 以后再改 -->
    <div v-transfer-dom>
      <x-dialog v-model="oldUser" :hide-on-blur="true">
        <div>
          <img src="../../../../assets/img/active/groupBooking/gb-icon13.png" style="max-width:100%">
          <p style="font-size: .24rem; font-family: 'Microsoft YaHei', '微软雅黑';color: rgba(102, 102, 102, 1);line-height: .33rem;">您已经是新睿云的常客啦，</p>
          <p style="font-size: .24rem; font-family: 'Microsoft YaHei', '微软雅黑';color: rgba(102, 102, 102, 1);line-height: .33rem;margin-bottom: .5rem"> 可59元直接购买云主机啦！</p>
        </div>
        <div style="border: .01rem solid #D8D8D8;display: flex">
          <span @click="oldUser=false"
                style="width:50%;border-right: .01rem solid #D8D8D8;color:rgba(153,153,153,1);font-size: .36rem;font-family: 'Microsoft YaHei', '微软雅黑';line-height: 1rem">取消</span>
          <span @click="$router.push('groupBooking')"
                style="width:50%;color:rgba(74,144,226,1);font-size: .36rem;font-family: 'Microsoft YaHei', '微软雅黑';line-height: 1rem">立即购买</span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../../../../util/iaxios'
  import {Group, PopupPicker, XDialog} from 'vux'

  export default {
    components: {
      PopupPicker,
      Group,
      XDialog
    },
    data() {
      return {
        productGroups: [
          {
            cpu: 1,
            memory: 2,
            bandwidth: 1,
            disk: 40,
            system: ['windows'],
            currentPrice: 59,
            originalCost: 98.72,
            area: []
          }, {
            cpu: 2,
            memory: 4,
            bandwidth: 1,
            disk: 40,
            system: ['windows'],
            currentPrice: 98,
            originalCost: 176.72,
            area: []
          }],
        systemGroup: [
          {
            name: 'Centos',
            value: 'linux'
          },
          {
            name: 'Windows',
            value: 'windows'
          },],
        areaData: [],
        select: 0,
        oldUser: false
      }
    },
    props: {
      isCloud: {
        type: Boolean,
        default: false
      },
      teamLeaderCompanyId: {
        type: String,
        default: ''
      }
    },
    created() {
      this.$store.state.zoneList.forEach(zone => {
        this.areaData.push({name: zone.zonename, value: zone.zoneid})
      })
      if (this.areaData.length != 0) {
        this.productGroups[0].area[0] = this.areaData[0].value
        this.productGroups[1].area[0] = this.areaData[0].value
      }
      this.getoriginalPrice(0)
    },
    methods: {
      buyNow(index) {
        if (this.$store.state.userInfo == null) {
          this.$router.push('login')
          return
        }
        let vmConfigId = index == 0 ? '33' : '34'
        let params = {
          vmConfigId: vmConfigId,
          osType: this.productGroups[index].system + '',
          defzoneid: this.productGroups[index].area + '',
        }
        if (this.teamLeaderCompanyId != '') {
          params.teamLeaderCompanyId = this.teamLeaderCompanyId
        }
        if (this.teamLeaderCompanyId == '') {
          let url = 'information/getDiskcountMv.do'
          axios.get(url, {params}).then(res => {
            if (res.data.status == 1) {
              sessionStorage.setItem('currentURL', 'groupBooking')
              this.$router.push('orders')
            } else {
              this.$vux.toast.text(res.data.message)
            }
          })
        } else {
          this.$http.get('activity/jdugeTeam.do').then(res => {
            if (res.data.status == 1) {
              if (res.data.result.flag) {
                let url = 'information/getDiskcountMv.do'
                axios.get(url, {params}).then(res => {
                  if (res.data.status == 1) {
                    sessionStorage.setItem('currentURL', 'activity')
                    sessionStorage.setItem('companyID', this.teamLeaderCompanyId)
                    this.$router.push('orders')
                  } else {
                    this.$vux.toast.text(res.data.message)
                  }
                })
              } else {
                // 判断老用户
                this.oldUser = true
              }
            } else {
              this.$vux.toast.text(res.data.message)
            }
          })
        }
      },
      getoriginalPrice(index) {
        let vmConfigId = index == 0 ? '33' : '34'
        let url = 'activity/getOriginalPrice.do'
        let params = {
          vmConfigId: vmConfigId,
          zoneId: this.productGroups[index].area + ''
        }
        axios.get(url, {params: params}).then(res => {
          if (res.data.status == 1) {
            this.productGroups[index].originalCost = res.data.result.originalPrice
          }
        })
      },
      selectItem(index) {
        this.select = index
      }
    },
    computed: {
      currentPrice() {
        return this.productGroups[this.select].currentPrice
      },
      originalCost() {
        return this.productGroups[this.select].originalCost
      },
      isCloudText() {
        return this.isCloud ? '云朵特惠专享' : '云客特惠专享'
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding: .25rem .24rem;
    background: linear-gradient(180deg, rgba(254, 237, 228, 1), rgba(255, 255, 255, 1));
    > h2 {
      font-size: .36rem;
      font-family: "Microsoft YaHei", "微软雅黑";
      color: rgba(75, 19, 43, 1);
      padding-bottom: .3rem;
      width: 100%;
      text-align: center;
      font-weight: normal;
    }
    .center {
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 7rem;
        background: rgba(255, 255, 255, 1);
        border: .01rem solid rgba(223, 226, 244, 1);
        margin-bottom: .2rem;
        &.onSelect {
          box-shadow: 0rem 0.04rem 0.09rem 0rem rgba(214, 84, 86, 0.5);
          border: .02rem solid rgba(254, 79, 74, 1);
        }
        .item-title {
          height: .7rem;
          background: linear-gradient(-90deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
          font-size: .24rem;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(255, 255, 255, 1);
          line-height: .7rem;
          padding-left: .3rem;
        }
        ul {
          display: flex;
          justify-content: space-around;
          padding: .1rem;
          list-style: none;
          li {
            font-size: .32rem;
            font-family: "Microsoft YaHei", "微软雅黑";
            color: rgba(0, 0, 0, 1);
            line-height: .45rem;
            border-right: .01rem solid #DFE2F4;
            width: 25%;
            text-align: center;
            span {
              font-size: .24rem;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(102, 102, 102, 1);
            }
          }
          li:nth-child(4) {
            border-right: none;
          }
        }
        .item-footer {
          p {
            padding: .27rem .2rem;
            font-size: .32rem;
            font-family: "Microsoft YaHei", "微软雅黑";
            color: rgba(254, 79, 74, 1);
            span {
              font-size: .2rem;
              color: #666666;
            }
            span:nth-child(2) {
              margin-left: .2rem;
              text-decoration: line-through;
            }
          }
        }
      }
      .item:nth-child(2) {
        margin-bottom: 0;
      }
    }
    .qucikly-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #FFF;
      position: fixed;
      bottom: 0;
      right: 0;
      font-family: "Microsoft YaHei", "微软雅黑";
      p {
        padding: .27rem .3rem;
        font-size: .32rem;
        color: rgba(51, 51, 51, 1);
        span {
          font-size: .2rem;
          color: #666666;
        }
        span:nth-child(1) {
          color: rgba(254, 79, 74, 1);
          font-size: .32rem;
          margin-left: .1rem;
        }
        span:nth-child(2) {
          margin-right: .2rem;
        }
        span:nth-child(3) {
          text-decoration: line-through;
        }
      }
      button {
        font-size: .32rem;
        color: rgba(255, 255, 255, 1);
        outline: none;
        border: 0;
        background: rgba(254, 79, 74, 1);
        padding: .25rem .84rem .3rem;
      }
    }
  }

</style>
