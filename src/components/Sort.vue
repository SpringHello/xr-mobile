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
  import {Swiper,XHeader ,Flexbox, FlexboxItem} from 'vux'
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
      return {

      }
    }
  }
</script>

