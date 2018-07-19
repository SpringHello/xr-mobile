<template>
  <div class="background">
    <h2>活动规则</h2>
    <div class="main">
      <div class="container-text">
        <div v-for="(item,index) in ruleData" :key="index" class="item">
          <div class="index">{{index+1}}、</div>
          <p>{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        ruleData: [
          '本活动云主机全部特价，新老用户首次购买主机均为59元（或98元）。购买完自主分享给身边的人购买，称为新睿云“云客”，被分享邀请购买的新人称为“云朵”',
          '新睿云云客每带动一个新用户注册并购买，则可获赠一个月免费使用时长。新用户指未注册或购买过新睿云官网产品的用户。',
          '新睿云用户首次分享时将获得专属私密链接，需在3天内成功邀请至少一个云朵付费后才可成为真正的云客，连续获得免费使用时长。3天内激活不成功，链接失效，需要重新生成链接。',
          '分享链接被激活后有15天有效期，此期间邀请云朵均可累计赠送使用时长。赠送月数=邀请成功付费人数，12个月封顶。',
          '此活动支付时不可与其他优惠活动或者代金券叠加使用。',
          '支付成功后可3天无理由退款，若云朵退款则相应取消云客一个月优惠使用时长。',
          '活动最终解释权在法律范围内归新睿云所有。 '
        ]
      }
    },
    props: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding: .25rem 0;
    h2 {
      font-size: .36rem;
      font-family: "Microsoft YaHei", "微软雅黑";
      color: rgba(75, 19, 43, 1);
      text-align: center;
      font-weight: normal;
      position: relative;
      &:after {
        display: inline-block;
        content: '';
        background: linear-gradient(-132.5deg, rgba(255, 211, 49, 1), rgba(255, 232, 158, 1));
        opacity: 0.5;
        width: .2rem;
        height: .2rem;
        border-radius: .1rem;
        position: absolute;
        top: 15%;
        right: 35%;
      }
    }
    .main {
      margin-top: .2rem;
      display: flex;
      justify-content: center;
    }
    .container-text {
      .item {
        display: flex;
        .index {
          width: .22rem;
          font-size: .24rem;
          color: rgba(252, 169, 135, 1);
          margin-right: 0.1rem;
          font-weight: 900
        }
        p {
          font-family: "Microsoft YaHei", "微软雅黑";
          font-size: .24rem;
          color: rgba(102, 102, 102, 1);
          line-height: .33rem;
        }
      }
    }
  }
</style>
