<!--全民普惠 三折减单-->
<template>
  <div id="app">
    <x-header>全民普惠 3折减单</x-header>
    <div><img src="../../assets/img/home/banner-3.png" style="width:100%"></div>
    <div class="wrap">
      <div class="activity-header">
        <p>·活动规则·</p>
        <p>活动期间，用户续费最高优享3折减单，具体规则如下：</p>
      </div>
      <div class="activity-price">
        <p style="font-size:0.28rem" class="headline">
          <span class="price">单次续费（元）</span><span class="price">减单（元）</span>
        </p>
        <ul>
          <li v-for="(item,index) in priceList" :key="index">
            <span class="price">{{item.renew}}</span><span class="price">{{item.reduction}}</span>
          </li>
        </ul>
      </div>
      <ul class="rule-text">
        <li v-for="(item,index) in ruleText" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="recommend">
      <p class="join">推荐</p>
      <span>您还可以参加</span>
      <div class="attend">
        <li v-for="(item,index) in attends" :key="index">
          <div>
            <p>{{item.name}}</p>
            <p class="desc">{{item.desc}}</p>
          </div>
          <p>前往参加></p>
        </li>
      </div>
    </div>
    <div class="btn-bottom">立即续费</div>
  </div>
</template>
<script>
  import {XHeader} from 'vux'
  export default {
    components: {
      XHeader,
    },
    beforeRouteEnter (to, from, next) {
      next()
    },
    data () {
      window.scrollTo(0, 0);
      return {
        priceList: [
          {renew: '20', reduction: '6'},
          {renew: '150', reduction: '50'},
          {renew: '300', reduction: '120'},
          {renew: '450', reduction: '200'},
          {renew: '1000', reduction: '500'},
          {renew: '2000', reduction: '1200'},
          {renew: '5000', reduction: '3000'},
          {renew: '10000', reduction: '7000'}
        ],
        ruleText: [
          ' 新睿云已注册且完成实名认证用户均可参与。',
          ' 使用续费减免支付的订单支持7天无理由退款，发生退款时，优惠减免支付的部分不予返还。',
          ' 本次活动仅支持在线支付，不支持代金券购买和线下打款。',
          ' 该续费减免活动只适用于升级或续费新睿云标准收费产品，不可与其它优惠活动同时使用。',
          ' 使用续费减免优惠的订单金额不支持开具发票，开具发票只针对客户实际缴费支付金额。',
          ' 如用户存在作弊、欺诈或通过其他非正常手段获取利益的行为，新睿云有权收回相关权益。',
          ' 活动最终解释权法律范围内归新睿云所有。'
        ],
        attends: [
          {name: '0元购主机 注册领现金', desc: '198元现金大礼包免费领'},
          {name: '新手上云 一律免费', desc: '服务器免费试用60天 带你体验飞一般的感觉'}
        ],
      }
    },
    methods: {},
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  #app {
    padding-bottom: 1rem;
    background: rgba(255, 255, 255, 1);
    .wrap {
      background-color: #FFF;
      padding: 0 0.3rem;
    }
  }

  @pink: #f26d6e;
  .activity-header {
    text-align: center;
    padding-bottom: 0.4rem;
    p:nth-child(1) {
      margin-bottom: 0.2rem;
      font-size: 0.36rem;
      color: @pink;
    }
    p:last-child {
      font-size: 0.26rem;
    }
  }

  .activity-price {
    .price {
      display: inline-block;
      width: 50%;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
    }
    .headline {
      span {
        border-bottom: solid 0.02rem @pink;
        color: @pink;
      }
    }
    ul {
      li {
        font-size: 0.28rem;
        list-style-type: none;
      }
    }
  }

  .rule-text {
    padding: 0.6rem 0;
    padding-left: 0.3rem;
    font-size: 0.24rem;
    color: #666666;
    border-bottom: solid 0.02rem @pink;
  }

  .other-activity {
    padding: 0.48rem 0;
    font-size: 0.2rem;
    .content {
      div {
        margin-bottom: 0.2rem;
        padding: 0.24rem 0.4rem;
        height: 1.28rem;
        background: linear-gradient(
          90deg,
          rgba(243, 183, 104, 1),
          rgba(243, 112, 104, 1)
        );
        border-radius: 5px;
        color: #fff;
        p {
          font-size: 0.28rem;
        }
        a {
          color: #fff032;
          float: right;
        }
      }
    }
  }

  .recommend {
    background-color: #FFF;
    line-height: 0;
    padding: .48rem .3rem .44rem .3rem;
    .join {
      display: inline-block;
      font-size: .2rem;
      color: #F37B72;
      line-height: .28rem;
    }
    span {
      font-size: .2rem;
      color: #000;
      line-height: .28rem;
    }
    .attend {
      margin-top: .32rem;
      li {
        list-style: none;
        background: linear-gradient(90deg, rgba(243, 183, 104, 1), rgba(243, 112, 104, 1));
        border-radius: .05rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .24rem .3rem;
        margin-bottom: .2rem;
        > div {
          p {
            font-size: .28rem;
            color: rgba(255, 255, 255, 1);
            line-height: .4rem;
          }
          .desc {
            font-size: .2rem;
          }
        }
        p {
          font-size: .2rem;
          color: rgba(255, 240, 50, 1);
          line-height: .28rem;
        }
      }
    }
  }

  .btn-bottom {
    width: 100%;
    height: 1rem;
    background: @pink;
    font-size: 0.36rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
  }
</style>
