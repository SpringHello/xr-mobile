<template>
  <div id="page-active">
    <div class="banner">
      <div>
        <p style="font-size:.5rem;font-family:PingFangSC-Regular;color:rgba(51,51,51,1);margin-bottom: .17rem">[<span
          style="color:#F26667">0元</span>]购云主机</p>
        <p style="font-size:.5rem;font-family:PingFangSC-Regular;color:rgba(51,51,51,1);">注 册 领 现 金</p>
      </div>
    </div>
    <div class="body">
      <div style="display: flex">
        <div class="flex-item" style="background:rgba(251,201,170,1);">注册即可领取158元大礼包</div>
        <div class="flex-item" style="background:rgba(249,188,148,1);">38元无门槛优惠券整点抢</div>
      </div>
      <div class="main">
        <p class="headline-g">限时领取</p>
        <div id="time">
          <p>10点、12点、15点、17点整点领取38元现金券</p>
          <p>实时计费最长可用一周</p>
        </div>
        <div class="coupon">
          <div v-for="(t,index) in time" :key="index" class="coupon-item" v-if="index>=startIndex&&index<=startIndex+1">
            <div class="left">
              <p>距离{{t.time}}点场还剩</p>
              <div>
                <span class="square">{{t.hour}}{{t.hour1}}</span>
                <span>:</span>
                <span class="square">{{t.minute}}{{t.minute1}}</span>
                <span>:</span>
                <span class="square">{{t.second}}{{t.second1}}</span>
              </div>
            </div>
            <div class="right">
              <p><i>¥</i>38<span>现金券</span></p>
              <button v-if="t.disabled" class="disabled">立即领取</button>
              <button v-else-if="t.remainder==0" class="disabled">已领完</button>
              <button v-else @click="getTicket">立即领取</button>
            </div>
          </div>
          <div style="text-align:center;font-size:.24rem;"><img src="../../assets/img/active/arrow-down.png" alt=""></div>
        </div>
      </div>
    </div>
    <div id="foot">
      <div id="foot-wrapper">
        <p class="head headline-g">活动规则</p>
        <p>1. 活动对象：4.17日以后新注册的用户，注册完成即可领取196元现金红包。</p>
        <p>2. 196元代金券包括38元无门槛代金券（需在官网领取，有效期7天）、68元优惠券（满88元可用）、90元优惠券（满150元可用）</p>
        <p>3. 38元无门槛优惠券需在官网整点抢购。抢购时间：每日10点、12点、 15点、17点共四轮，数量多多，机会多多。抢到即可购买官网任意产品，无最低消费限制。</p>
        <p>4. 158元代金券注册完成即会下发到用户账户。</p>
        <p>5. 代金券进行使用前均需实名认证，且同一用户仅能领取一次。</p>
        <p>6. 若之前注册用户尚未使用过新睿云平台产品，经判定，可向客服申请，领取优惠券。</p>
        <p>7. 此现金红包仅用于支付新睿云平台北京节点订单，抵减相应金额，不能进行兑现或其他用途。</p>
        <p>8. 活动最终解释权在法律范围内归新睿云所有</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import {MessageBox} from 'mint-ui'

  const secondInMillisecond = 1000,
    minuteInMillisecond = secondInMillisecond * 60,
    hourInMillisecond = minuteInMillisecond * 60

  export default {
    name: 'Active',
    beforeRouteEnter (to, from, next) {
      Promise.all([axios.get('network/getTime.do'), axios.get('ticket/couponIsUsed.do')]).then(v => {
        next(vm => {
          vm.setInit(v)
        })
      })
    },
    data () {
      return {
        serverTime: '',
        // 四个抢券的时间点
        time: []
      }
    },
    created(){

    },
    methods: {
      setInit(v){
        this.serverTime = v[0].data.result
        let date = new Date(this.serverTime)
        this.time = [10, 12, 15, 17].map((item, index) => {
          return {time: item, timestamp: date.setHours(item, 0, 0, 0), remainder: v[1].data.data[index]}
        })
        this._calculation()
        setInterval(() => {
          this._calculation()
        }, 1000)
      },
      _calculation(){
        this.time.forEach(item => {
          // 剩余时间
          let remainder = item.timestamp - this.serverTime
          if (remainder <= 0) {
            this.$set(item, 'hour', 0)
            this.$set(item, 'hour1', 0)
            this.$set(item, 'minute', 0)
            this.$set(item, 'minute1', 0)
            this.$set(item, 'second', 0)
            this.$set(item, 'second1', 0)
          } else {
            let hour = Math.floor(remainder / hourInMillisecond),
              minute = Math.floor((remainder % hourInMillisecond) / minuteInMillisecond),
              second = Math.floor((remainder % minuteInMillisecond) / secondInMillisecond)
            this.$set(item, 'hour', Math.floor(hour / 10))
            this.$set(item, 'hour1', hour % 10)
            this.$set(item, 'minute', Math.floor(minute / 10))
            this.$set(item, 'minute1', minute % 10)
            this.$set(item, 'second', Math.floor(second / 10))
            this.$set(item, 'second1', second % 10)
            // 领取时间未到
            this.$set(item, 'disabled', true)
          }
        })
        this.serverTime += 1000
      },
      getTicket(){
        axios.get('ticket/takeTicket.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            MessageBox('提示', response.data.message)
          } else if (response.status == 200 && response.data.status == 2) {
            MessageBox('提示', response.data.message)
          } else if (response.status == 200 && response.data.status == 3) {
            MessageBox({title: '提示', message: response.data.message, confirmButtonText: '立即登录'}).then(() => {
              this.$router.push('login')
            })
          }
        })
      },
      setRemainder(response){
        console.log(response)
      }
    },
    computed: {
      startIndex(){
        let startIndex = 2
        for (let i = 0; i < this.time.length - 1; i++) {
          if (this.time[i].timestamp > this.serverTime) {
            startIndex = i
            break
          } else if (this.time[i + 1].timestamp > this.serverTime) {
            startIndex = i
            break
          }
        }
        return startIndex
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
  #page-active {
    padding-bottom: 1rem;
    .headline-g{
      &:before{
        content: url(../../assets/img/active/triangle-down.png);
        padding: .1rem;
      }
       &:after{
        content: url(../../assets/img/active/triangle-up.png);
        padding: .1rem;
      }
    }
    .banner {
      height: 4rem;
      background: url(../../assets/img/active/banner.png) no-repeat center;
      position: relative;
      div {
        box-sizing: border-box;
        width: 75%;
        margin: auto;
        padding: .33rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 248, 247, 0.6);
        p {
          text-align: center;
        }
      }
    }
    .body {
      background-color: #F9AF80; 
      .flex-item {
        width: 50%;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: .24rem;
        font-family: PingFangSC-Medium;
        color: rgba(255, 255, 255, 1);
      }
      .main {
        padding-top: .8rem;
        background: url(../../assets/img/active/active-background.png) no-repeat center;
        background-size: 100%;
        background-position: center 1.4rem;
        > p {
          text-align: center;
          font-size: .36rem;
          font-family: PingFangSC-Medium;
          color: rgba(255, 255, 255, 1);
          margin-bottom: .18rem;
        }
        #time {
          margin-bottom: .42rem;
          background: url(../../assets/img/active/rectangle.png) no-repeat center;
          background-size: 5.68rem; 
          > p {
            text-align: center;
            font-size: .24rem;
            font-family: PingFangSC-Medium;
            color: rgba(255, 255, 255, 1);
            line-height: .36rem;
          }
        }
        .coupon {
          .coupon-item {
            &:nth-child(1){
              margin-bottom: .24rem;
            }
            height: 2rem;
            padding: 5%;
            position: relative;
            background: url(../../assets/img/active/coupon-background.png) no-repeat center;
            background-size: 100%;
            .left {
              float: left;
              p {
                font-size: .25rem;
                text-align: center; 
                font-family: PingFangSC-Medium;
                color: rgba(242, 102, 103, 1);
                margin-bottom: .25rem;
              }
              div{
                display: flex;
                font-size: .32rem;
                text-align: center;
                span{
                  color: #F26667;
                  width: .43rem;
                  height: .7rem;
                  line-height: .7rem;
                }
                .square{
                  margin:0;
                  display: inline-block;
                  width: .73rem;
                  background-color: #F26667;
                  font-size: .32rem;
                  color: #fff;
                }
                
              }
              
            }
            .right {
              float: right;
              font-size: .33rem;
              p {
                font-size: .4rem;
                margin-bottom: .1rem;
                font-size: .5rem;
                text-align: center;
                color: rgba(242, 102, 103, 1);
                i {
                  font-size: .2rem;
                  font-style: normal;
                }
                span {
                  padding-left:.1rem; 
                  font-size: .2rem;
                }
              }
              button {
                &.disabled {
                  background-color: #D6D6D6;
                  color: #fff;
                }
                font-size: .24rem;
                width: 1.87rem;
                height: .48rem;
                line-height: .48rem;
                background-color: rgba(242, 102, 103, 1);
                border: none;
                outline: none;
                color: #fff;
                border-radius: .24rem;
              }
            }
          }
        }
      }
    }
    #foot {
      background-color: rgba(255, 248, 246, 1);
      #foot-wrapper {
        padding: .17rem;
        p {
          line-height: .48rem;
          font-size: .24rem;
          font-family: PingFangSC-Regular;
          color: rgba(102, 102, 102, 1);
        }
        .head {
          font-size: .36rem;
          line-height: .5rem;
          padding: 10px 0px;
          font-family: PingFangSC-Medium;
          color: rgba(242, 102, 103, 1);
          text-align: center;
        }
      }
    }
  }
</style>
