<template>
  <div class="background">
    <div class="center">
      <h2>我的主机</h2>
      <div class="item">
        <div class="item-title">
          特惠专享
        </div>
        <ul v-for="(item,index) in productGroups" :key="index">
          <li>{{ item.cpu}}核<span>CPU</span></li>
          <li>{{ item.mem}}G<span>内存</span></li>
          <li>{{ item.bandwith}}M<span>宽带</span></li>
          <li>{{ item.disksize}}G<span>SSD</span></li>

          <p>我的区域：<span>{{ item.zonename}}</span></p>
          <p>操作系统：<span>{{ item.templatename }}</span></p>
          <p class="pp">¥{{item.cost}}<span style="margin-left: 0">/月</span><span style="text-decoration: th">原价¥{{ item.originalPrice}}月</span></p>
          <p></p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: {
      productGroups: {
        type: Array
      },
    },
    methods: {},
    watch: {}
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    h2 {
      font-size: .36rem;
      font-family: "Microsoft YaHei", "微软雅黑";
      color: rgba(75, 19, 43, 1);
      font-weight: normal;
      text-align: center;
      position: relative;
      &:before {
        display: inline-block;
        content: '';
        background: linear-gradient(133.1deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
        opacity: 0.5;
        width: .2rem;
        height: .2rem;
        border-radius: .1rem;
        position: absolute;
        top: 15%;
        left: 35%;
      }
    }
    .center {
      margin: 0 auto;
      .item {
        width: 7rem;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(253, 140, 115, 1);
        margin: .3rem auto .2rem;
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
          flex-wrap: wrap;
          padding: .1rem;
          list-style: none;
          li {
            width: 25%;
            font-size: .32rem;
            font-family: "Microsoft YaHei", "微软雅黑";
            color: rgba(0, 0, 0, 1);
            line-height: .45rem;
            border-right: .01rem solid #DFE2F4;
            width: 25%;
            text-align: center;
            position: relative;
            &:after{
              display: inline-block;
              content: '';
              width: 1.9rem;
              border-top: 1px solid #DFE2F4;
              position: absolute;
              bottom: -25%;
              left: -6%;
            }
            >span {
              font-size: .24rem;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(102, 102, 102, 1);
            }
          }
          li:nth-child(4) {
            border-right: none;
          }
          >p{
            width: 50%;
            font-size:.24rem;
            font-family: "Microsoft YaHei", "微软雅黑";
            color:rgba(102,102,102,1);
            text-align: center;
            padding: .34rem 0rem .27rem;
            >span{
              margin-left: .1rem;
              color:rgba(51,51,51,1);
            }
          }
          .pp{
            padding: 0;
            font-size:.32rem;
            font-family: "Microsoft YaHei", "微软雅黑";
            color:rgba(254,79,74,1);
            >span{
              font-size: .2rem;
              color: #666666;
            }
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
    }
  }
</style>
