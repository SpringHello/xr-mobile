<template>
  <div style="margin-bottom: 2.25rem;">
    <!--顶部logo-->
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">首页</x-header>
    <!--走马灯-->
    <swiper :list="swiperList" dots-position="center" :auto="true" :interval="5000"></swiper>
    <!--走马灯下方介绍-->
    <div class="banner-introduce">
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item v-for="(item,index) in introduce" :link="item.url" :key="index">
          <img slot="icon" src="">
          <span slot="label" class="grid-item">{{ item.title }}</span>
        </grid-item>
      </grid>
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
            <p>{{product.title}}</p>
          </div>
          <div class="product-item-content" v-show="product.opened">
            <h6>{{product.descTitle}}</h6>
            <p>{{product.descContent}}</p>
            <div>
              <span><span class="product-item-price">{{product.cost}}</span>元/月起</span>
              <div style="float: right">
                <router-link :to="{path:'prodetail',query:{item:product}}" class="link-button-default">查看详情
                </router-link>
                <router-link to="home" class="link-button-default link-button-main">立即选购</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--解决定制方案-->
    <div class="scheme-wrapper">
      <h6 class="title">解决定制方案</h6>
      <scroller lock-y :scrollbar-x=false>
        <div class="box1">
          <div class="box1-item" v-for="i in 7"><img src=""></div>
        </div>
      </scroller>
    </div>
    <!--动态-->
    <div class="dynamic-wrapper">
      <h6 class="title">新睿云动态</h6>
      <tab :line-width="2" active-color="#00aaff" custom-bar-width="80%">
        <tab-item selected @on-item-click="dynamicContent.showNews = false ,dynamicContent.showOffices = true">官方公告
        </tab-item>
        <tab-item @on-item-click="dynamicContent.showNews = true ,dynamicContent.showOffices = false">业界新闻</tab-item>
      </tab>
      <div class="dynamic-content">
        <ul v-if="dynamicContent.showOffices">
          <li v-for="(item,index) in dynamicContent.offices"
              @click="$router.push({path:'dynamic',query:{id:item.id,type:item.type}})">
            <h6 class="dynamic-content-item-title">{{item.title}}</h6><span class="item-time">{{item.createtime}}</span>
          </li>
        </ul>
        <ul v-if="dynamicContent.showNews">
          <li v-for="(item,index) in dynamicContent.News">
            <h6 class="dynamic-content-item-title"
                @click="$router.push({path:'dynamic',query:{id:item.id,type:item.type}})">{{item.title}}</h6><span
            class="item-time">{{item.createtime}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--资质认证-->
    <div class="certification-wrapper">
      <h6 class="title">资质认证</h6>
      <scroller lock-y :scrollbar-x=false>
        <div class="box1">
          <div class="box1-item" v-for="i in 7"><img src=""></div>
        </div>
      </scroller>
    </div>
    <!--了解新睿云-->
    <div class="understand-wrapper">
      <h6 class="title">了解新睿云</h6>
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item v-for='(item,index) in understands' :link="item.url" :key="index">
          <img slot="icon" src="">
          <p slot="label" class="under-item">{{item.title}}<span style="display: block;">{{item.desc}}</span></p>
        </grid-item>
      </grid>
    </div>
    <!--免费注册-->
    <div class="register-wrapper">
      <div class="register-item">
        <router-link to="home">立即免费注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {Swiper, XButton, Tab, TabItem, Scroller, XHeader, Grid, GridItem} from 'vux'
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
      GridItem
    },
    data () {
      return {
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
          {img: '', title: "云服务器", url: "/sort"},
          {img: '', title: "云硬盘", url: "/sort"},
          {img: '', title: "负载均衡", url: "/sort"},
          {img: '', title: "弹性IP", url: "/sort"}
        ],
        // 产品资料
        productList: [
          {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性1',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性2',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性3',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性4',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性5',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性6',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }],
        // 定制方案
        schemes: [],
        //动态集合
        dynamicContent: {
          showOffices: true,
          showNews: false,
          offices: [],
          News: [],
        },
        // 资质认证
        auth: [],
        //了解新睿云
        understands: [
          {title: "自建数据", desc: "中心12+", url: ''},
          {title: "IP领先", desc: "行业领先", url: ''},
          {title: "服务客服", desc: "超过10万", url: ""},
          {title: "巨资打造", desc: "顶尖设施",url:''}
          ]
        }
    },
    methods: {
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.dynamicContent.offices = response.data.result.announcement_list
          this.dynamicContent.News = response.data.result.news_list
        }
      }
    },
    beforeRouteEnter(to, from, next){
      console.log('beforeRouteEnter')
      axios.get('user/getAnnouncement.do', {
        params: {
          listAll: -1,
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
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

  .banner-introduce {
    margin-bottom: .5rem;
    .grid-item {
      font-size: .7rem;
      color: rgba(34, 34, 34, 1);
      line-height: 1.65rem;
    }
  }

  .product-wrapper {
    background-color: #fff;
    margin-bottom: .5rem;
    .product-header {
      font-size: .9rem;
      padding: .5rem 1rem;
      border-bottom: 1px solid #e7e7e7;
    }
    .product-content {
      .product-content-item {
        .product-item-header {
          position: relative;
          border-bottom: 1px solid #e7e7e7;
          p {
            padding-left: 4rem;
            line-height: 3rem;
            position: relative;
            font-size: .8rem;
            &:before {
              content: '';
              width: 2rem;
              height: 2rem;
              display: block;
              background-color: #00aaff;
              position: absolute;
              left: 1rem;
              top: .5rem;
            }
            &:after {
              content: '';
              border-bottom: 1px solid #999;
              border-left: 1px solid #999;
              width: .5rem;
              height: .5rem;
              display: block;
              position: absolute;
              top: 50%;
              right: 1.5rem;
              transform-origin: 50% 50%;
              transform: translateY(-50%) rotate(-45deg);
            }
          }
        }
        .product-item-content {
          padding: .5rem 1rem;
          border-bottom: 1px solid #e7e7e7;
          h6 {
            font-weight: normal;
            font-size: .75rem;
            color: #333;
            line-height: 1.5rem;
          }
          p {
            font-weight: normal;
            font-size: .6rem;
            color: #666;
            padding-bottom: .1rem;
          }
          span {
            font-size: 0.8rem;
          }
          .product-item-price {
            color: #0af;
            font-size: 1rem;
          }

        }
      }
      .product-content-item-active {
        .product-item-header {
          color: #0af;
          p {
            &:after {
              transform: rotate(135deg);
              border-bottom: 1px solid #0af;
              border-left: 1px solid #0af;
            }
          }
        }
      }
    }
  }

  //方案
  .scheme-wrapper {
    margin-bottom: .5rem;
    background: #FFF;
    .title {
      padding: .5rem 1rem;
      font-size: .9rem;
      font-weight: normal;
      color: #000;
      border-bottom: 1px solid #e7e7e7;
    }
    .box1 {
      width: 175%;
      margin: .6rem 0;
      padding-bottom: 25%;
      .box1-item {
        width: 14%;
        height: 0rem;
        padding-bottom: 14.28%;
        background-color: #ccc;
        display: inline-block;
        margin-left: .28%;
        float: left;
        text-align: center;
        line-height: 3rem;
      }
    }

  }

  //动态
  .dynamic-wrapper {
    background-color: #FFF;
    margin-bottom: .5rem;
    .title {
      padding: .5rem 1rem;
      font-size: .9rem;
      font-weight: normal;
      color: #000;
      border-bottom: 1px solid #e7e7e7;
    }
    .dynamic-content {
      ul {
        padding: .375rem .725rem;
        li {
          list-style: none;
          border-bottom: .025rem solid #e7e7e7;
          padding-top: .8rem;
          height: 2.8rem;
          .dynamic-content-item-title {
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: .65rem;
            font-size: .65rem;
            color: #333;
            margin-bottom: .5rem;
          }
          .dynamic-content-item-content {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: .65rem;
            font-size: .65rem;
            color: #999;
          }
          .item-time {
            float: right;
            line-height: .8rem;
            font-size: .65rem;
            color: #999;

          }
        }
      }
    }

  }

  //认证
  .certification-wrapper {
    background-color: #FFF;
    margin-bottom: .5rem;
    .title {
      padding: .5rem 1rem;
      font-size: .9rem;
      font-weight: normal;
      color: #000;
      border-bottom: 1px solid #e7e7e7;
    }
    .box1 {
      width: 175%;
      margin: .6rem 0;
      padding-bottom: 25%;
      .box1-item {
        width: 14%;
        height: 0rem;
        padding-bottom: 14.28%;
        background-color: #ccc;
        display: inline-block;
        margin-left: .28%;
        float: left;
        text-align: center;
        line-height: 3rem;
      }
    }
  }

  //了解新睿云
  .understand-wrapper {
    margin-bottom: .5rem;
    background: #fff;
    .title {
      padding: .5rem 1rem;
      font-size: .9rem;
      font-weight: normal;
      color: #000;
      border-bottom: 1px solid #e7e7e7;
    }
    .under-item {
      padding-top: .5rem;
      font-size: .6rem;
      color: #666;
    }

  }

</style>
