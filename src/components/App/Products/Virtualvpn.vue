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
          <img :src="item.img">
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
            <h6 class="tab-item">混合云部署</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true">
            <h6 class="tab-item">跨地域VPN互联</h6>
          </tab-item>
        </tab>
        <div class="stageInfo-item">
          <div class="describe" v-if="stageInfo.showYY">
            <img src="../../../assets/img/vpn/stageInfo-bushu.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.text" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="describe" v-if="stageInfo.showSJ">
            <img src="../../../assets/img/vpn/stageInfo-vpn.png">
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
          <img :src="item.img">
          <div>
            <p class="advantage-title">{{item.title}}</p>
            <p class="advantage-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
      <div class="advantage-bottom"></div>
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
          img: '',
          title: '虚拟专用网络VPN',
          desc: '虚拟专用网络（Virtual Private Network）是通过互联网，采用IPsec加密技术，实现用户本地数据中心、用户办公网络与新睿云VPC之间安全可靠的连接，使用便捷灵活，即开即用，打造可伸缩的混合云环境。',
        },
        features: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '点对点VPN（site2siteVPN）',
            desc: '基于Internet，在客户本地数据中心、第三方公有云（第三方需支持VPC和VPN）和新睿云虚拟私有云（VPC）之间建立的起IPsec加密通信隧道。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '点对多VPN（Remote VPN）',
            desc: '基于Interne，在客户本地主机/第三方公有云主机与新睿云虚拟私有云（VPC）之间建立的起IPsec加密通信隧道。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          YY: {
            text: ['通过VPN将用户本地数据中心和新睿云VPC互联，利用新睿云的弹性和快速伸缩能力，快速扩展应用或业务的服务能力。'],
          },
          SJ: {
            text: ['通过VPN将新睿云不同可用区的VPC实现互联，使用户的数据和服务在不同区域能够互联互通。'],
          },
        },
        advantages: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '无缝连接',
            desc: '将用户本地数据中心与云上VPC互联，业务快速扩展上云，实现混合云部署。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '高安全',
            desc: '基于IKE和IPsec对传输数据加密，提供了电信级的高可靠性机制。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '成本低',
            desc: '利用Internet构建IPsec加密通道，费用低廉。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '开通快',
            desc: '对用户本地IDC的VPN设备进行简单配置即可完成对接，即开即用，部署快速，实时生效。'
          }
        ],
      }
    },
    methods:{
      buy(){
        if ($store.state.userInfo){
          this.$router.push('console')
        }else{
          this.$router.push('login')
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .logo {
    background: #081633;
    .logo-wrapper {
      display: flex;
      padding: .5rem .3rem;
      > div {
        width: 65%;
        .title {
          color: rgba(255, 255, 255, 1);
          font-size: .24rem;
          padding-bottom: .15rem;
        }
        .desc {
          font-size: .2rem;
          color: rgba(255, 255, 255, 1);
        }
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
        img {
          width: .8rem;
          height: .8rem;
          margin-right: .25rem;
        }
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
          img{
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
            height: 2.5rem;
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
        img {
          width: .8rem;
          height: .8rem;
          margin-right: .25rem;
        }
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
    .advantage-bottom {
      height: .69rem;
    }
  }

  button {
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
