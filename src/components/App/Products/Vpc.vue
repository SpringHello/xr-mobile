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
        <img src="../../../assets/img/balance/Fill.png" style="width: .21rem;height: .19rem;">
        <h6>功能描述</h6>
        <img src="../../../assets/img/balance/Fill.png" style="width: .21rem;height: .19rem;">
      </div>
      <div class="features-content">
        <div v-for="(item,index) in features" :key="index" class="item">
          <i class="iconfont" :class="item.img"></i>
          <div style="padding: .15rem 0">
            <p class="features-title">{{item.title}}</p>
            <p class="features-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--应用场景-->
    <div class="stageInfo">
      <div class="stageInfo-header">
        <img src="../../../assets/img/balance/Fill.png" style="width: .21rem;height: .19rem;">
        <h6>应用场景</h6>
        <img src="../../../assets/img/balance/Fill.png" style="width: .21rem;height: .19rem;">
      </div>
      <div class="stageInfo-content">
        <tab :line-width="2" active-color="#4A90E2">
          <tab-item selected @on-item-click="stageInfo.showYY=true,stageInfo.showSJ=false,stageInfo.showMJ=false">
            <h6 class="tab-item">专有网络</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true,stageInfo.showMJ=false">
            <h6 class="tab-item">WEB访问</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=false,stageInfo.showMJ=true">
            <h6 class="tab-item">混合云部署</h6>
          </tab-item>
        </tab>
        <div class="stageInfo-item">
          <div class="describe" v-if="stageInfo.showYY">
            <img src="../../../assets/img/vpc/stageInfo-zhuanshu.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.text" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="describe" v-if="stageInfo.showSJ">
            <img src="../../../assets/img/vpc/stageInfo-web.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.SJ.text" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="describe" v-if="stageInfo.showMJ">
            <img src="../../../assets/img/vpc/stageInfo-hunhe.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.MJ.text" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--产品优势-->
    <div class="advantage">
      <div class="advantage-header">
        <img src="../../../assets/img/balance/Fill.png" style="width: .21rem;height: .19rem;">
        <h6>产品优势</h6>
        <img src="../../../assets/img/balance/Fill.png" style="width: .21rem;height: .19rem;">
      </div>
      <div class="advantage-content">
        <div v-for="(item,index) in advantages" :key="index" class="item">
          <i class="iconfont" :class="item.img"></i>
          <div style="padding: .15rem 0">
            <p class="advantage-title">{{item.title}}</p>
            <p class="advantage-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--购买-->
    <router-link :to="$store.state.userInfo?'home':'login'" class="buy">立即购买</router-link>
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
          img: require('../../../assets/img/vpc/bg.png'),
          title: '虚拟私有云VPC',
          desc: '基于新睿云给用户构建隔离的、私密的虚拟网络环境，用户可以自由配置VPC内的IP地址范围、子网、路由表、安全组和网关等，用户可以申请弹性带宽和弹性IP搭建业务系统，同时也可以通过专线/VPN等接入方式实现云上VPC与传统IDC的互联，构建混合云系统。',
        },
        features: [
          {
            img: 'icon-wangluogeli',
            title: '网络隔离',
            desc: '利用Vlan/VxLAN协议使得VPC之间严格的逻辑隔离，实现租户间100%隔离。'
          },
          {
            img: "icon-zidingyiwangluo",
            title: '自定义网络',
            desc: '可自定义子网、IP地址段或DHCP等服务，也可自由组合。'
          },
          {
            img: 'icon-fangwenkongzhi',
            title: '访问控制',
            desc: '通过设置防火墙ACL策略，实现自定义端口和协议的控制。'
          },
          {
            img: 'icon-gongwangjieru',
            title: '公网接入',
            desc: '绑定公网IP到同一可用区下VPC内的云产品实例上，实现公网互通及相关网络功能。'
          },
          {
            img: 'icon-SNAT',
            title: 'NAT网关',
            desc: '在VPC环境下构建一个公网流量的出入口，通过自定义SourceNAT、DestinationNAT、StaticNAT规则灵活使用网络资源，同时支持多IP共享公网带宽。'
          },
          {
            img: 'icon-VPNwangguan',
            title: 'VPN网关',
            desc: 'VPN网关是通过互联网，采用IPsec加密技术，实现用户本地数据中心、用户办公网络与新睿云VPC之间安全可靠的连接，使用便捷灵活，即开即用，打造可伸缩的混合云环境。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          showMJ: false,
          YY: {
            text: ['基于新睿云构建的云上私有网络环境，用户通过弹性IP访问云上私有网络环境，配置部署业务。'],
          },
          SJ: {
            text: ['基大型网站常有上百个业务子模块，通过设置不同的转发规则/转发组，分析HTTP头部信息，有效分离业务模块，实现基于内容的路由转发。此外，用户通过自定义转发路径代替二级域名，有效减少 DNS 轮询次数，收敛 IP，提升用户访问速度，保证服务的高效运行。'],
          },
          MJ: {
            text: ['基于新睿云提供的VPN服务，高速连接云上VPC网络和用户自有IT设施，满足云上系统和自有设施间业务和数据的迁移，同时支持跨云业务等场景。'],
          }
        },
        advantages: [
          {
            img: 'icon-zuhujiangeli',
            title: '租户间100%隔离',
            desc: '利用Vlan/VxLAN协议使得VPC之间严格的逻辑隔离，实现租户间100%。'
          },
          {
            img: 'icon-yonghuzidingyi',
            title: '用户100%自定义',
            desc: '可自定义子网、IP地址段或DHCP等服务，也可自由组合。'
          },
          {
            img: 'icon-qiangdadeNATnengli',
            title: '强大的NAT能力',
            desc: '自定义Source NAT，Static NAT，Destination NAT，保证网络能力的灵活性。同时支持多IP共享公网带宽。'
          },
          {
            img: 'icon-qiangdadesiyouwangguan',
            title: '强大的私有网关',
            desc: '可以使用私有IP地址实现两个VPC之间的互通。'
          },
          {
            img: 'icon-hunheyunjiagou',
            title: '支持混合云架构',
            desc: '提供多种VPN，支持混合云和跨云能力。'
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
      padding: .46rem .23rem .4rem .39rem;
      justify-content: space-around;
      > div {
        width: 3.64rem;
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
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
      padding: .43rem 0;
      h6 {
        font-size: .36rem;
        color: rgba(74, 144, 226, 1);
        margin: 0 .2rem;
      }
    }
    .features-content {
      background: rgba(255, 255, 255, 1);
      .item {
        display: flex;
        padding: .24rem .3rem;
        border-bottom: 1px solid #e7e7e7;
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
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
      padding: .43rem 0;
      h6 {
        font-size: .36rem;
        color: rgba(74, 144, 226, 1);
        margin: 0 .2rem;
      }
    }
    .stageInfo-content {
      background: rgba(255, 255, 255, 1);
      .tab-item {
        font-size: .32rem;
        color: #333;
      }
      .stageInfo-item {
        background: rgba(255, 255, 255, 1);
        padding: .5rem .3rem .2rem .3rem;
        .describe {
          img {
            background-color: #FAFAFA;
            width: 100%;
            display: block;
            margin-bottom: .65rem;
          }
          h6 {
            font-size: .32rem;
            color: #333;
          }
          ul {
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
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
      padding: .43rem 0;
      h6 {
        font-size: .36rem;
        color: rgba(74, 144, 226, 1);
        margin: 0 .2rem;
      }
    }
    .advantage-content {
      background: rgba(255, 255, 255, 1);
      .item {
        display: flex;
        padding: .24rem .3rem;
        border-bottom: 1px solid #e7e7e7;
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

  .buy {
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
