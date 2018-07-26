<template>
  <div class="header">
    <div>
      <img src="../../../../assets/img/active/groupBooking/gb-banner4.png" />
      <p>支付完成，成为云客分享给好友可以赠送免费时长哦 </p>
      <p @click="beCommander">成为云客</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../../../../util/iaxios'
  export default {
    data() {
      return {}
    },
    methods: {
      beCommander() {
        axios.get('activity/createTeam.do').then(res => {
          if(res.data.status == 1){
            this.$router.push('productShare')
            this.$vux.toast.text('开团成功')
          }else{
            this.$vux.toast.text(res.data.message)
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .header {
    > div {
      height: 3rem;
      background: #FA846E url('../../../../assets/img/active/groupBooking/gb-banner2.png') no-repeat center;
      background-size: 7.5rem 3rem;
      text-align: center;
      padding-top: .46rem;
      position: relative;
      img{
        display: block;
        margin: 0 auto 0.15rem;
        height: 1.35rem;
      }
      p{
        font-size:.24rem;
        font-family: "Microsoft YaHei", "微软雅黑";
        color:rgba(255,255,255,1);
        line-height:.36rem;
      }
      p:nth-child(3){
        color: #FFD32F;
      }
    }
  }
</style>
