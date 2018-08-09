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
    <div v-transfer-dom>
      <popup v-model="shareAlert" position="bottom">
        <div style="background: #FFF">
          <p class="share-title">活动分享到：</p>
          <div class="share-way">
            <ul v-for="(item,index) in shareGroup" @click="shareLink(index)">
              <img :src="item.src"/>
              <li>{{item.text}}</li>
            </ul>
            <ul v-clipboard="activeLink" @success="onCopy" @error="onError">
              <img src="../../../../assets/img/active/groupBooking/gb-icon16.png"/>
              <li>复制链接</li>
            </ul>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {TransferDom, Popup,} from 'vux'
  export default {
    components: {
      TransferDom,
      Popup,
    },
    data() {
      return {
        someoneParticipation: false,
        shareAlert: false,
        shareGroup: [
          {
            src: require('../../../../assets/img/active/groupBooking/gb-icon15.png'),
            text: 'QQ'
          },
          {
            src: require('../../../../assets/img/active/groupBooking/gb-icon14.png'),
            text: '空间'
          },
          {
            src: require('../../../../assets/img/active/groupBooking/gb-icon17.png'),
            text: '微信'
          },
          {
            src: require('../../../../assets/img/active/groupBooking/gb-icon19.png'),
            text: '朋友圈'
          },
          {
            src: require('../../../../assets/img/active/groupBooking/gb-icon18.png'),
            text: '微博'
          }
        ]
      }
    },
    created(){
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
      shareLink(val) {
        axios.get('').then(response => {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: '', // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名，见附录1
            jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          switch (val) {
            case 0:
              wx.onMenuShareQQ({ // 分享给QQ  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: '分享', // 分享标题
                desc: '我有你也有，高品质云主机59元畅享一年，详情查看活动链接', // 分享描述
                link: this.activeLink, // 分享链接
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  this.$vux.toast.text('分享成功')
                  this.shareAlert = false
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              break
            case 1:
              wx.onMenuShareQZone({ // 分享给空间  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: '分享', // 分享标题
                desc: '我有你也有，高品质云主机59元畅享一年，详情查看活动链接', // 分享描述
                link: this.activeLink, // 分享链接
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  this.$vux.toast.text('分享成功')
                  this.shareAlert = false
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              break
            case 2:
              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: '分享', // 分享标题
                desc: '我有你也有，高品质云主机59元畅享一年，详情查看活动链接', // 分享描述
                link: this.activeLink, // 分享链接
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  this.$vux.toast.text('分享成功')
                  this.shareAlert = false
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              break
            case 3:
              wx.onMenuShareTimeline({ // 分享给朋友圈  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: '分享', // 分享标题
                desc: '我有你也有，高品质云主机59元畅享一年，详情查看活动链接', // 分享描述
                link: this.activeLink, // 分享链接
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  this.$vux.toast.text('分享成功')
                  this.shareAlert = false
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              break
            case 4:
              window.open('http://service.weibo.com/share/share.php?url=' + this.activeLink + '&title=' + '我有你也有，高品质云主机59元畅享一年，详情查看活动链接' + '&pic=' + '' + '&searchPic=false', '_self')
              break
          }
        })
        wx.ready(function () {
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
      },
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
</style>
