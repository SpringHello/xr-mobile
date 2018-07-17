<template>
  <div class="background">
    <div class="center">
      <p class="pb">分享赠时长进行中</p>
      <div class="banner-button" v-if="d=='00'&&h=='00'&&m=='00'&&s=='00'">
        <span @click="openGroup">重新开团</span>
      </div>
      <div class="timer" v-else>
        剩余： <span>{{ d }}</span>天
        <span>{{ h }}</span>时
        <span>{{ m }}</span>分
        <span>{{ s }}</span>秒
      </div>
      <p class="p1">数量有限，赶快分享，优惠掌握在自己手中 </p>
      <p class="p1">（邀请第一人时长期限为3天，总可邀请时长期限为15天）</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        d: '--',
        h: '--',
        m: '--',
        s: '--'
      }
    },
    props: {
      timeEnd: {
        type: Function
      },
      startTime: {
        type: Number
      },
      endTime: {
        type: Number
      }
    },
    methods: {
      setTime() {
        let limitTime = this.endTime - this.startTime
        if (limitTime > 0) {
          this.setLimit(limitTime)
          let s = setInterval(() => {
            this.setLimit(limitTime)
            limitTime -= 1000
            if (limitTime <= 0) {
              window.clearInterval(s)
            }
          }, 1000);
        } else {
          this.d = this.checkTime(0);
          this.h = this.checkTime(0);
          this.m = this.checkTime(0);
          this.s = this.checkTime(0);
        }

      },
      openGroup() {
        this.$http.get('activity/createTeam.do').then(res => {
          if (res.data.status == 1) {
            this.$Message.success('开团成功')
            this.$router.go(0)
          } else {
            this.$message.info({
              content: res.data.result.info
            })
          }
        })
      },
      setLimit(time) {
        let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
        this.d = this.checkTime(days);
        this.h = this.checkTime(hours);
        this.m = this.checkTime(minutes);
        this.s = this.checkTime(seconds);
      },
      checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      }
    },
    watch: {
      startTime() {
        this.setTime()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    height: 3rem;
    background:  #FA846E url('../../../../assets/img/active/groupBooking/gb-banner2.png') no-repeat center;
    background-size: 7.5rem 3rem;
    .center {
      margin: 0 auto;
      text-align: center;
      padding-top: 0.3rem;
      position: relative;
      .pb {
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(255, 255, 255, 1);
        font-size: 0.24rem;
        line-height: 0.48rem;
        width:2.6rem;
        height:.48rem;
        background:linear-gradient(90deg,rgba(252,92,125,1),rgba(106,130,251,1));
        margin: 0 auto;
        border-radius:.27rem;
      }
      .p1 {
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(255, 255, 255, 1);
        line-height: 0.28rem;
        font-size: 0.2rem;
      }
      .timer {
        margin-top: 0.26rem;
        color: #fff;
        font-size: 0.2rem;
        margin-bottom: 0.26rem;
        span {
          display: inline-block;
          margin: 0 0.2rem;
          width: 0.72rem;
          height: 0.72rem;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0.04rem 0 rgba(252, 139, 114, 1);
          border: 0.03rem solid rgba(228, 42, 42, 1);
          font-size: 0.4rem;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(254, 84, 77, 1);
          line-height: 0.72rem;
        }
      }
      .banner-button {
        margin-top: 0.6rem;
        position: relative;
        > span {
          font-size: 0.24rem;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
</style>
