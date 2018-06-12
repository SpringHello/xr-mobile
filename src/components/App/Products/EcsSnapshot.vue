<template>
  <div class="ecsSnapshot">
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
            <h6 class="tab-item">定期数据备份</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=true,stageInfo.showMJ=false">
            <h6 class="tab-item">临时数据备份</h6>
          </tab-item>
          <tab-item @on-item-click="stageInfo.showYY=false,stageInfo.showSJ=false,stageInfo.showMJ=true">
            <h6 class="tab-item">系统盘扩容</h6>
          </tab-item>
        </tab>
        <div class="stageInfo-item">
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
          title: 'ESC 快照',
          desc: 'ECS快照能对云服务器某个时刻的数据进行备份和回滚，且ECS快照为全量快照，提升了安全性的同时，降低了ECS快照的管理难度。',
        },
        features: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '自动快照',
            desc: '自动为用户创建快照。用户需要首先创建自动快照策略，然后再把自动快照策略应用到虚拟机实例或磁盘上，系统按照策略自动为该虚拟机或磁盘创建快照。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '手动快照',
            desc: '由用户手动创建。可以根据需要，手动为虚拟机实例或磁盘创建快照，作为数据备份。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '磁盘克隆恢复',
            desc: '用户可以通过克隆的云硬盘创建和原始硬盘一样的数据盘。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          showMJ: false,
          YY: {
            text: ['按照设定的周期，每日、每周或每月自动执行快照策略对数据进行备份。'],
            desc: ''
          },
          SJ: {
            text: ['系统更新、应用发布等系统临时变更，为防止操作错误，在执行变更前手工创建快照对系统进行备份。'],
            desc: ''
          },
          MJ: {
            text: ['磁盘数据迁移，通过对磁盘执行快照，将磁盘作为新建磁盘的基础数据。'],
            desc: ''
          }
        },
        advantages: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '全量备份',
            desc: '新睿云的快照为全量快照的方式，各快照可以独立存在，方便灵活使用和管理。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '支持CPU/内存快照',
            desc: '可将ECS的内存状态进行快照，回滚时有利于业务的快速恢复。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '支持ECS静默',
            desc: '可暂停或改变在ECS上运行的进程的状态，特别是在备份过程中修改存储在磁盘上的信息的进程，以保证一致的可用备份。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '快照单独存储',
            desc: '快照单独存储于新睿云提供的对象存储中，不占用用户的磁盘空间。'
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
