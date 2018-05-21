<template>
  <div style="margin-bottom: 2.25rem;">
    <x-header :left-options="{showBack: false}">活动</x-header>
    <div class="active-box">
      <router-link v-for="(item,index) in actives" :key="index" :to="item.url">
        <div class="active-item">
          <img src="" class="item-img">
          <p class="item-bottom">
            {{item.desc}}
            <x-button mini class="item-btn">立即参与</x-button>
          </p>
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
          {img: "", desc: " 活动时间：2018/5/24~2018/6/24", url: ""},
          {img: "", desc: " 活动时间：2018/5/24~2018/6/25", url: ""},
          {img: "", desc: " 活动时间：2018/5/24~2018/6/26", url: ""},
          {img: "", desc: " 活动时间：2018/5/24~2018/6/27", url: ""}
        ]
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  //活动页面样式
  .active-box {
    padding: .2rem .5rem 1.5rem;
    font-size: .6rem;
    .active-item {
      height: 14rem;
      border: 1px solid #e6e6e6;
      padding-bottom: .5rem;
      margin: 0 0 .5rem;
      position: relative;
      .item-img {
        height: 10.8rem;
        display: block;
        background-color: #ccc;
      }
      .item-bottom {
        padding: .5rem .4rem;
        font-size: .65rem;
        line-height: 1.45rem;
        color: rgba(156, 156, 156, 1);
        .item-btn {
          font-size: .65rem;
          float: right;
          background: rgba(51, 51, 51, 1);
          color: rgba(156, 156, 156, 1);

        }
      }
    }
  }
</style>
