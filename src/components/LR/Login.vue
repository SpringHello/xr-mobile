<template>
  <div>
    <x-header :right-options="{showMore: true}">登录</x-header>
    <div>
      <form class="sign-form">
        <div class="form-item">
          <input type="text" v-model="signForm.username">
        </div>
        <div class="form-item">
          <input type="text" v-model="signForm.password">
          <input type="password" v-model="signForm.password">
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    components: {
      XHeader
    },
    data () {
      return {
        signForm: {
          username: '',
          password: ''
        }
      }
    }
  }
</script>
