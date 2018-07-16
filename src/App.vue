<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import $store from '@/vuex'
  import axios from '@/util/iaxios'
  export default{
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
    }
  }

</script>
<style>

</style>
