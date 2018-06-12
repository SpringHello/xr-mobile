<template>
  <div style="margin-bottom: 1.5rem;">
    <x-header :left-options="{showBack: false}">活动</x-header>
    <div class="active-box">
      <router-link v-for="(item,index) in actives" :key="index" :to="item.url">
        <div class="active-item">
          <img src="" class="item-img">
          <h6>企业级云服务 重磅来袭</h6>
          <p class="item-bottom">{{item.desc}}</p>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
  import {Swiper, XHeader, Flexbox, FlexboxItem} from 'vux'
  import {XButton} from 'vux'
  export default {
    components: {
      Swiper,
      XButton,
      XHeader,
      Flexbox,
      FlexboxItem
    },
    data () {
      scrollTo( 0, 0 )
      return {
        actives: [
          {img: "", desc: " 活动时间：2018/5/24~2018/6/24", url: "/Sortdetail"},
          {img: "", desc: " 活动时间：2018/5/24~2018/6/25", url: "/Sortdetail"},
          {img: "", desc: " 活动时间：2018/5/24~2018/6/26", url: "/Sortdetail"},
          {img: "", desc: " 活动时间：2018/5/24~2018/6/27", url: "/Sortdetail"}
        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  //活动页面样式
  .active-box {
    padding: .2rem;
    .active-item {
      margin-bottom: .21rem;
      .item-img {
        height: 3.54rem;
        display: block;
        background-color: #ccc;
      }
      h6{
        padding: .19rem 0 .08rem .24rem;
        color:rgba(51,51,51,1);
        font-weight: normal;
        font-size: .32rem;
      }
      .item-bottom {
        padding-left: .24rem;
        font-size: .2rem;
        color:rgba(102,102,102,1);
      }
    }
  }
</style>
