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
            <h6 class="tab-item">多主机访问公网</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true">
            <h6 class="tab-item">共享宽带</h6>
          </tab-item>
        </tab>
        <div class="stageInfo-item">
          <img src="">
          <div class="describe" v-if="stageInfo.showYY">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.text" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="describe" v-if="stageInfo.showSJ">
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
          title: 'NAT网关',
          desc: '在VPC环境下构建一个公网流量的出入口，通过自定义SourceNAT、Destination NAT、StaticNAT规则灵活使用网络资源，支持多IP共享公网带宽。',
        },
        features: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: 'SNAT',
            desc: 'NAT网关提供SNAT功能，为VPC内无公网IP的主机实例提供访问互联网的代理服务。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: 'DNAT',
            desc: 'NAT网关支持DNAT功能，将NAT网关上的公网IP映射给ECS实例使用，使主机实例能够提供互联网服务。DNAT支持端口映射。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '共享带宽',
            desc: '多IP共享公网带宽，对于应用间存在流量错峰效应的业务，可有效降低带宽成本。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          YY: {
            text: ['VPC下多台ECS可以通过SNAT网关上的一个公网IP实现上网功能，同时保证这些ECS不暴露在公网上。'],
          },
          SJ: {
            text: ['VPC搭建多个应用，各应用都需要对外提供服务，且其波峰时间点不一致，多IP共享带宽，尽量减小波峰波谷效应从而降低成本。'],
          }
        },
        advantages: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '灵活易用的转发能力',
            desc: 'NAT网关提供SNAT和DNAT功能。无需用户自己搭建，功能灵活、简单易用、稳定可靠。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '高性能',
            desc: 'NAT网关采用SDN技术，支持10Gbps级别的转发能力，为大规模公网应用提供支撑。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '高可用',
            desc: 'NAT网关采用NFV技术，支持本地再生功能，可用性高。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '按需购买',
            desc: 'NAT网关的规格、带宽和公网IP，均可以随时升降，轻松应对业务变化。'
          }
        ],
      }
    },
    methods:{
      buy(){
        if ($store.state.userInfo){
          this.$router.push('login')
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .logo {
    height: 10rem;
    background: #081633;
    .logo-wrapper {
      display: flex;
      padding: 1rem .8rem;
      > div {
        width: 65%;
        .title {
          color: rgba(255, 255, 255, 1);
          font-size: .7rem;
          padding-bottom: .5rem;
        }
        .desc {
          font-size: .6rem;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

  }

  .features {
    background: rgba(243, 243, 243, 1);
    margin-bottom: .5rem;
    .features-header {
      text-align: center;
      font-size: 1.5rem;
      color: rgba(74, 144, 226, 1);
      border-bottom: 1px solid #D9D9D9;
      h6 {
        line-height: 3rem;
        &::before {
          content: '';
          width: .5rem;
          height: .5rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-right: .5rem;
        }
        &::after {
          content: '';
          width: .5rem;
          height: .5rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-left: .5rem;
        }
      }
    }
    .features-content {
      background: rgba(255, 255, 255, 1);
      .item {
        display: flex;
        padding: .5rem .8rem;
        border-bottom: 1px solid #D9D9D9;
        img {
          margin-right: .5rem;
        }
        .features-title {
          font-size: .8rem;
          color: rgba(34, 34, 34, 1);
          margin-bottom: .5rem;
        }
        .features-desc {
          font-size: .6rem;
          color: rgba(153, 153, 153, 1);
          line-height: 1rem;
          word-wrap: break-word;
        }
      }
    }
  }

  .stageInfo {
    background: rgba(243, 243, 243, 1);
    margin-bottom: .5rem;
    .stageInfo-header {
      text-align: center;
      font-size: 1.5rem;
      color: rgba(74, 144, 226, 1);
      border-bottom: 1px solid #D9D9D9;
      h6 {
        line-height: 3rem;
        &::before {
          content: '';
          width: .5rem;
          height: .5rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-right: .5rem;
        }
        &::after {
          content: '';
          width: .5rem;
          height: .5rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-left: .5rem;
        }
      }
    }
    .stageInfo-content {
      background: rgba(255, 255, 255, 1);
      .tab-item {
        font-size: .8rem;
        color: #333;
      }
      .stageInfo-item {
        background: rgba(250, 250, 250, 1);
        padding: .5rem .8rem;
        .describe {
          h6 {
            font-size: .8rem;
            color: #333;
            padding: .5rem 0;
          }
          ul {
            padding: .5rem 0;
            height: 5rem;
            li {
              list-style: none;
              font-size: .6rem;
              color: #999;
              &::before {
                content: '';
                width: .25rem;
                height: .25rem;
                background: #999;
                display: inline-block;
                border-radius: 50%;
                position: relative;
                bottom: .1rem;
                margin-right: .2rem;
              }
            }
          }
        }
        img {
          width: 15rem;
          height: 15rem;
        }
      }
    }
  }

  .advantage {
    background: rgba(243, 243, 243, 1);
    .advantage-header {
      text-align: center;
      font-size: 1.5rem;
      color: rgba(74, 144, 226, 1);
      border-bottom: 1px solid #D9D9D9;
      h6 {
        line-height: 3rem;
        &::before {
          content: '';
          width: .5rem;
          height: .5rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-right: .5rem;
        }
        &::after {
          content: '';
          width: .5rem;
          height: .5rem;
          border: 1px solid #4A90E2;
          display: inline-block;
          margin-left: .5rem;
        }
      }
    }
    .advantage-content {
      background: rgba(255, 255, 255, 1);
      .item {
        display: flex;
        padding: .5rem .8rem;
        border-bottom: 1px solid #D9D9D9;
        img {
          margin-right: .5rem;
        }
        .advantage-title {
          font-size: .8rem;
          color: rgba(34, 34, 34, 1);
          margin-bottom: .5rem;
        }
        .advantage-desc {
          font-size: .6rem;
          color: rgba(153, 153, 153, 1);
          line-height: 1rem;
          word-wrap: break-word;
        }
      }
    }
    .advantage-bottom {
      height: 3rem;
    }
  }

  button {
    font-size: .8rem;
    color: #FFF;
    background: #4A90E2;
    border: none;
    outline: none;
    width: 100%;
    padding: .9rem 0;
    text-align: center;
  }
</style>
