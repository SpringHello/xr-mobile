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
            <h6 class="tab-item">日常巡检</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true">
            <h6 class="tab-item">告警通知</h6>
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
          title: '云监控',
          desc: '新睿云监控告警服务主要用图表化信息帮助您了解云服务器运行状况和性能。告警推送消息帮助您第一时间了解业务异常，让您无需额外开发，就能全面掌控云服务器资源使用、运行情况。',
        },
        features: [
          {img: require('../../../assets/img/host/featrue.png'), title: '数据自动分析计算', desc: '拥有强大的后台处理集群，自动汇总、聚合、统计数据，统计分析后的数据存入数据库，以此作为基础数据给用户展示使用。'},
          {img: require('../../../assets/img/host/featrue.png'), title: '丰富的图标展现形式', desc: '除支持单实例查看多个指标数据；还能单实例多天对比趋势查看，以及选择某个维度聚合查看图表。'},
          {img: require('../../../assets/img/host/featrue.png'), title: '自定义配置', desc: '除了新睿云提供的基础告警阈值外，可以根据不同业务需求自定义配置监控告警阈值。新睿云在控制台-用户中心提供了方便的入口，简单的操作，方便用户配置。'},
          {img: require('../../../assets/img/host/featrue.png'), title: '异常告警通知', desc: '用户对某个指标特别关注，则可使用提供的告警通知功能。不必每时每刻都关注指标，只用先配置好告警阈值条件，则指标异常后第一时间自动通过邮件、短信方式通知到用户。'}
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          YY: {
            text: ['若您在日常巡检操作中，想全面掌控各个云产品的整体状况：浏览云监控控制台，云服务器产品监控视图，如果 CPU 使用率为业务关键指标，则选择该列点击排序。此排序是最近 5 分钟内的实时监控数据，能看出在最近 5 分钟内，哪台云服务器 CPU 使用率最高、哪台云服务器 CPU使用率最低、相差多少，对比查看下，即可发现异常。若想查看历史某天异常云服务器，则选择时间，以关键指标排序找出异常云服务器。一天的指标数据取当天所有监控周期的最大值。'],
          },
          SJ: {
            text: ['新睿云监控告警平台为您提供7X24小时监控告警能力。登录控制台，进入主机管理，配置告警策略。在告警策略列表页，选择修改告警触发条件，关联告警对象和配置告警接收人。满足告警触发条件后，新睿云监控将在第一时间通知告警接收人。'],
          },
        },
        advantages: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '自动开通',
            desc: '无需特意购买和开通，申请云服务器，便自动开通了监控告警服务，方便您在购买和使用云服务器后直接查看运行状态。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '多指标监控',
            desc: '为您提供了云服务器 CPU 利用率、内存利用率、磁盘利用率以及弹性IP弹性流量等各项负载和性能指标，通过直观图表展示出来。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '自定义告警阈值',
            desc: '支持配置多种指标的告警触发阈值。自定义告警接收人和发送渠道。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '零费用',
            desc: '完全免费使用；存储、计算均无需花费；帮您管理数据，自动展示图表。'
          }
        ],
      }
    },
    methods:{
      buy(){
        if ($store.state.userInfo){
          this.$router.push('login')
        }else{
          this.$router.go(0)
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
            height:10rem;
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
