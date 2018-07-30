<template>
  <div class="background">
    <div class="center">
      <h2>云朵成员</h2>
      <p v-if="!isBuy">您已获得云主机特惠活动购买资格，请点击购买即可。</p>
      <div class="participation">
        <div class="member">
          <div class="title">
            <p>云客：<span>{{ commander }}</span></p>
            <p>创建时间：<span>{{ createTime }} </span></p>
          </div>
          <ul>
            <li v-for="title in participationPersonColumns">{{ title}}</li>
          </ul>
          <ul v-if="participationPersonData.length == 0">
            <li style="width: 100%">暂无数据</li>
          </ul>
          <ul v-else v-for="member in participationPersonData">
            <li>{{member.companyname}}</li>
            <li>{{member.jointime}}</li>
            <li>已支付</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    components: {},
    data() {
      return {}
    },
    props: {
      participationPersonColumns: {
        type: Array,
        default: () => {
          let Array = []
          return Array
        }
      },
      participationPersonData: {
        type: Array,
        default: () => {
          let Array = []
          return Array
        }
      },
      createTime: {
        type: String
      },
      commander: {
        type: String
      },
      isBuy: {
        type: Boolean
      }
    },
    methods: {},
    watch: {
      participationPersonColumns() {
        console.log(this.participationPersonColumns)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding: .25rem 0;
    .center {
      text-align: center;
      padding: 0 0.24rem;
      > h2 {
        font-size: .36rem;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(75, 19, 43, 1);
        width: 100%;
        text-align: center;
        font-weight: normal;
      }
      .participation {
        margin-bottom: .3rem;
        > p {
          font-size: .22rem;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(102, 102, 102, 1);
          line-height: .3rem;
        }
        .member {
          margin-top: .3rem;
          box-shadow: 0 0.02rem 0.09rem 0 rgba(214, 84, 86, 0.3);
          .title {
            display: flex;
            > p {
              width: 50%;
              background: #FFF;
              padding: .19rem .23rem;
              font-size: .24rem;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(51, 51, 51, 1);
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span {
                color: #FF5C57;
              }
            }
          }
          ul {
            background: #FFF;
            list-style: none;
            display: flex;
            padding: .19rem 0;
            li {
              width: 33.3%;
              font-size: .24rem;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(51, 51, 51, 1);
              line-height: .33rem;
            }
          }
          ul:nth-child(2) {
            background: rgba(255, 227, 216, 1);
          }
        }
      }
      > p {
        padding: .14rem .3rem;
        border-radius: .02rem;
        width: 7rem;
        font-size: .24rem;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(75, 19, 43, 1);
        line-height: .33rem;
        span {
          color: #000000;
        }
      }
      > button {
        border: none;
        outline: none;
        display: block;
        margin: .2rem auto 0;
        font-family: "Microsoft YaHei", "微软雅黑";
        font-size: .24rem;
        color: rgba(255, 255, 255, 1);
        line-height: .33rem;
        padding: .19rem .54rem;
        background: rgba(253, 140, 115, 1);
        border-radius: .06rem;
      }
    }
  }
</style>
