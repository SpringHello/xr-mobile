<template>
  <div id="app">
    <router-view style="margin-bottom:1rem"></router-view>
    <div class="weui-tabbar components-bottom-bar">
      <div>
        <router-link to="/home" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="active=='Home'" class=" icon-classify" style="width: .44rem"
                 src="../assets/img/home/foot-1-active.png">
            <img v-else class=" icon-classify" style="width: .44rem" src="../assets/img/home/foot-1.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:active=='Home'}"><span>新睿云</span></p>
        </router-link>
      </div>
      <div>
        <router-link to="/sort" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="active=='Sort'" class=" icon-classify" style="width: .44rem"
                 src="../assets/img/home/foot-2-active.png">
            <img v-else class=" icon-classify" style="width: .44rem" src="../assets/img/home/foot-2.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:active=='Sort'}"><span>活动</span></p>
        </router-link>
      </div>
      <div>
        <router-link to="/console" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="active=='Console'" class=" icon-mall" style="width: .44rem"
                 src="../assets/img/home/foot-3-active.png">
            <img v-else class=" icon-mall" style="width: .44rem" src="../assets/img/home/foot-3.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:active=='Console'}"><span>控制台</span></p>
        </router-link>
      </div>
      <div>
        <router-link to="/mine" class="weui-tabbar__item">
          <div class="weui-tabbar__icon">
            <img v-if="active=='Mine'" class=" icon-mine" style="width: .44rem"
                 src="../assets/img/home/foot-4-active.png">
            <img v-else class=" icon-mine" style="width: .44rem" src="../assets/img/home/foot-4.png">
          </div>
          <p class="weui-tabbar__label" :class="{activeColor:active=='Mine'}"><span>我的</span></p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import $store from '@/vuex'
  import axios from '@/util/iaxios'
  export default {
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.active = to.name
      })
    },
    beforeRouteUpdate(to, from, next){
      this.active = to.name
      next()
    },
    data (){
      window.scrollTo(0, 0);
      return {
        active: 'Home',
      }
    }
  }
</script>
