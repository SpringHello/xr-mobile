<template>
  <div>
    <x-header :left-options="{showBack: false}">活动</x-header>
    <div class="active-box">
      <router-link v-for="(item,index) in actives" :key="index" :to="item.url">
        <div class="active-item">
          <img src="" class="item-img">
          <h6>{{item.name}}</h6>
          <p class="item-bottom">{{item.des}}</p>
        </div>
      </router-link>

    </div>
    <div style="height: 1rem;"></div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
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
    beforeRouteEnter(to, from, next){
      axios.get('activity/getActivitys.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
        }
      }).then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
    },
    data () {
      window.scrollTo(0, 0);
      return {
        actives: [],
      }
    },
    methods: {
      //获取数据
      setData(response){
        if (response.status == 200 && response.data.status == 1) {
          this.actives = response.data.result
        }
      },
    }

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  //活动页面样式
  .active-box {
    padding: .2rem;
    background: rgba(245, 245, 245, 1);
    .active-item {
      margin-bottom: .21rem;
      background-color: #FFF;
      padding-bottom: .3rem;
      .item-img {
        height: 3.54rem;
        display: block;
        background-color: #4767B1;
      }
      h6 {
        padding: .19rem 0 .08rem .24rem;
        color: rgba(51, 51, 51, 1);
        font-weight: normal;
        font-size: .32rem;
      }
      .item-bottom {
        padding-left: .24rem;
        font-size: .2rem;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
</style>
