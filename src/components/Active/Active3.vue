<template>
  <div id="page-active">
    <x-header>注册领红包</x-header>
    <div class="banner">
      <div class="box">
        <div>
          <p style="font-size:.28rem">[整点抢]</p>
          <p style="font-size:.4rem;font-weigth:600;margin:.18rem 0 .2rem 0;">新手上云 一律<span class="pink-text">免费</span></p>
          <div>
            <p>云服务器免费试用<span class="pink-text">60天</span></p>
            <p>带你体验飞一般的感觉</p>
          </div>
        </div>
         <img src="../../assets/img/active/banner-airport.png"/>
      </div>
    </div>
    <div class="body">
      <div class="main wrap">
        <div class="coupon">
          <div v-for="(t,index) in time" :key="index" class="coupon-item" v-if="index>=startIndex&&index<=startIndex+1">
          <div class="head">
            <p>弹性云服务器</p>
            <p>适用于个人建站或者初创公司宣传网站，轻量级应用</p>
          </div>
          <div class="content">
            <div class="timer">
              <span class="text">距离{{t.time}}点场还剩</span>
              <div>
                <span class="square">{{t.hour}}{{t.hour1}}</span>
                <span>:</span>
                <span class="square">{{t.minute}}{{t.minute1}}</span>
                <span>:</span>
                <span class="square">{{t.second}}{{t.second1}}</span>
              </div>
            </div>
            <div>
              <div class="params">
                <div v-for="(item,index1) in configs" :key="index1" class="item">
                    <input type="radio" :name="'config'+index" :value="item.num" v-model="t.selectedConfig"></input>
                    <div>
                      <span>{{item.cpu}}<i>CPU</i></span>
                      <span>{{item.memory}}<i>内存</i></span>
                      <span>{{item.band}}<i>宽带</i></span>
                      <span>{{item.disk}}<i>磁盘</i></span>
                      <span>{{item.day}}天</span>
                    </div>
                </div>
                <div class="system">
                  <span v-for="(s,index2) in systemList" :key="index2"  class="item">
                    <input type="radio" :name="'system'+index" :value="s.text" v-model="t.selectedSystem"><span>{{s.text}}</span></input>
                  </span>
                </div>
            </div>
            </div>
            <div class="bottom">
              <button v-if="t.disabled" class="disabled">立即领取</button>
              <button v-else-if="t.remainder==0" class="disabled">已领完</button>
              <button v-else @click="freeReceive(t)">立即领取</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    <div class="activity-process wrap">
      <div class="header-g">·活动流程·</div>
      <div class="content">
        <div>
            <img src="../../assets/img/active/icon-auth-11.png" alt="" v-if="isLogin==1">
            <img src="../../assets/img/active/icon-auth-1.png" alt="" v-else>
            <div>① 新用户注册登录</div>
        </div>
        <div>
            <img src="../../assets/img/active/icon-auth-21.png" alt="" v-if="companyauth==0||personalauth==0">
            <img src="../../assets/img/active/icon-auth-2.png" alt="" v-else>
            <div>② 完成实名认证</div>
        </div>
        <div>
            <img src="../../assets/img/active/icon-auth-3.png" alt="" v-if="isReceive==0">
            <img src="../../assets/img/active/icon-auth-31.png" alt="" v-else>
            <div>③ 完成实名认证</div>
        </div>
        
      </div>
    </div>
    <div id="foot">
      <div class="wrap">  
        <div class="header-g">·活动规则·</div>
        <h3>1.活动时间： </h3>
        <p>2018年4月29日开始，数量有限，送完为止。 </p>
        <h3>2.活动对象： </h3>
        <p>新注册且已通过个人／企业认证，且未领取和购买过本平台资源的用户。  </p>
        <h3>3.活动内容： </h3>
        <p>符合条件的用户在每天10点、12点、15点、17点抢购免费主机。抢购成功即可使用。活动期间每人限领一次。 </p>
        <h3>4.资格详细规则： </h3>
        <p>1）用户如果已购买、已体验过对应的产品，不能再次申请；</p>
        <p>2）同一手机号对应的多个账号只能申请一次； </p>
        <p>3）同一个实名认证用户，仅可申请一次，同一个账号只能领取一次。  </p>
        <h3>5.领取免费产品规则： </h3>
        <p>1）免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取；</p>
        <p>2）在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。 </p>
        <h3>6.为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后7天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。 </h3>
        <h3>7.活动最终解释权在法律范围内归新睿云所有。</h3>         
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/util/iaxios'
import { MessageBox } from 'mint-ui'
import { XHeader } from 'vux'
import $store from 'vuex'
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
      radioselected: '',
      personalauth: 1,
      companyauth: 1,
      isLogin: 0,
      // 是否领取主机 0未领取
      isReceive: 0,
      process: [
        {
          img: require('../../assets/img/active/icon-auth-1.png'),
          imgselected: require('../../assets/img/active/icon-auth-11.png'),
          text: '新用户注册登录'
        },
        {
          img: require('../../assets/img/active/icon-auth-2.png'),
          imgselected: require('../../assets/img/active/icon-auth-21.png'),
          text: '完成实名认证'
        },
        {
          img: require('../../assets/img/active/icon-auth-3.png'),
          imgselected: require('../../assets/img/active/icon-auth-31.png'),
          text: '免费领取企业云主机'
        }
      ],
      systemList: [
        {
          text: 'windows'
        },
        {
          text: 'linux'
        },
      ],
      configs: [
        {
          checked: true,
          num: 31,
          cpu: 1,
          memory: 1,
          band: 2,
          disk: 40,
          day: 60
        },
        {
          checked: true,
          num: 32,
          cpu: 1,
          memory: 2,
          band: 5,
          disk: 40,
          day: 30
        }
      ],
      serverTime: '',
      // 四个抢券的时间点
      time: []
    }
  },
  created () {
    if (this.$store.state.userInfo != null) {
      this.isLogin = 1
      this.userInfo = this.$store.state.userInfo
      this.companyauth = this.userInfo.companyauth
      this.personalauth = this.userInfo.personalauth
      if (this.userInfo.activityInfo[13].companytype === 1) {
        this.isReceive = 1
      } else {
        this.isReceive = 0
      }
    }
  },
  methods: {
    setInit (v) {
      this.serverTime = v[0].data.result
      let date = new Date(this.serverTime)
      this.time = [10, 12, 15, 17].map((item, index) => {
        return { time: item, timestamp: date.setHours(item, 0, 0, 0), remainder: v[1].data.data[index], selectedConfig: 31, selectedSystem: 'windows' }
      })
      console.log(this.time)
      this._calculation()
      setInterval(() => {
        this._calculation()
      }, 1000)
    },
    _calculation () {
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
    getTicket () {
      axios.get('ticket/takeTicket.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          MessageBox('提示', response.data.message)
          //2 已经领取
        } else if (response.status == 200 && response.data.status == 2) {
          MessageBox('提示', response.data.message)
        } else if (response.status == 200 && response.data.status == 3) {
          MessageBox({ title: '提示', message: response.data.message, confirmButtonText: '立即登录' }).then(() => {
            this.$router.push('login')
          })
        }
      })
    },
    setRemainder (response) {
      console.log(response)
    },
    // 免费领取主机
    freeReceive (item) {
      if (this.$store.state.userInfo == null) {
        MessageBox({ title: '提示', message: response.data.message, confirmButtonText: '立即登录' }).then(() => {
          this.$router.push('login')
        })
        return
      }
      var params = {
        vmConfigId: item.selectedConfig,
        osType: item.selectedSystem,
        defzoneid: 'a0a7df65-dec3-48da-82cb-cff9a55a4b6d'
      }
      axios.get('information/getFreeMv.do', {
        params
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          MessageBox('提示', response.data.message)
        } else {
          MessageBox('提示', response.data.message)
        }
      })
    }
  },
  computed: {
    startIndex () {
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
  },
  components: {
    XHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
#page-active {
  @pink: #f37b72;
  .header-g {
    text-align: center;
    padding-bottom: 0.5rem;
    font-size: 0.36rem;
    color: @pink;
    line-height: 0.5rem;
  }
  .pink-text {
    color: @pink;
  }
  padding-bottom: 1rem;
  .wrap {
    padding: 0.5rem 0.3rem;
  }
  .banner {
    .box {
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      p {
        font-size: 0.26px;
      }
    }
  }
  .body {
    .main {
      > p {
        text-align: center;
        font-size: 0.36rem;
        font-family: PingFangSC-Medium;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 0.18rem;
      }
      .coupon {
        .coupon-item {
          box-shadow: 0px 2px 31px -11px rgba(255, 103, 2, 0.7);
          .head {
            padding: 0.4rem;
            border-radius: 3px 0px 0px 3px;
            background: url(../../assets/img/active/bg-text.png) no-repeat top;
            background-size: 100%;
            color: #fff;
            p {
              font-size: 0.24rem;
              &:nth-of-type(1) {
                font-size: 0.36rem;
              }
            }
          }
          &:nth-child(1) {
            margin-bottom: 0.24rem;
          }
          .content {
            padding: 0.5rem;
            .params {
              .item {
                height: 1rem;
                display: flex;
                align-items: center;
                input {
                  margin-right: 0.22rem;
                }
                div {
                  display: inline-block;
                  vertical-align: text-bottom;
                  height: 1rem;
                  line-height: 1rem;
                  span {
                    float: left;
                    font-size: 0.24rem;
                    margin-right: 0.24rem;
                    i {
                      font-size: 0.2rem;
                      color: #999;
                      font-style: normal;
                    }
                    &:last-child {
                      color: @pink;
                    }
                  }
                }
              }
              .system {
                height: 1rem;
                font-size: 0.24rem;
                display: flex;
                align-items: center;
                .item {
                  span {
                    float: left;
                    margin: 0 0.5rem 0 0;
                  }
                }
              }
            }
          }
          .timer {
            display: flex;
            justify-content: flex-start;
            .text {
              margin-right: 0.4rem;
              font-size: 0.36rem;
              color: rgba(242, 102, 103, 1);
            }
            div {
              display: inline-block;
              font-size: 0.36rem;
              text-align: center;
              color: #f26667;
              span {
                display: inline-block;
                float: left;
                width: 0.5rem;
                height: 0.6rem;
              }
              .square {
                width: 0.6rem;
                line-height: 0.6rem;
                background-color: #f26667;
                color: #fff;
              }
            }
          }
          .bottom {
            text-align: center;
            button {
              display: inline-block;
              font-size: 0.36rem;
              width: 3.54rem;
              height: 0.88rem;
              line-height: 0.88rem;
              background-color: rgba(242, 102, 103, 1);
              border: none;
              outline: none;
              color: #fff;
              border-radius: 0.44rem;
              &.disabled {
                background-color: #d6d6d6;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .activity-process {
    text-align: center;
    .content {
      display: flex;
      justify-content: space-between;
      font-size: 0.2rem;
      color: #666;
      img {
        margin-bottom: 0.24rem;
      }
    }
  }
  #foot {
    background-color: rgba(255, 248, 246, 1);
    .wrap {
      padding: 0.5rem;
    }
    h3 {
      color: #333;
      font-size: 0.24rem;
      line-height: 0.5rem;
    }
    p {
      color: #888;
      font-size: 0.24rem;
      line-height: 0.5rem;
    }
  }
}
</style>
