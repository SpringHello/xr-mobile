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
          <tab-item selected @on-item-click="stageInfo.showYY=true,stageInfo.showSJ=false,stageInfo.showMJ=false">
            <h6 class="tab-item">大流量门户</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true,stageInfo.showMJ=false">
            <h6 class="tab-item">音视频大流量</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=false,stageInfo.showMJ=true">
            <h6 class="tab-item">跨可用区同城容灾</h6>
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
          <div class="describe" v-if="stageInfo.showMJ">
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
          title: '负载均衡',
          desc: '弹性负载均衡将访问流量自动分发到多台云服务器上，扩展应用系统对外的服务能力，实现更高水平的应用容错。弹性负载均衡可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器上进行处理。',
        },
        features: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '多协议支持',
            desc: '支持互联网及内网流量的均衡服务，提供4层（TCP、UDP协议）和7层（HTTP、HTTPS协议）监听器。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '高可用',
            desc: '可用多种方法对后端服务器进行健康检查，自动屏蔽异常实例，确保业务可用性。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '灵活配置',
            desc: '可用多种方法对后端服务器进行健康检查，自动屏蔽异常实例，确保业务可用性。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '公网访问',
            desc: '通过绑定公网IP，可实现负载均衡的公网服务能力，也可以随时解绑公网IP，让负载均衡仅对内网流量进行均衡。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          showMJ: false,
          YY: {
            text: ['针对超多用户服务访问量高的特点，通过负载均衡将用户的访问流量均匀的分发到多个后端云主机上，确保业务快速平稳的运行。'],
          },
          SJ: {
            text: ['音视频应用中由于用户与主播之间需要实时大量的互动，因此，用户的流量非常大，而直播业务的波峰波谷效应明显，通过弹性负载均衡提高了系统的横向扩展能力，能够抵御海量流量，提升了业务的可用性和稳定性。'],
          },
          MJ: {
            text: ['弹性负载均衡可将流量跨可用区进行分发，建立实时的同城容灾机制，满足银行贸易等企业对系统的高可用性要求。'],
          }
        },
        advantages: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '灵活调度',
            desc: '支持多种调度算法，包括：轮询，源算法，最小连接数。用户可根据自身实际情况选择更适合的调度算法。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '健康检查',
            desc: '定期检查后端运行状况，如有发现宕机，则不再将流量转发到该后端，消除单点故障提升应用系统的可用性。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '大流量需求',
            desc: '支持最高10万并发连接，满足用户的大流量需求；支持用户使用4层（TCP协议）或7层（HTTP协议、HTTPS协议）的负载分发。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '会话保持',
            desc: '基于源IP、HTTP Cookie、Application Cookie 将同一客户端发送的多个请求。分发给同一后端服务器处理，保持请求处理逻辑的可持续性。'
          }
        ],
      }
    },
    methods:{
      buy(){
        if ($store.state.userInfo){
          this.$router.go(0)
        }else{
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
