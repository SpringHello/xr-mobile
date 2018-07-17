<template>
  <div id="page-registerSuccess">
    <div>
      <p style="font-size:.6rem;font-family:PingFangSC-Medium;color:rgba(242,102,103,1);margin-bottom: .8rem;">
        恭喜您注册成功！</p>
      <p style="font-size:.36rem;font-family:Arial-Black;color:rgba(242,102,103,1);margin-bottom: .4rem;">
        158元新手大礼包已发送至账号</p>
      <p style="font-size:.24rem;font-family:PingFangSC-Regular;color:rgba(102,102,102,1);margin-bottom: 1.72rem;">
        前往“费用中心-卡券包”进行查看</p>
      <p style="font-size:.36rem;font-family:PingFangSC-Regular;color:rgba(255,255,255,1);margin-bottom: .16rem">
        登录官网领取免费试用主机！</p>
      <p style="font-size:.24rem;font-family:PingFangSC-Regular;color:rgba(248,231,28,1);margin-bottom: .71rem">
        复制活动链接发送至浏览器并打开，点击 “立即领取”即可参与</p>
      <button
        style="padding:.21rem 1.28rem;border:none;outline: none;background-color: #FFDF66;border-radius:.4rem;font-size: .36rem;color:#F26667;box-shadow:0px 2px 28px -21px rgba(204,61,62,1);"
        @click="go">
        立即领取
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RegisterSuccess',
    data () {
      return {}
    },
    methods: {
      go(){
        this.$router.push('home')
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #page-registerSuccess {
    div {
      background: url('../../assets/img/LR/background.png');
      text-align: center;
      width: 100%;
    }
  }
</style>
