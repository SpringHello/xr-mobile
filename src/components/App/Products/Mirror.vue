<template>
  <div class="mirror">
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
        <div class="stageInfo-item">
          <div class="describe">
            <img src="../../../assets/img/mirror/stageInfo-bg.png">
            <h6>企业应用</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.text" :key="index">{{item}}</li>
            </ul>
            <h6>优势</h6>
            <ul>
              <li v-for="(item,index) in stageInfo.YY.desc" :key="index">{{item}}</li>
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
          img: require('../../../assets/img/mirror/bg.png'),
          title: '镜像服务',
          desc: '可以灵活便捷的使用公共镜像或私有镜像创建云服务器，具备完善的镜像管理能力。',
        },
        features: [
          {
            img: 'icon-gonggongjingxiang',
            title: '公共镜像',
            desc: '提供的常见的标准操作系统镜像，所有用户可见。包含操作系统以及预装的公共应用。用户根据实际情况自助配置应用环境或相关软件。'
          },
          {
            img: 'icon-siyoujingxiang',
            title: '私有镜像',
            desc: '用户基于ECS实例或者外部镜像文件创建的个人镜像，仅用户自己可见。包含操作系统、预装的公共应用以及用户的私有应用。选择私有镜像创建ECS，可以节省用户重复配置ECS的时间。'
          },
          {
            img: 'icon-gongxiangjingxiang',
            title: '共享镜像',
            desc: '包含操作系统、预装的公共应用以及用户的私有应用。共享镜像是某一个租户的私有镜像，只对拥有者及被共享者可见。用户可以选择共享镜像创建ECS。'
          },
          {
            img: 'icon-jingxiangshichang',
            title: '镜像市场',
            desc: '提供预装操作系统、应用环境和各类软件的优质第三方镜像。无需配置，可一键部署，满足建站、应用开发、可视化管理等个性化需求。'
          },
          {
            img: 'icon-jingxiangguanli',
            title: '镜像管理',
            desc: '镜像的备份、删除，私有镜像的上传／下载／删除／共享，同时用户可以灵活使用公有镜像或者私有镜像创建ECS实例。'
          }
        ],
        stageInfo: {
          showYY: true,
          showSJ: false,
          showMJ: false,
          YY: {
            text: ['创建虚拟机：以已经完成安装和配置的镜像为模板，创建新的应用服务器，如批量创建ECS。', '迁移虚拟机：跨可用区域或跨VPC还原或迁移虚拟机实例。', '虚拟机备份：备份短期内不会更改的系统或应用，如已经完成发布或更新的应用系统。'],
            desc: ['便捷导入', '支持私有镜像的导入，业务灵活迁移', '统一部署', '快速批量部署ECS', '高持久性', '设计规格为99.999999999%持久性，镜像数据不丢失']
          }
        },

        advantages: [
          {
            img: 'icon-bianjie',
            title: '便捷',
            desc: '用户可通过运行的ECS或使用ECS系统磁盘的备份文件制作私有镜像,用户可通过镜像批量创建ECS。'
          },
          {
            img: 'icon-anquan',
            title: '安全',
            desc: '整体系统采用专用的存储硬件，保证数据的99.999999999%可用性与持久性。'
          },
          {
            img: 'icon-linghuo',
            title: '灵活',
            desc: '用户可以通过控制台或开放API，完成对镜像的自定义管理。'
          },
          {
            img: 'icon-tongyi',
            title: '统一',
            desc: '通过自定义镜象，实现应用系统统一部署与升级，提高维护效率。保证应用环境的一致性， 简化升级维护。'
          },
          {
            img: 'icon-fengfu',
            title: '丰富',
            desc: '种类繁多的镜像，实现快速部署操作系统与软件。'
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
            &:first-of-type {
              margin-bottom: .3rem;
            }
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
