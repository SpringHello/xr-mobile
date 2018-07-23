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
          <tab-item selected @on-item-click="stageInfo.showYY=true,stageInfo.showSJ=false,stageInfo.showMJ=false">
            <h6 class="tab-item">普通应用</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true,stageInfo.showMJ=false">
            <h6 class="tab-item">数据分析</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=false,stageInfo.showMJ=true">
            <h6 class="tab-item">密集型应用</h6>
          </tab-item>
        </tab>
        <div class="stageInfo-item">
          <div class="describe" v-if="stageInfo.showYY">
            <img src="../../../assets/img/host/stageInfo-shujufenxi.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.text" :key="index">{{item}}</li>
            </ul>
            <h6>推荐方案</h6>
            <p>{{stageInfo.YY.desc}}</p>
          </div>
          <div class="describe" v-if="stageInfo.showSJ">
            <img src="../../../assets/img/host/stageInfo-shujufenxi.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.SJ.text" :key="index">{{item}}</li>
            </ul>
            <h6>推荐方案</h6>
            <p>{{stageInfo.SJ.desc}}</p>
          </div>
          <div class="describe" v-if="stageInfo.showMJ">
            <img src="../../../assets/img/host/stageInfo-yingyong.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.MJ.text" :key="index">{{item}}</li>
            </ul>
            <h6>推荐方案</h6>
            <p>{{stageInfo.MJ.desc}}</p>
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
          img: require('../../../assets/img/host/bg.png'),
          title: '弹性云服务器',
          desc: '弹性云服务器（(Elastic Compute Service,简称 ECS）是一种可随时自助获取，处理能力可弹性伸缩的计算服务，帮助用户构建可靠、安全、灵活、高效的应用环境，确保服务持久稳定运行，提升运维效率，降低用户的CAPEX和OPEX。',
        },
        features: [
          {
            img: 'icon-jisuannengli',
            title: '计算能力',
            desc: '提供多种规格、多种类型、多网卡的弹性云服务器，可满足用户不同的使用场景。'
          },
          {
            img: 'icon-danxingjisuan',
            title: '弹性计算',
            desc: '根据业务需求，可弹性创建与释放云服务器，轻松应对业务的快速变化。'
          },
          {
            img: 'icon-cunchunengli',
            title: '存储能力',
            desc: '支持云硬盘挂载与备份，通过挂载不同类型云硬盘以实现主机存储能力的快速扩展。'
          },
          {
            img: 'icon-fengfu',
            title: '丰富的镜像',
            desc: '支持公共系统镜像、服务集成镜像、自定义镜像和用户本地镜像，自定义镜像让您可以随时备份或批量创建云服务器。'
          },
          {
            img: 'icon-beifenyukuaizhao',
            title: '备份与快照',
            desc: '快照能对云服务器某个时刻的数据进行备份和回滚，且快照为全量快照，提升了安全性的同时，降低了快照的管理难度。'
          },
          {
            img: 'icon-qiangdadeNATnengli',
            title: '强大的网络功能',
            desc: '提供安全、稳定、高速、隔离的网络连接，具有VPC功能，帮助用户构建虚拟私有云，支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。'
          },
          {
            img: 'icon-kuaisuhuoqu',
            title: '云监控',
            desc: '提供开放的云监控服务平台，提供资源的实时监控、告警、通知等服务。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          showMJ: false,
          YY: {
//            img: require(''),
            text: ['轻量级企业业务应用，', '访问量维持在一个较低的水平', '对服务器没有特殊要求', '追求稳定性与性价比'],
            desc: '推荐使用标准型云服务器，主要提供均衡的计算、内存和网络资源，适用于业务负载压力适中的应用场景，满足企业或个人普通业务上云需求。'
          },
          SJ: {
//            img: require(''),
            text: ['中量级业务应用', '对运行速度与内存要求提高', '需要应对大容量数据处理'],
            desc: '推荐使用内存优化型弹性云服务器，主要提供高内存实例，同时可以配置超高IO的云硬盘和合适的带宽，适合用于处理数据量大并且数据访问量大的应用场景。'
          },
          MJ: {
//            img: require(''),
            text: ['大数据分析、CDN/Cache等I/O密集型业务场景', '搭配高性能磁盘', '更好的支持高I/O并发和保证数据可靠性'],
            desc: '推荐使用超高性能型磁盘的弹性云服务器，主要适用于需要对本地存储上的大型数据集进行高性能读写访问。'
          }
        },
        advantages: [
          {
            img: 'icon-kuaisuhuoqu',
            title: '快速获取',
            desc: '强大的计算和存储资源池，用户可便捷、快速的获取相应云计算服务，能快速实现云服务器的批量创建。'
          },
          {
            img: 'icon-mobanchuangjian',
            title: '模板创建',
            desc: '可依据当前主机的镜像批量生成新的主机。'
          },
          {
            img: 'icon-danxingshensuo',
            title: '弹性伸缩',
            desc: '性能与规格弹性伸缩，满足业务弹性变化的需求。'
          },
          {
            img: 'icon-yijianhuifu',
            title: '一键恢复',
            desc: '一键生成备份镜像，可随时恢复到某一个备份点。'
          },
          {
            img: 'icon-shishijiankong',
            title: '实时监控',
            desc: '历史数据与实时数据双向监控，为您的性能保驾护航。'
          },
          {
            img: 'icon-huaban',
            title: '在线迁移',
            desc: '云服务器业务不中断，可以在同一可用区下实现热迁移。'
          }
        ],
      }
    },
    methods: {}
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
          vertical-align: middle;
          content: url('../../../assets/img/balance/Fill.png');
          width: .21rem;
          margin-right: .2rem;
        }
        &::after {
          vertical-align: middle;
          content: url('../../../assets/img/balance/Fill.png');
          width: .21rem;
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
          vertical-align: middle;
          content: url('../../../assets/img/balance/Fill.png');
          width: .21rem;
          margin-right: .2rem;
        }
        &::after {
          vertical-align: middle;
          content: url('../../../assets/img/balance/Fill.png');
          width: .21rem;
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
          }
          h6 {
            font-size: .32rem;
            color: #333;
          }
          ul {
            height: 3rem;
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
          p {
            height: 1.5rem;
            font-size: .2rem;
            color: #999;
            margin-bottom: .3rem;
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
          vertical-align: middle;
          content: url('../../../assets/img/balance/Fill.png');
          width: .21rem;
          margin-right: .2rem;
        }
        &::after {
          vertical-align: middle;
          content: url('../../../assets/img/balance/Fill.png');
          width: .21rem;
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
