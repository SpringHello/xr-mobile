<template>
  <div class="background">
    <div class="center">
      <h2>云朵成员</h2>
      <div class="participation" v-if="someoneParticipation">
        <p>已满1人，分享成功。继续邀请好友享受福利吧！</p>
        <div class="member">
          <div class="title">
            <p>您已获赠优惠时长：<span>{{ hostDuration }}</span>个月</p>
            <ul>
              <li v-for="title in participationPersonColumns">{{ title}}</li>
            </ul>
            <ul v-for="member in participationPersonData">
              <li>{{member.companyname}}</li>
              <li>{{member.jointime}}</li>
              <li>已支付</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="participation" v-else>
        <p>还差1人即可获得赠送资格，赶快分享吧。</p>
      </div>
      <p>参团链接：<span>{{ activeLink }}</span></p>
      <button @click="shareAlert = true">分享链接</button>
    </div>
    <actionsheet
      v-model="shareAlert"
      :menus="shareGroup"></actionsheet>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Actionsheet, XTable} from 'vux'

  export default {
    components: {
      Actionsheet,
      XTable
    },
    data() {
      return {
        someoneParticipation: false,
        shareGroup: {
          menu1: '北京烤鸭',
          menu2: '陕西油泼面',
          menu3: '西安肉夹馍'
        },
        shareAlert: false
      }
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
      activeLink: {
        type: String
      },
      hostDuration: {
        type: Number
      }
    },
    methods: {},
    watch: {
      participationPersonData() {
        if (this.participationPersonData.length == 0) {
          this.someoneParticipation = false
        } else {
          this.someoneParticipation = true
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding: .25rem 0;
    background: linear-gradient(180deg, rgba(254, 237, 228, 1), rgba(255, 255, 255, 1));
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
          .title {
            box-shadow: 0 0.02rem 0.09rem 0 rgba(214, 84, 86, 0.3);
            margin-bottom: .2rem;
            > p {
              background: #FFF;
              padding: .19rem .23rem;
              font-size: .24rem;
              font-family: "Microsoft YaHei", "微软雅黑";
              color: rgba(51, 51, 51, 1);
              text-align: left;
              span {
                color: #FF5C57;
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
            ul:nth-child(2){
              background: rgba(255, 227, 216, 1);
            }
          }
        }
      }
      > p {
        padding: .14rem .3rem;
        background: rgba(255, 227, 216, 1);
        border-radius: .02rem;
        width: 7rem;
        font-size: .24rem;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(153, 153, 153, 1);
        line-height: .33rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
