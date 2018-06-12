<template>
  <div style="margin-bottom: 2.25rem;background:rgba(245,245,245,1);">
    <!--顶部logo-->
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">首页</x-header>
    <div class="topNav">
      <img class="top-logo" src="../assets/img/home/logo.png">
      <!--<div class="logo-right" @click="DialogStyle = true">
        <span class="span"></span>
        <span class="span"></span>
        <span class="span"></span>
      </div>-->
    </div>
    <div v-if="DialogStyle" class="showMenu">
      <ul>
        <li v-for="(item,index) in titleItem" :key="index">
          <div @click="item.open=!item.open"><p class="ftitle">{{item.title}}</p></div>
          <div class="showItem" v-show="item.open">
            <div v-for="(subItem,index) in item.content" :key="index">
              <p class="ntitle">{{subItem.prod}}</p>
              <ol>
                <li v-for="(content,index) in subItem.prodItem" @click="push(content.path)">{{content.title}}</li>
              </ol>
            </div>
          </div>
        </li>
      </ul>
    </div>

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
            <!--<img style="font-size: 0px" :src="product.img">-->
            <p>{{product.title}}</p>
            <!--<span>gekki</span>-->
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
        <img v-for="(item,index) in partners" :src="item">
      </div>
    </div>

    <!--support-->
    <div class="support-wrapper">
      <div class="item">
        <div v-for="(item,index) in support" :key="index" style="width: 50%">
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
        <img src="">
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

    <!--动态-->
    <!--<div class="dynamic-wrapper">-->
    <!--<h6 class="title">新睿云动态</h6>-->
    <!--<tab :line-width="2" active-color="#00aaff" custom-bar-width="80%">-->
    <!--<tab-item selected @on-item-click="dynamicContent.showNews = false ,dynamicContent.showOffices = true">官方公告-->
    <!--</tab-item>-->
    <!--<tab-item @on-item-click="dynamicContent.showNews = true ,dynamicContent.showOffices = false">业界新闻</tab-item>-->
    <!--</tab>-->
    <!--<div class="dynamic-content">-->
    <!--<ul v-if="dynamicContent.showOffices">-->
    <!--<li v-for="(item,index) in dynamicContent.offices"-->
    <!--@click="$router.push({path:'dynamic',query:{id:item.id,type:item.type}})">-->
    <!--<h6 class="dynamic-content-item-title">{{item.title}}</h6><span class="item-time">{{item.createtime}}</span>-->
    <!--</li>-->
    <!--</ul>-->
    <!--<ul v-if="dynamicContent.showNews">-->
    <!--<li v-for="(item,index) in dynamicContent.News">-->
    <!--<h6 class="dynamic-content-item-title"-->
    <!--@click="$router.push({path:'dynamic',query:{id:item.id,type:item.type}})">{{item.title}}</h6><span-->
    <!--class="item-time">{{item.createtime}}</span>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->

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
    data () {
      return {
        DialogStyle: false,
        titleItem: [
          {
            title: '产品',
            path: '',
            open: false,
            content: [
              {
                prod: '云计算',
                prodItem: [
                  {title: '弹性云服务器（ECS）', path: '/host'},
                  {title: '镜像服务', path: '/mirror'},
                  {title: 'ECS快照', path: '/ecsSnapshot'},
                ]
              },
              {
                prod: '云网络',
                prodItem: [
                  {title: '虚拟私有云VPC', path: '/vpc'},
                  {title: '弹性IP', path: '/elasticip'},
                  {title: '负载均衡', path: '/balance'},
                  {title: 'NAT网关', path: '/natgateway'},
                  {title: '虚拟专网VPN', path: '/virtualvpn'},
                ]
              },
            ]
          },
          {
            title: '动态',
            path: '',
            open: false,
          },
          {
            title: '关于',
            path: '',
            open: false,
          },
          {
            title: '文档',
            path: '',
            open: false,
          },
        ], // banner item
        // 轮播图资料
        swiperList: [
          {
            url: 'javascript:',
            img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
          },
          {
            url: 'javascript:',
            img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'
          },
          {
            url: 'javascript:',
            img: 'https://static.vux.li/demo/5.jpg',
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
          require('../assets/img/home/partner-dell.png'),
          require('../assets/img/home/partner-huawei.png'),
          require('../assets/img/home/partner-cooce.png'),
          require('../assets/img/home/partner-telecom.png'),
          require('../assets/img/home/partner-sugon.png'),
          require('../assets/img/home/partner-hitachi.png'),
          require('../assets/img/home/partner-unicom.png'),
          require('../assets/img/home/partner-vmware.png'),
        ],
        //
        support: [
          {img: require('../assets/img/home/suport-1.png'), title: '7*24', subTitle: '多渠道服务与支持'},
          {img: require('../assets/img/home/suport-2.png'), title: '意见', subTitle: '反馈与投诉建议'},
          {img: require('../assets/img/home/suport-3.png'), title: '1V1', subTitle: '专项服务'},
          {img: require('../assets/img/home/suport-4.png'), title: '退款', subTitle: '7天无理由退款'}
        ],
        //动态集合
//        dynamicContent: {
//          showOffices: true,
//          showNews: false,
//          offices: [],
//          News: [],
//        },
      }
    },
    methods: {
      push(url){
        this.DialogStyle = false
        this.$router.push(url)
      }
//      setData(response){
//        if (response.status == 200 && response.data.status == 1) {
//          this.dynamicContent.offices = response.data.result.announcement_list
//          this.dynamicContent.News = response.data.result.news_list
//        }
//      },
    },
    beforeRouteEnter(to, from, next){
      axios.get('user/getAnnouncement.do', {
        params: {
          listAll: -1,
        }
      }).then(response => {
        next(vm => {
//          vm.setData(response)
        })
      })

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

  /*顶部介绍条*/
  .vux-header {
    background: linear-gradient(180deg, rgba(44, 45, 49, 1), rgba(16, 16, 19, 1));
  }

  /*顶部导航*/
  .topNav {
    height: 0.96rem;
    //padding: .5rem .2rem;
    background: rgba(32, 32, 35, 1);
    display: flex;
    justify-content: space-between;
    .top-logo {
      width: 2rem;
    }
    .logo-right {
      padding: .5rem .3rem .5rem;
      .span {
        display: block;
        width: 1.2rem;
        height: .08rem;
        background: #FFF;
        margin-bottom: .2rem;
        border-radius: 1rem;
      }
    }
  }

  .showMenu {
    position: absolute;
    width: 100%;
    background: rgba(55, 56, 59, 1);
    left: 0;
    z-index: 1000;
    color: rgba(255, 255, 255, 1);
    padding: .5rem .8rem;
    ul {
      li {
        list-style: none;
        > div {
          font-size: .7rem;
          margin-bottom: .5rem;
          P.ftitle {
            &::after {
              content: '';
              width: 10px;
              height: 10px;
              border-right: 1px solid #FFF;
              border-bottom: 1px solid #FFF;
              transform: translateY(.4rem) rotate(311deg);
              display: inline-block;
              float: right;
            }
          }
        }
        .showItem {
          ol {

            li {
              list-style: none;

            }
          }

        }
      }
    }
  }

  .banner-introduce {
    background-color: #fff;
    margin-bottom: .5rem;
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
    margin-bottom: .5rem;
    .product-header {
      font-size: .36rem;
      color: #222;
      padding: .21rem .27rem;
      border-bottom: 1px solid #e7e7e7;
    }
    .product-content {
      .product-content-item {
        .product-item-header {
          //height: 0.88rem;
          padding: .21rem .27rem;
          border-bottom: 1px solid #e7e7e7;
          p {
            font-size: 0.32rem;
          }
        }
        .product-item-content {
          background: rgba(245, 245, 245, 1);
          border-bottom: 1px solid #e7e7e7;
          ul {
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
            &:after {
              transform: rotate(135deg);
              border-bottom: 1px solid #4A90E2;
              border-left: 1px solid #4A90E2;
            }
          }
        }
      }
    }
  }

  //数据中心
  .data-wrapper {
    background-color: #fff;
    margin-bottom: .5rem;
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
      margin: 1rem auto;
      width: 100%;
      padding-bottom: 1.2rem;
    }
  }

  //权威认证
  .authority-wrapper {
    background-color: #fff;
    margin-bottom: .5rem;
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
          &::after {
            content: '';
            border-bottom: 1px solid #999;
            border-right: 1px solid #999;
            width: .5rem;
            height: .5rem;
            display: inline-block;
            position: absolute;
            right: 1.3rem;
            transform-origin: 50% 50%;
            transform: translateY(.3rem) rotate(311deg);
          }
        }
      }
    }
  }

  //合作伙伴
  .partner-wrapper {
    background-color: #fff;
    margin-bottom: .5rem;
    .partner-header {
      font-size: .36rem;
      color: #222;
      padding: .24rem .3rem;
      border-bottom: 1px solid #e7e7e7;
    }
    .item {
      padding: .24rem .3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      img {
        width: 20.1%;
        margin-bottom: 1.5rem;
      }
    }
  }

  //support
  .support-wrapper {
    background-color: #fff;
    margin-bottom: .5rem;
    padding: .5rem 1rem;
    .item {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > div {
        display: flex;
        font-size: .6rem;
        align-items: center;
        margin-bottom: 1rem;
        padding-left: 1rem;
        .item-title {
          color: rgba(51, 51, 51, 1);
        }
        .item-subtitle {
          color: rgba(153, 153, 153, 1);
        }
        img {
          width: 1.5rem;
          margin-right: .5rem;
        }
      }
    }
  }

  //首页页尾
  .footer-wrapper {
    height: 12rem;
    background: rgba(67, 67, 67, 1);
    padding: .5rem;
    .foot-one {
      height: 8rem;
      border-bottom: 1px solid #666;
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      img {
        width: 5rem;
      }
      .foot-one-right {
        h6 {
          font-weight: normal;
          font-size: .9rem;
          color: rgba(255, 255, 255, 1);
        }
        p {
          color: rgba(125, 161, 217, 1);
          font-size: .1rem;
          line-height: 1.8rem;
        }
        span {
          display: block;
          font-size: .3rem;
          color: rgba(255, 255, 255, 1);
          &:last-of-type {
            font-size: .6rem;
          }
        }
      }
    }
    .foot-two {
      padding: .5rem 0;
      text-align: center;
      font-size: .6rem;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1.2rem;
      img {
        padding-left: .5rem;
        width: 1.3rem;
      }
    }
  }

  //动态
  /*.dynamic-wrapper {*/
  /*background-color: #FFF;*/
  /*margin-bottom: .5rem;*/
  /*.title {*/
  /*padding: .5rem 1rem;*/
  /*font-size: .9rem;*/
  /*font-weight: normal;*/
  /*color: #000;*/
  /*border-bottom: 1px solid #e7e7e7;*/
  /*}*/
  /*.dynamic-content {*/
  /*ul {*/
  /*padding: .375rem .725rem;*/
  /*li {*/
  /*list-style: none;*/
  /*border-bottom: .025rem solid #e7e7e7;*/
  /*padding-top: .8rem;*/
  /*height: 2.8rem;*/
  /*.dynamic-content-item-title {*/
  /*font-weight: normal;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  /*line-height: .65rem;*/
  /*font-size: .65rem;*/
  /*color: #333;*/
  /*margin-bottom: .5rem;*/
  /*}*/
  /*.dynamic-content-item-content {*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*white-space: nowrap;*/
  /*line-height: .65rem;*/
  /*font-size: .65rem;*/
  /*color: #999;*/
  /*}*/
  /*.item-time {*/
  /*float: right;*/
  /*line-height: .8rem;*/
  /*font-size: .65rem;*/
  /*color: #999;*/

  /*}*/
  /*}*/
  /*}*/
  /*}*/

  /*}*/


</style>

