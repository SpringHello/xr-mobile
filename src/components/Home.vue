<template>
  <div style="margin-bottom: 2.25rem;">
    <!--顶部logo-->
    <header class="header-wrapper">
      <h1>logo位置</h1>
    </header>
    <!--走马灯-->
    <swiper :list="swiperList" dots-position="center" :auto="true" :interval="5000"></swiper>
    <!--走马灯下方介绍-->
    <div class="banner-introduce">
      <router-link to="home">探索数字世界</router-link>
      <router-link to="home">探索数字世界</router-link>
      <router-link to="home">探索数字世界</router-link>
      <router-link to="home">探索数字世界</router-link>
    </div>
    <!--产品模块-->
    <div class="product-wrapper">
      <div class="product-header">
        <p>云计算产品</p>
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
                <router-link to="home" class="link-button-default">查看详情</router-link>
                <router-link to="home" class="link-button-default link-button-main">立即选购</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--动态-->
    <div class="dynamic-wrapper">
      <h6 class="title">新睿云动态</h6>
      <div class="dynamic-content">
        <div class="dynamic-content-title" v-for="(item,index) in dynamicList"
             :class="{'dynamic-content-active':Info.type==item.value}" @click="Info.type=item.value">
          <p>{{item.title}}</p>
        </div>
      </div>
      <div v-if="Info.type == 'office'" class="dynamic">
        <div class="dynamicContent-item" v-for="(item,index) in dynamicContent.offices">
          <h3><span>{{item.title}}</span> {{item.subtitle}}</h3>
          <p>{{item.desc}}</p>
        </div>
      </div>
      <div v-if="Info.type == 'news'" class="dynamic">
        <div class="dynamicContent-item" v-for="(item,index) in dynamicContent.News">
          <h3><span>{{item.title}}</span> {{item.subtitle}}</h3>
          <p>{{item.desc}}</p>
        </div>
      </div>
    </div>
    <!--资质认证-->
    <div class="certification-wrapper">
      <h6 class="title">资质认证</h6>
      <div class="certification-content">
        <div class="certification-content-item">
        </div>
      </div>
    </div>
    <!--了解新睿云-->
    <div class="understand-wrapper">
      <h6 class="title">了解新睿云</h6>
      <div class="understands-content">
        <div class="understands-item" v-for="(item,index) in understands">
          <p><img :src=item.img style="width: 2rem;height: 2rem;"></p>
          <div class="understands-item-bottom">
            <p>{{item.title}}</p>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </div>
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
  import {Swiper} from 'vux'
  import {XButton} from 'vux'
  export default {
    components: {
      Swiper,
      XButton
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
        // 产品资料
        productList: [
          {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性的计算服务',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性的计算服务',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性的计算服务',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性的计算服务',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性的计算服务',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }, {
            title: '云服务器',
            opened: false,
            descTitle: '极速稳定高弹性的计算服务',
            descContent: '采用由数据切片技术构建的三层存储功能，切实保护客户数据的安全。同时可弹性扩展的资源用量，为客户业务在高峰期的顺畅保驾护航',
            cost: 15
          }],
        Info: {
          type: 'office'
        },
        // 动态
        dynamicList: [
          {title: "官方公告", value: "office"},
          {title: "业界新闻", value: "news"}
        ],
        //动态集合
        dynamicContent: {
          offices: [
            {
              title: '【03-05】',
              subtitle: ' 关于Memcached反射放大攻击的安全预警通知',
              desc: "近日，利用memcached服务器实施反射DDoS攻击的事件呈大幅上升趋势。..."
            },
            {
              title: "【03-08】",
              subtitle: ' 关于Memcached反射放大攻击的安全预警通知',
              desc: "近日，利用memcached服务器实施反射DDoS攻击的事件呈大幅上升趋势。..."
            },
            {title: "【03-17】", subtitle: ' 关于Memcached反射放大攻击的安全预警通知', desc: "近日，利用memcached服务器实施反射DDoS攻击的事件呈大幅上升趋势。..."}
          ],
          News: [
            {
              title: "【04-06】",
              subtitle: ' 关于Memcached反射放大攻击的安全预警通知',
              desc: "近日，利用memcached服务器实施反射DDoS攻击的事件呈大幅上升趋势。..."
            },
            {
              title: "【04-20】",
              subtitle: ' 关于Memcached反射放大攻击的安全预警通知',
              desc: "近日，利用memcached服务器实施反射DDoS攻击的事件呈大幅上升趋势。..."
            },
            {title: "【04-26】", subtitle: ' 关于Memcached反射放大攻击的安全预警通知', desc: "近日，利用memcached服务器实施反射DDoS攻击的事件呈大幅上升趋势。..."}
          ],
        },
        //了解新睿云
        understands: [
          {img: require('../assets/logo.png'), title: "自建数据", desc: "中心12+"},
          {img: require('../assets/logo.png'), title: "IP领先", desc: "行业领先"},
          {img: require('../assets/logo.png'), title: "服务客服", desc: "超过10万"},
          {img: require('../assets/logo.png'), title: "巨资打造", desc: "顶尖设施"},
        ]
      }
    }
  }
</script>
