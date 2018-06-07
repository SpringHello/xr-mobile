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
        <div class="stageInfo-item">
          <img src="">
          <div class="describe">
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
          title: '镜像服务',
          desc: '可以灵活便捷的使用公共镜像或私有镜像创建云服务器，具备完善的镜像管理能力。',
        },
        features: [
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '公共镜像',
            desc: '提供的常见的标准操作系统镜像，所有用户可见。包含操作系统以及预装的公共应用。用户根据实际情况自助配置应用环境或相关软件。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '私有镜像',
            desc: '用户基于ECS实例或者外部镜像文件创建的个人镜像，仅用户自己可见。包含操作系统、预装的公共应用以及用户的私有应用。选择私有镜像创建ECS，可以节省用户重复配置ECS的时间。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '共享镜像',
            desc: '包含操作系统、预装的公共应用以及用户的私有应用。共享镜像是某一个租户的私有镜像，只对拥有者及被共享者可见。用户可以选择共享镜像创建ECS。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '镜像市场',
            desc: '提供预装操作系统、应用环境和各类软件的优质第三方镜像。无需配置，可一键部署，满足建站、应用开发、可视化管理等个性化需求。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
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
            img: require('../../../assets/img/host/featrue.png'),
            title: '便捷',
            desc: '用户可通过运行的ECS或使用ECS系统磁盘的备份文件制作私有镜像,用户可通过镜像批量创建ECS。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '安全',
            desc: '整体系统采用专用的存储硬件，保证数据的99.999999999%可用性与持久性。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '灵活',
            desc: '用户可以通过控制台或开放API，完成对镜像的自定义管理。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '统一',
            desc: '通过自定义镜象，实现应用系统统一部署与升级，提高维护效率。保证应用环境的一致性， 简化升级维护。'
          },
          {
            img: require('../../../assets/img/host/featrue.png'),
            title: '丰富',
            desc: '种类繁多的镜像，实现快速部署操作系统与软件。'
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
            li {
              list-style: none;
              font-size: .6rem;
              color: #999;
              line-height: 1rem;
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
