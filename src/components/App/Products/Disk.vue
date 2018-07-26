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
          <div style="padding: .15rem 0;width: 84%;">
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
            <h6 class="tab-item">高性能计算</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true,stageInfo.showMJ=false">
            <h6 class="tab-item">数据仓库</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=false,stageInfo.showMJ=true">
            <h6 class="tab-item">关系型数据库</h6>
          </tab-item>
        </tab>
        <div class="stageInfo-item">
          <div class="describe" v-if="stageInfo.showYY">
            <img src="../../../assets/img/disk/stageInfo-gaoxingn.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.text" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="describe" v-if="stageInfo.showSJ">
            <img src="../../../assets/img/disk/stageInfo-guangxi.png">
            <h6>场景描述</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.SJ.text" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="describe" v-if="stageInfo.showMJ">
            <img src="../../../assets/img/disk/stageInfo-cangku.png">
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
          <div style="padding: .15rem 0;width: 84%;">
            <p class="advantage-title">{{item.title}}</p>
            <p class="advantage-desc">{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 1.2rem;"></div>
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
          img: require('../../../assets/img/disk/bg.png'),
          title: '云硬盘',
          desc: '云硬盘是为云服务器实例提供持久性块存储的服务，可以挂载到同一可用区下的云服务器实例上，云硬盘具有高可靠、高性能、灵活易用等特点，同时云硬盘支持在线操作和管理。',
        },
        features: [
          {
            img: 'icon-danxingguazai',
            title: '弹性挂载',
            desc: '云硬盘可自由挂载、卸载，无需关闭或重启服务器;云硬盘的容量可在线弹性配置，支持实时计费。'
          },
          {
            img: 'icon-zidongkuaizhao',
            title: '磁盘快照',
            desc: '磁盘快照能对云硬盘某个时刻的数据进行备份和回滚，磁盘快照为全量快照，用户可使用快照创建云硬盘，可批量快速部署或迁移业务。'
          },
          {
            img: 'icon-cipanbeifen',
            title: '磁盘克隆',
            desc: '对数据盘整体进行克隆和备份，备份数据存储在新睿云的对象存储里面，不占用租户云硬盘空间，用户可以通过克隆的云硬盘创建和原始硬盘一样的数据盘。'
          },
          {
            img: 'icon-linghuoguanli',
            title: '灵活管理',
            desc: '可以使用界面进行管理配置，操作简单易用。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          showMJ: false,
          YY: {
            text: ['高性能计算应用场景，部署分布式文件系统，如Lustre、GPFS，需要高性能存储的支持。建议选用超高IO云硬盘，满足大吞吐量、高读写速率需求。支持10万级IOPS，单盘最大容量达32TB。']
          },
          SJ: {
            text: ['数据读密集型应用场景，部署数据仓库，如Oracle RAC、SAP HANA。建议选用超高IO云硬盘，满足低延迟、高读写速率以及大吞吐量的应用需求。'],
          },
          MJ: {
            text: ['读写密集型应用场景，部署各类数据库，MongoDB、Oracle、SQL Server、MySQL 和PostgreSQL。建议选用超高IO云硬盘，满足低延迟、高读写速率需求。'],
          }
        },
        advantages: [
          {
            img: 'icon-gaokekaogaoxingneng',
            title: '高可靠高性能',
            desc: '自定义备份策略，保障数据安全可靠。超高 IOPS、超高吞吐，可根据业务需要灵活配置。'
          },
          {
            img: 'icon-darongliang',
            title: '大容量',
            desc: '提供超大容量块存储，可弹性扩容，支持按量付费，性价比高。'
          },
          {
            img: 'icon-guigefengfu',
            title: '规格丰富',
            desc: '提供普通IO、高IO、超高IO三种性能的硬盘，满足不同业务场景需求，单盘支持在线扩容，即买即用。'
          },
          {
            img: 'icon-dulichijiuhua',
            title: '独立持久化',
            desc: '设计规格为99.999999999%持久性，数据不丢失。'
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
        justify-content: space-between;
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
        justify-content: space-between;
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
