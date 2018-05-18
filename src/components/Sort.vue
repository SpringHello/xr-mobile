<template>
  <div style="margin-bottom: 2.25rem;">
    <x-header :left-options="{showBack: false}">活动</x-header>
    <div class="active-box">
      <div class="active-item">
        <p class="item-img"></p>
        <p class="item-bottom">
          活动时间：2018/5/24~2018/6/24
          <x-button mini class="item-btn">立即参与</x-button>
        </p>
      </div>
      <div class="active-item">
        <p class="item-img"></p>
        <p class="item-bottom">
          活动时间：2018/5/24~2018/6/24
          <x-button mini class="item-btn">立即参与</x-button>
        </p>
      </div>
      <div class="active-item">
        <p class="item-img"></p>
        <p class="item-bottom">
          活动时间：2018/5/24~2018/6/24
          <x-button mini class="item-btn">立即参与</x-button>
        </p>
      </div>
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
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  //活动页面样式
  .active-box {
    padding: .2rem .5rem 4.5rem;
    font-size: .6rem;
    .active-item {
      height: 15rem;
      border: 1px solid #e6e6e6;
      padding-bottom: .5rem;
      margin: 0 0 .5rem;
      position: relative;
      .item-img {
        height: 12.75rem;
        background-color: #ccc;
      }
      .item-bottom {
        padding: .5rem .4rem;
        font-size: .65rem;
        line-height: 1.45rem;
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
