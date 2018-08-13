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
      <div v-if="shareAlert" class="mask">
        <img src="../../../../assets/img/active/groupBooking/guide1.png">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {TransferDom, Popup,} from 'vux'
  import axios from  '../../../../util/iaxios'
  //var wx = require('weixin-js-sdk')
  export default {
    components: {
      TransferDom,
      Popup,
    },
    data() {
      return {
        someoneParticipation: false,
        shareAlert: false
      }
    },
    mounted() {
      setTimeout(() => {
        axios.get('wx/wxgetinfo.do', {
          params: {
            urls: location.href
          }
        }).then(response => {
          if (response.status == 200) {
            wx.config({
              //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: response.data.result.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
              timestamp: response.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: response.data.result.nonceStr, // 必填，生成签名的随机串
              signature: response.data.result.signature,// 必填，签名，见附录1
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        })
        wx.ready(() => {
          //this.activeLink = 'http://pan.xrcloud.net/ruicloud/sort'
          var shareData = {
            title: '分享', // 分享标题
            desc: '我有你也有，高品质云主机59元畅享一年，详情查看活动链接', // 分享描述
            link: this.activeLink, // 分享链接
            imgUrl: 'http://pan.xrcloud.net/ruicloud/static/img/money.png', // 分享图标
            success: () => {
              // 分享成功可以做相应的数据处理
              this.$vux.toast.text('分享成功')
            }
          }
          wx.onMenuShareTimeline({
            title: shareData.title, // 分享标题
            link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareData.imgUrl, // 分享图标
            success: function () {
              // 用户点击了分享后执行的回调函数
            }
          })
          //wx.onMenuShareTimeline(shareData);
          wx.onMenuShareAppMessage({
            title: shareData.title, // 分享标题
            desc: shareData.desc, // 分享描述
            link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareData.imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户点击了分享后执行的回调函数
            }
          });
          //wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareQQ(shareData);
          //wx.onMenuShareWeibo(shareData);
          wx.onMenuShareQZone({
            title: shareData.title, // 分享标题
            desc: shareData.desc, // 分享描述
            link: shareData.link, // 分享链接
            imgUrl: shareData.imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        })
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      }, 0)
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
    methods: {
      onCopy() {
        this.$vux.toast.text('复制成功')
        this.shareAlert = false
      },
      onError() {
        this.$vux.toast.text('复制失败')
      },
    },
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
            ul:nth-child(2) {
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

  .share-title {
    font-size: .24rem;
    font-family: "Microsoft YaHei", "微软雅黑";
    color: rgba(51, 51, 51, 1);
    padding: .3rem;
  }

  .share-way {
    display: flex;
    flex-wrap: wrap;
    > ul {
      list-style: none;
      width: 20%;
      text-align: center;
      > img {
        display: block;
        width: .8rem;
        margin: 0 auto;
      }
      > li {
        margin-top: .2rem;
        font-size: .24rem;
        font-family: "Microsoft YaHei", "微软雅黑";
        color: rgba(102, 102, 102, 1);
      }
    }
    ul:nth-child(6) {
      margin-top: .1rem;
    }
  }

  .mask {
    width: 100%;
    background: rgba(51, 51, 51, 0.98);
    position: absolute;
    top: 0px;
    bottom: 0px;
    z-index: 10000;
    left: 0px;
  }
</style>
