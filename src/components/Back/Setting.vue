<template>
  <div id="setup">
    <x-header>安全设置</x-header>
    <Group>
      <cell title="修改密码" value="修改" inline-desc="建议您定期更换密码使账号更安全" is-link link="ChangePassworld">
        <img src="../../assets/img/back/unbound.png" slot="icon">
      </cell>

      <cell title="手机绑定" value="修改" :inline-desc="setup.boundPhone" is-link v-if="users.phone" link="home">
        <img src="../../assets/img/back/bound.png" slot="icon">
      </cell>
      <cell title="手机绑定" value="绑定" :inline-desc="setup.unboundPhone" is-link v-else>
        <img src="../../assets/img/back/unbound.png" slot="icon">
      </cell>

      <cell title="邮箱绑定" value="修改" :inline-desc="setup.boundEmail" is-link v-if="users.loginname">
        <img src="../../assets/img/back/bound.png" slot="icon">
      </cell>
      <cell title="邮箱绑定" value="绑定" :inline-desc="setup.unboundEmail" is-link v-else link="home">
        <img src="../../assets/img/back/unbound.png" slot="icon">
      </cell>


    </Group>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, XHeader} from 'vux'
  export default{
    components: {
      Group,
      Cell,
      XHeader
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.setData()
      })
    },
    data(){
      return {
        users: this.$store.state.userInfo,
        setup: {
          unboundPhone: '',
          boundPhone: '',
          unboundEmail: '',
          boundEmail: '',

        },
      }
    },
    methods: {
      //获取信息
      setData(){
        if (this.users.phone) {
          this.setup.boundPhone = `您已经绑定${this.users.phone}`
        } else {
          this.setup.unboundPhone = '您尚未绑定手机'
        }
        if (this.users.loginname) {
          this.setup.boundEmail = `您已经绑定${this.users.loginname}`
        } else {
          this.setup.unboundEmail = '您尚未绑定邮箱'
        }
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  img {
    width: .32rem;
    display: block;
    margin-right: .2rem;
    position: relative;
    bottom: .32rem;
  }
</style>
