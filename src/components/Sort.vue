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
          },{
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
          }]
      }
    }
  }
</script>
