<template>
  <div style="background:rgba(245,245,245,1);">
    <!--顶部logo-->
    <x-header :left-options="{backText: '',showBack: false}" :right-options="{showMore: true}"
              @on-click-more="ClikcMore">
      <a slot="left">
        <img src="../assets/img/home/logo.png" style="width: 1.86rem;"></a>
    </x-header>

    <!--走马灯-->
    <swiper :list="swiperList" dots-position="center" :auto="true" :interval="5000"></swiper>
    <!--走马灯下方介绍-->
    <div class="banner-introduce">
      <div class="grid">
        <router-link v-for="(item,index) in introduce" :key="index" :to="item.url">
          <div class="grid-item">
            <img :src="item.img">
            <p>{{item.title}}</p>
          </div>
        </router-link>
      </div>
    </div>

    <!--产品模块-->
    <div class="product-wrapper">
      <div class="product-header">
        <p>云产品目录</p>
      </div>
      <div class="product-content">
        <div v-for="product in productList" class="product-content-item"
             :class="{'product-content-item-active':product.opened}">
          <div class="product-item-header" @click="product.opened=!product.opened">
            <div>
              <img style="font-size: 0px" :src="product.img">
              <p>{{product.title}}</p>
            </div>
            <span></span>
          </div>
          <div class="product-item-content" v-show="product.opened">
            <ul>
              <router-link v-for="(item,index) in product.prodItem" :key="index" :to="item.path">
                <li class="item">
                  <div>
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                  </div>
                  <p class="item-check" v-show="item.path != ''">查看详情</p>
                </li>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--数据中心-->
    <div class="data-wrapper">
      <div class="data-header">
        <p>数据中心 <span> 五星级数据中心，与各骨干网络互联互通</span></p>
      </div>
      <img src="../assets/img/home/sjzx.png">
    </div>

    <!--权威认证-->
    <div class="authority-wrapper">
      <div class="authority-header">
        <p>权威认证</p>
      </div>
      <ul>
        <li v-for="(item,index) in authoritys" class="item">
          <img :src="item.img">
          <p class="item-desc">{{item.desc}}</p>
        </li>
      </ul>
    </div>

    <!--合作伙伴-->
    <div class="partner-wrapper">
      <div class="partner-header">
        <p>合作伙伴</p>
      </div>
      <div class="item">
        <div v-for="(item,index) in partners" style="width:25%;position: relative;height:1rem;">
          <img :src="item.img" :style="{width:`${item.width}rem`}">
        </div>
      </div>
    </div>

    <!--support-->
    <div class="support-wrapper">
      <div class="item" v-for="(item,index) in support" :key="index">
        <div>
          <img :src="item.img">
          <div>
            <p class="item-title">{{item.title}}</p>
            <p class="item-subtitle">{{item.subTitle}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--页尾-->
    <div class="footer-wrapper">
      <div class="foot-one">
        <img src="../assets/img/home/QR-code.jpg">
        <div class="foot-one-right">
          <h6>联系我们</h6>
          <p>400-0505-565</p>
          <span>service@unionstech.cn</span>
          <span>北京市海淀区东升大厦AB座611、612</span>
        </div>
      </div>
      <div class="foot-two">
        <p>Copyright © 2014-2017 <img src=""><span> 京ICP备15035854号</span></p>
        <p>北京允睿讯通科技有限公司</p>
      </div>
    </div>

    <div style="height: 1rem;"></div>

    <div class="mask" :class="{opened:showMask}" ref="mask"
         style="position:absolute;top:46px;width:100%;overflow: hidden">
      <div>
        <ul v-for="(item,index) in moreMenus" :key="index">
          <li class="title" @click="item.open=!item.open">
            <p>{{item.title}}<span v-show="index==0" :class="{topTo:item.open}"></span></p>
          </li>
          <div v-show="item.open">
            <li v-for="(menu,index) in item.menu" :key="index">
              {{menu.name}}
              <p>
                <router-link v-for="(sub,index) in menu.subname" :key="index" :to="sub.url">
                  {{sub.product}}
                </router-link>
              </p>
            </li>
          </div>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
  import {
    Swiper,
    XButton,
    Tab,
    TabItem,
    Scroller,
    XHeader,
    Grid,
    GridItem,
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'
  import axios from '@/util/iaxios'
  export default {
    components: {
      Swiper,
      XButton,
      Tab,
      TabItem,
      Scroller,
      XHeader,
      Grid,
      GridItem,
      XDialog,
      TransferDom,
    },
    beforeRouteEnter(to, from, next){
      next()
    },
    data () {
      window.scrollTo(0, 0);
      return {
        //菜单
        moreMenus: [
          {
            title: '产品',
            open: true,
            menu: [
              {
                name: '云计算',
                subname: [
                  {product: '云服务器', url: 'host'},
                  {product: '镜像服务', url: 'mirror'},
                  {product: 'ECS快照', url: 'ecsSnapshot'},
                ]
              },
              {
                name: '云网络',
                subname: [
                  {product: '虚拟私有云VPC', url: 'vpc'},
                  {product: '弹性IP', url: 'elasticip'},
                  {product: '负载均衡', url: 'balance'},
                  {product: 'NAT网关', url: 'natgateway'},
                  {product: '虚拟专网VPN', url: 'virtualvpn'},
                ]
              }
            ]
          },
          {title: '动态'},
          {title: '关于'},
          {title: '文档'},
        ],
        // 轮播图资料
        swiperList: [
          {
            url: 'javascript:',
            img: require('../assets/img/home/banner-1.png')
          },
          {
            url: 'javascript:',
            img: require('../assets/img/home/banner-2.png')
          },
          {
            url: 'javascript:',
            img: require('../assets/img/home/banner-3.png'),
            fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
          }
        ],
        // 走马灯下方介绍
        introduce: [
          {img: require('../assets/img/home/itr-1.png'), title: "云服务器", url: "/host"},
          {img: require('../assets/img/home/itr-2.png'), title: "云硬盘", url: "/disk"},
          {img: require('../assets/img/home/itr-3.png'), title: "负载均衡", url: "/balance"},
          {img: require('../assets/img/home/itr-4.png'), title: "弹性IP", url: "/elasticip"}
        ],
        // 产品资料
        productList: [
          {
            title: '云计算',
            opened: false,
            img: require('../assets/img/home/pro-jisuan.png'),
            prodItem: [
              {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: '/host'},
              {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: '/mirror'},
              {title: 'ECS快照', desc: '稳定可靠、安全保障', path: '/ecsSnapshot'},
              {title: '裸金属服务器（敬请期待）', desc: '专属物理服务器', path: ''},
              {title: '弹性伸缩（敬请期待）', desc: '高可用、可视化、低成本', path: ''}
            ]
          }, {
            title: '云存储',
            opened: false,
            img: require('../assets/img/home/pro-cunchu.png'),
            prodItem: [
              {title: '云硬盘', desc: '性能型、超高性能型、存储型', path: '/disk'},
              {title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: '/diskbackup'}
            ]
          }, {
            title: '云数据库',
            opened: false,
            img: require('../assets/img/home/pro-shujuku.png'),
            prodItem: [
              {title: '虚拟私有云VPC', desc: '网络隔离、分配子网', path: '/vpc'},
              {title: '弹性IP', desc: '绑定与解绑IP、扩容', path: '/elasticip'},
              {title: '负载均衡', desc: '源算法、轮询、最小连接数', path: '/balance'},
              {title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: '/natgateway'},
              {title: '虚拟专网VPN', desc: '跨VPC链接', path: '/virtualvpn'},
              {title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: ''}
            ]
          }, {
            title: '云运维',
            opened: false,
            img: require('../assets/img/home/pro-yunwei.png'),
            prodItem: [
              {title: '云监控', desc: '自定义监控项、多告警推送方式', path: '/cloudmonitoring'},
              {title: '访问控制（敬请期待）', desc: '权限管理、精准控制', path: ''}
            ]

          }, {
            title: '云安全',
            opened: false,
            img: require('../assets/img/home/pro-anquan.png'),
            prodItem: [
              {title: '防火墙', desc: '自定义规则、协议、端口', path: '/firewall'},
              {title: 'DDOS高防IP', desc: '硬件防护、40G超大流量', path: '/ddos'}
            ]

          }
        ],
        // 权威认证
        authoritys: [
          {img: require('../assets/img/home/renzheng-1.png'), desc: '中国高新技术企业'},
          {img: require('../assets/img/home/renzheng-2.png'), desc: '中关村高新技术企业'},
          {img: require('../assets/img/home/renzheng-3.png'), desc: 'ISO27001企业认证'},
          {img: require('../assets/img/home/renzheng-4.png'), desc: 'ISO9001企业认证'},
          {img: require('../assets/img/home/renzheng-5.png'), desc: '华为云管理网络ISV'}
        ],
        //合作伙伴
        partners: [
          {img: require('../assets/img/home/partner-dell.png'), width: 0.6},
          {img: require('../assets/img/home/partner-huawei.png'), width: 0.6},
          {img: require('../assets/img/home/partner-cooce.png'), width: .68},
          {img: require('../assets/img/home/partner-telecom.png'), width: 1.2},
          {img: require('../assets/img/home/partner-sugon.png'), width: 1.2},
          {img: require('../assets/img/home/partner-hitachi.png'), width: 1.2},
          {img: require('../assets/img/home/partner-unicom.png'), width: .87},
          {img: require('../assets/img/home/partner-vmware.png'), width: 1.2}
        ],
        //
        support: [
          {img: require('../assets/img/home/suport-1.png'), title: '7*24', subTitle: '多渠道服务与支持'},
          {img: require('../assets/img/home/suport-2.png'), title: '意见', subTitle: '反馈与投诉建议'},
          {img: require('../assets/img/home/suport-3.png'), title: '1V1', subTitle: '专项服务'},
          {img: require('../assets/img/home/suport-4.png'), title: '退款', subTitle: '7天无理由退款'}
        ],
        showMask: false
      }
    },
    methods: {
      ClikcMore(){
        this.showMask = !this.showMask
        if (this.showMask) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
      },
      push(url){
        this.DialogStyle = false
        this.$router.push(url)
      }
    },
    beforeRouteLeave(to, from, next){
      document.body.style.overflow = 'auto'
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  /*顶部介绍条*/
  .vux-header {
    background: linear-gradient(180deg, rgba(44, 45, 49, 1), rgba(16, 16, 19, 1));
  }

  .banner-introduce {
    background-color: #fff;
    margin-bottom: .2rem;
    .grid {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .22rem .27rem .25rem;
      a {
        width: 50%;
      }
      p {
        font-size: .24rem;
        color: #888;
        text-align: center;
      }
      img {
        display: block;
        width: 0.64rem;
        margin: 0 auto;
        padding-bottom: .09rem;
      }
    }
  }

  //云产品目录
  .product-wrapper {
    background-color: #fff;
    margin-bottom: .2rem;
    .product-header {
      font-size: .36rem;
      color: #222;
      padding: .21rem .27rem;
      border-bottom: 1px solid #e7e7e7;
    }
    .product-content {
      .product-content-item {
        .product-item-header {
          font-size: 0px;
          padding: .21rem .27rem;
          border-bottom: 1px solid #e7e7e7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          > div {
            display: flex;
            align-items: center;
            img {
              width: .64rem;
              height: .64rem;
              margin-right: .2rem;
            }
            p {
              line-height: .64rem;
              font-size: 0.32rem;
            }
          }
          span {
            display: block;
            border-bottom: 1px solid #C7C7CC;
            border-right: 1px solid #C7C7CC;
            width: .2rem;
            height: .2rem;
            transform: translate(-.1rem, -.05rem) rotate(-315deg);
          }
        }
        .product-item-content {
          background: rgba(245, 245, 245, 1);
          border-bottom: 1px solid #e7e7e7;
          ul {
            background-color: #FAFAFA;
            .item {
              /*border-bottom: 1px solid #e7e7e7;*/
              list-style: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: .24rem .3rem;
              > div {
                .item-title {
                  font-size: .28rem;
                  color: rgba(51, 51, 51, 1);
                }
                .item-desc {
                  font-size: .24rem;
                  color: rgba(153, 153, 153, 1);
                }
              }
              .item-check {
                font-size: .28rem;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
        }
      }
      .product-content-item-active {
        .product-item-header {
          p {
            color: #4A90E2;
          }
          span {
            border-bottom: 1px solid #4A90E2;
            border-right: 1px solid #4A90E2;
            transform: translate(-.1rem, .1rem) rotate(225deg);
          }
        }
      }
    }
  }

  //数据中心
  .data-wrapper {
    background-color: #fff;
    margin-bottom: .2rem;
    .data-header {
      padding: .24rem .3rem;
      border-bottom: 1px solid #e7e7e7;
      p {
        font-size: .36rem;
        color: #222;
        span {
          color: rgba(136, 136, 136, 1);
          margin-left: .2rem;
          font-size: 0.2rem;
          color: #888888;
          display: inline-block;
          vertical-align: middle;
          line-height: 35px;
        }
      }
    }
    img {
      display: block;
      width: 100%;
      padding: .24rem 0;
    }
  }

  //权威认证
  .authority-wrapper {
    background-color: #fff;
    margin-bottom: .2rem;
    .authority-header {
      font-size: .36rem;
      color: #222;
      padding: .24rem .3rem;
      border-bottom: 1px solid #e7e7e7;
    }
    ul {
      .item {
        padding: .21rem .27rem;
        list-style: none;
        border-bottom: 1px solid #e7e7e7;
        font-size: 0px;
        img {
          vertical-align: middle;
          width: .64rem;
          margin-right: .2rem;
        }
        .item-desc {
          display: inline-block;
          font-size: .28rem;
          color: rgba(51, 51, 51, 1);
          vertical-align: middle;
          /*&::after {*/
          /*content: '';*/
          /*border-bottom: 1px solid #999;*/
          /*border-right: 1px solid #999;*/
          /*width: .5rem;*/
          /*height: .5rem;*/
          /*display: inline-block;*/
          /*position: absolute;*/
          /*right: 1.3rem;*/
          /*transform-origin: 50% 50%;*/
          /*transform: translateY(.3rem) rotate(311deg);*/
          /*}*/
        }
      }
    }
  }

  //合作伙伴
  .partner-wrapper {
    background-color: #fff;
    margin-bottom: .2rem;
    .partner-header {
      font-size: .36rem;
      color: #222;
      padding: .24rem .3rem;
      border-bottom: 1px solid #e7e7e7;
    }
    .item {
      padding: .4rem .59rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  //support
  .support-wrapper {
    background-color: #fff;
    padding: .23rem .87rem 0 .87rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .item {
      font-size: 0px;
      padding-bottom: .25rem;
      width: 50%;
      div {
        img {
          vertical-align: middle;
          margin-right: .23rem;
          width: .4rem;
          display: inline-block;
        }
        div {
          text-align: left;
          vertical-align: middle;
          display: inline-block;
          p {
            font-size: .2rem;
          }
        }
      }

    }
  }

  //首页页尾
  .footer-wrapper {
    background: rgba(67, 67, 67, 1);
    .foot-one {
      border-bottom: 1px solid #666;
      padding: .33rem .6rem .38rem .6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border: 2px solid rgba(125, 161, 217, 1);
        width: 1.6rem;
        height: 1.6rem;
        padding: .05rem;
        margin-right: .5rem;
      }
      .foot-one-right {
        h6 {
          font-weight: normal;
          font-size: .32rem;
          color: rgba(255, 255, 255, 1);
        }
        p {
          color: rgba(125, 161, 217, 1);
          font-size: .36rem;
        }
        span {
          display: block;
          font-size: .24rem;
          color: rgba(255, 255, 255, 1);
          &:last-of-type {
            font-size: .2rem;
          }
        }
      }
    }
    .foot-two {
      padding: .18rem 0 .22rem 0;
      text-align: center;
      font-size: .2rem;
      color: rgba(255, 255, 255, 0.5);
      img {
        padding-left: .3rem;
        width: .2rem;
      }
    }
  }

  .mask {
    transition: bottom .5s;
    bottom: 100%;
    background: rgba(51, 51, 51, .98);
    z-index: 1000000;
    > div {
      margin: .22rem .24rem 0 .24rem;
      color: rgba(255, 255, 255, 1);
      ul {
        .title {
          list-style: none;
          padding-bottom: .16rem;
          border-bottom: 1px solid #202023;
          p {
            font-size: .28rem;
            color: rgba(255, 255, 255, 1);
            line-height: .4rem;
            span {
              float: right;
              width: .14rem;
              height: .14rem;
              border-right: 1px solid #FFF;
              border-bottom: 1px solid #FFF;
              transform: translate(-.1rem, .1rem) rotate(-315deg);
            }
            .topTo {
              transform: translate(-.1rem, .2rem) rotate(225deg);
            }
          }
        }
        > div {
          padding-top: .16rem;
          li {
            list-style: none;
            font-size: .28rem;
            line-height: .33rem;
            p {
              padding: .21rem 0 0 .4rem;
              a {
                display: block;
                font-size: .24rem;
                line-height: .33rem;
                color: rgba(255, 255, 255, 1);
                padding-bottom: .16rem;
              }

            }
          }
        }
      }
    }

  }

  .opened {
    bottom: 0rem;
  }
</style>

