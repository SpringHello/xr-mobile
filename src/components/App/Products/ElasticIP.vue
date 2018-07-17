<template>
  <div class="host">
    <!--logo-->
    <div class="logo">
      <div class="logo-wrapper">
        <div>
          <p class="title">{{logo.title}}</p>
          <p class="desc">{{logo.desc}}</span>
          <div>
          </div>
        </div>
        <img :src="logo.img">
      </div>
    </div>

    <!--功能描述-->
    <div class="features">
      <div class="features-header">
        <h6>功能描述</h6>
      </div>
      <div class="features-content">
        <div v-for="(item,index) in features" :key="index" class="item">
          <i class="iconfont" :class="item.img"></i>
          <div>
            <p class="features-title">{{item.title}}</p>
            <p class="features-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--应用场景-->
    <div class="stageInfo">
      <div class="stageInfo-header">
        <h6>应用场景</h6>
      </div>
      <div class="stageInfo-content">
        <tab :line-width="2" active-color="#4A90E2">
          <tab-item selected @on-item-click="stageInfo.showYY=true,stageInfo.showSJ=false">
            <h6 class="tab-item">业务公网出口</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true">
            <h6 class="tab-item">多运营商出口</h6>
          </tab-item>
        </tab>
        <div class="stageInfo-item">
          <div class="describe" v-if="stageInfo.showYY">
            <img src="../../../assets/img/ip/stageInfo-yunying.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.text" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="describe" v-if="stageInfo.showSJ">
            <img src="../../../assets/img/ip/stageInfo-yewu.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.SJ.text" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--产品优势-->
    <div class="advantage">
      <div class="advantage-header">
        <h6>产品优势</h6>
      </div>
      <div class="advantage-content">
        <div v-for="(item,index) in advantages" :key="index" class="item">
          <i class="iconfont" :class="item.img"></i>
          <div>
            <p class="advantage-title">{{item.title}}</p>
            <p class="advantage-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--购买-->
    <button @click="buy">立即购买</button>
  </div>
</template>

<script>
  import $store from '@/vuex'
  import {Tab, TabItem} from 'vux'
  export default{
    components: {
      Tab,
      TabItem
    },
    data (){
      window.scrollTo(0, 0);
      return {
        logo: {
          img: require('../../../assets/img/ip/bg.png'),
          title: '弹性IP',
          desc: '弹性公网IP是互联网上合法的静态公网IP地址。弹性公网IP地址是与用户账户相关联的资源，用户可以将弹性公网IP地址与任意虚拟机实例/NAT网关/VPN/负载均衡绑定，并可以随时解绑对应关系，再分配到其他资源实例上。用户可以按需购买，实时开通，同时配置变更实时生效。',
        },
        features: [
          {
            img: 'icon-duligongwangipziyuan',
            title: '独立公网IP资源',
            desc: '为用户提供一个单独公网IP和一定速率带宽，实现与互联网的互通。公网IP可与任意虚拟机实例、NAT网关、负载均衡、VPN网关等实例绑定或解绑，并支持带宽速率的提升和降低，灵活匹配用户不同业务场景。'
          },
          {
            img: 'icon-linghuogoumai',
            title: '按需购买，使用灵活',
            desc: '弹性公网IP支持丰富的付费方案，在满足用户业务需求的前提下帮助用户节约成本。实时开通，配置变更实时生效。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          YY: {
            text: ['企业网站、邮箱、CRM等企业应用通过公网IP提供对外的互联网服务。'],
          },
          SJ: {
            text: ['新睿云提供联通、电信等公网IP，可满足用户的分区需求。如游戏、视频等低时延应用。'],
          },
        },
        advantages: [
          {
            img: 'icon-shiyonglinghuo',
            title: '使用灵活',
            desc: '用户可以通过NAT网关、负载均衡、VPN等功能实现IP地址灵活的使用。'
          },
          {
            img: 'icon-dichengben',
            title: '低成本',
            desc: '用户按需购买，灵活计费，同时支持多IP共享带宽，有效的降低用户网络使用的费用。'
          },
          {
            img: 'icon-youzhidegongwangIPdizhi',
            title: '优质的公网IP地址',
            desc: '使用联通、电信两大运营商的公网地址，可以根据用户的需求分配公网IP资源。'
          }
        ],
      }
    },
    methods: {
      buy(){
        if ($store.state.userInfo) {
          this.$router.push('console')
        } else {
          this.$router.push('login')
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .logo {
    background: linear-gradient(90deg, rgba(74, 136, 254, 1), rgba(56, 125, 255, 1));
    .logo-wrapper {
      display: flex;
      align-items: center;
      padding: .5rem .3rem;
      > div {
        .title {
          color: rgba(255, 255, 255, 1);
          font-size: .36rem;
          padding-bottom: .15rem;
        }
        .desc {
          font-size: .2rem;
          color: rgba(255, 255, 255, 1);
        }
      }
      img {
        width: 3.01rem;
      }
    }

  }

  .features {
    background: rgba(243, 243, 243, 1);
    .features-header {
      text-align: center;
      border-bottom: 1px solid #D9D9D9;
      padding: .43rem 0;
      h6 {
        font-size: .36rem;
        color: rgba(74, 144, 226, 1);
        &::before {
          content: '';
          width: .2rem;
          height: .2rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-right: .2rem;
        }
        &::after {
          content: '';
          width: .2rem;
          height: .2rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-left: .2rem;
        }
      }
    }
    .features-content {
      background: rgba(255, 255, 255, 1);
      .item {
        display: flex;
        padding: .3rem;
        border-bottom: 1px solid #D9D9D9;
        .features-title {
          font-size: .32rem;
          color: rgba(34, 34, 34, 1);
          margin-bottom: .16rem;
        }
        .features-desc {
          font-size: .2rem;
          color: rgba(153, 153, 153, 1);
          word-wrap: break-word;
        }
      }
    }
  }

  .stageInfo {
    background: rgba(243, 243, 243, 1);
    .stageInfo-header {
      text-align: center;
      border-bottom: 1px solid #D9D9D9;
      padding: .43rem 0;
      h6 {
        font-size: .36rem;
        color: rgba(74, 144, 226, 1);
        &::before {
          content: '';
          width: .2rem;
          height: .2rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-right: .2rem;
        }
        &::after {
          content: '';
          width: .2rem;
          height: .2rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-left: .2rem;
        }
      }
    }
    .stageInfo-content {
      background: rgba(255, 255, 255, 1);
      .tab-item {
        font-size: .32rem;
        color: #333;
      }
      .stageInfo-item {
        background: rgba(250, 250, 250, 1);
        padding: .5rem .3rem;
        .describe {
          img {
            width: 4.71rem;
            display: block;
            margin: 0 auto;
            padding-bottom: .3rem;
          }
          h6 {
            font-size: .32rem;
            color: #333;
          }
          ul {
            height: 2rem;
            li {
              list-style: none;
              font-size: .2rem;
              color: #999;
              &::before {
                content: '';
                width: .1rem;
                height: .1rem;
                background: #999;
                display: inline-block;
                border-radius: 50%;
                position: relative;
                bottom: .03rem;
                margin-right: .1rem;
              }
            }
          }
        }
      }
    }
  }

  .advantage {
    background: rgba(243, 243, 243, 1);
    margin-bottom: 2.1rem;
    .advantage-header {
      text-align: center;
      border-bottom: 1px solid #D9D9D9;
      padding: .43rem 0;
      h6 {
        font-size: .36rem;
        color: rgba(74, 144, 226, 1);
        &::before {
          content: '';
          width: .2rem;
          height: .2rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-right: .2rem;
        }
        &::after {
          content: '';
          width: .2rem;
          height: .2rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-left: .2rem;
        }
      }
    }
    .advantage-content {
      background: rgba(255, 255, 255, 1);
      .item {
        display: flex;
        padding: .3rem;
        border-bottom: 1px solid #D9D9D9;
        .advantage-title {
          font-size: .32rem;
          color: rgba(34, 34, 34, 1);
          margin-bottom: .16rem;
        }
        .advantage-desc {
          font-size: .2rem;
          color: rgba(153, 153, 153, 1);
          word-wrap: break-word;
        }
      }
    }
  }

  button {
    position: fixed;
    bottom: 0;
    font-size: .32rem;
    color: #FFF;
    background: #4A90E2;
    border: none;
    outline: none;
    width: 100%;
    padding: .32rem 0;
    text-align: center;
  }
</style>
