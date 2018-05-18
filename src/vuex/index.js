/**
 * Created by yunrui001 on 2018-05-16.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户认证信息
    authInfo: null,
    // 用户个人信息
    userInfo: null,
    // 区域信息
    zoneList: null,
    // 当前区域
    zone: null,
  },
  mutations: {
    setAuthInfo (state, {authInfo, userInfo}) {
      state.authInfo = authInfo
      state.userInfo = userInfo
    },
    setZoneList (state, zoneList) {
      state.zoneList = zoneList
      // 设置当前默认区域
      for (var zone of zoneList) {
        if (zone.isdefault == 1) {
          state.zone = zone
        }
      }
    }
  }
})
