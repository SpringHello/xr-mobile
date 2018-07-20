<template>
  <div class="background">
    <h2>活动流程</h2>
    <ul>
      <li v-for="item in flowGroup">
        <div>
          <img :src=item.src />
        </div>
        <p>{{ item.step }}</p>
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        flowGroup: [
          {
            src: require('../../../../assets/img/active/groupbooking/gb-icon1.png'),
            step: '1.立即购买'
          },
          {
            src: require('../../../../assets/img/active/groupbooking/gb-icon2.png'),
            step: '2.一键分享链接'
          },
          {
            src: require('../../../../assets/img/active/groupbooking/gb-icon3.png'),
            step: '3.新用户购买'
          },
          {
            src: require('../../../../assets/img/active/groupbooking/gb-icon4.png'),
            step: '4.支付完成'
          },
          {
            src: require('../../../../assets/img/active/groupbooking/gb-icon5.png'),
            step: '5.获赠优惠时长'
          }
        ]
      }
    },
    props: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    h2 {
      font-size: .36rem;
      font-family: "Microsoft YaHei","微软雅黑";
      color: rgba(75, 19, 43, 1);
      text-align: center;
      font-weight: normal;
      position: relative;
      &:before {
        display: inline-block;
        content: '';
        background:linear-gradient(133.1deg,rgba(254,79,74,1),rgba(252,169,135,1));
        opacity:0.5;
        width: .2rem;
        height: .2rem;
        border-radius: .1rem;
        position: absolute;
        top: 15%;
        left: 35%;
      }
    }
    ul {
      margin-top: .3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      list-style: none;
      li {
        width: 30%;
        text-align: center;
        p {
          font-size: .24rem;
          font-family: "Microsoft YaHei","微软雅黑";
          color:rgba(102,102,102,1);
          line-height: .33rem;
        }
      }
      li:nth-child(1){
        margin-bottom: .3rem;
      }
      li:nth-child(2){
        margin-bottom: .3rem;
      }
    }
  }
</style>
