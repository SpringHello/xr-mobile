<template>
  <div style="margin-bottom: 2.25rem;">
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
    padding: .5rem;
    font-size: .6rem;
    .active-item {
      height: 15rem;
      /*border: 1px solid #e6e6e6;*/
      margin-bottom: .5rem;
      .item-img {
        height: 10.8rem;
        display: block;
        background-color: #ccc;
      }
      h6{
        padding: .4rem 0 0.2rem .5rem;
        font-size: 1rem;
        color:rgba(51,51,51,1);
        font-weight: normal;
      }
      .item-bottom {
        padding-left: .5rem;
        font-size: .6rem;
        color: rgba(156, 156, 156, 1);
      }
    }
  }
</style>
