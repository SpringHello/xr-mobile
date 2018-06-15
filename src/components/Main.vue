<template>
  <div id="app">
    <router-view></router-view>
    <div class="weui-tabbar components-bottom-bar">
      <div @click="active(1)">
        <router-link to="home" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="index==1" class="iconfont icon-classify" style="width: .44rem"
                 src="../assets/img/home/foot-1-active.png">
            <img v-else class="iconfont icon-classify" style="width: .44rem" src="../assets/img/home/foot-1.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:index==1}"><span>新睿云</span></p>
        </router-link>
      </div>
      <div @click="active(2)">
        <router-link to="sort" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="index==2" class="iconfont icon-classify" style="width: .44rem"
                 src="../assets/img/home/foot-2-active.png">
            <img v-else class="iconfont icon-classify" style="width: .44rem" src="../assets/img/home/foot-2.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:index==2}"><span>活动</span></p>
        </router-link>
      </div>
      <div @click="active(3)">
        <router-link to="console" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="index==3" class="iconfont icon-mall" style="width: .44rem"
                 src="../assets/img/home/foot-3-active.png">
            <img v-else class="iconfont icon-mall" style="width: .44rem" src="../assets/img/home/foot-3.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:index==3}"><span>控制台</span></p>
        </router-link>
      </div>
      <div @click="active(4)">
        <router-link to="mine" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="index==4" class="iconfont icon-mine" style="width: .44rem"
                 src="../assets/img/home/foot-4-active.png">
            <img v-else class="iconfont icon-mine" style="width: .44rem" src="../assets/img/home/foot-4.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:index==4}"><span>我的</span></p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import $store from '@/vuex'
  import axios from '@/util/iaxios'
  export default {
    data (){
      window.scrollTo(0, 0);
      return {
        index: 1
      }
    },
    beforeRouteEnter(to, from, next){
      // 获取所有后台需要的基本信息
      // 获取用户信息
      var userInfo = axios.get('user/GetUserInfo.do')
      // 获取zone信息
      var zoneList = axios.get('information/zone.do')
      Promise.all([userInfo, zoneList]).then(values => {
        if (values[0].data.status == 1 && values[0].status == 200) {
          $store.commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result})
        }
        if (values[1].data.status == 1 && values[1].status == 200) {
          $store.commit('setZoneList', values[1].data.result)
        }
        next()
      })
    },
    methods: {
      active(index){
         sessionStorage.setItem('index',this.index)
        this.index = index
      }
    }
  }
</script>
