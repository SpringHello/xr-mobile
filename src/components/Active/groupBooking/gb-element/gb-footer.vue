<template>
  <div>
    <div class="support-wrapper">
      <div class="item" v-for="(item,index) in support" :key="index">
        <img :src="item.img">
        <div>
          <p class="item-title">{{item.title}}</p>
          <p class="item-subtitle">{{item.subTitle}}</p>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <div class="foot-one">
        <img src="../../../../assets/img/home/QR-code.jpg">
        <div class="foot-one-right">
          <h6>联系我们</h6>
          <p>400-0505-565</p>
          <span>service@unionstech.cn</span>
          <span>北京市海淀区东升大厦AB座611、612</span>
        </div>
      </div>
      <div class="foot-two">
        <p>Copyright © 2014-2017 <img src=""><span> 京ICP备15035854号</span></p>
        <p>北京允睿讯通科技有限公司</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        support: [
          {img: require('../../../../assets/img/home/suport-1.png'), title: '7*24', subTitle: '多渠道服务与支持'},
          {img: require('../../../../assets/img/home/suport-2.png'), title: '意见', subTitle: '反馈与投诉建议'},
          {img: require('../../../../assets/img/home/suport-3.png'), title: '1V1', subTitle: '专项服务'},
          {img: require('../../../../assets/img/home/suport-4.png'), title: '退款', subTitle: '7天无理由退款'}
        ],
      }
    },
    props: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  //support
  .support-wrapper {
    background-color: #fff;
    padding: .24rem .4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 50%;
      font-size: 0px;
      margin-bottom: .25rem;
      img {
        vertical-align: middle;
        margin-right: .23rem;
        display: inline-block;
      }
      div {
        vertical-align: middle;
        display: inline-block;
        p {
          font-size: .2rem;
        }
      }
    }
  }

  //首页页尾
  .footer-wrapper {
    background: rgba(67, 67, 67, 1);
    .foot-one {
      border-bottom: 1px solid #666;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: .33rem 0 .38rem .97rem;
      img {
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      .foot-one-right {
        h6 {
          font-weight: normal;
          font-size: .32rem;
          color: rgba(255, 255, 255, 1);
        }
        p {
          color: rgba(125, 161, 217, 1);
          font-size: .36rem;
        }
        span {
          display: block;
          font-size: .24rem;
          color: rgba(255, 255, 255, 1);
          &:last-of-type {
            font-size: .2rem;
          }
        }
      }
    }
    .foot-two {
      padding: .18rem 0 .22rem 0;
      text-align: center;
      font-size: .2rem;
      color: rgba(255, 255, 255, 0.5);
      img {
        padding-left: .3rem;
        width: .2rem;
      }
    }
  }
</style>
