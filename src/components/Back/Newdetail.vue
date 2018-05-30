<template>
  <div>
    <x-header></x-header>
    <div class="newdetail">
      <h6>{{details.name}}</h6>
      <p>{{details.publishtime}}</p>
      <div class="content">{{details.content}}</div>
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
        details: JSON.parse(sessionStorage.getItem('content'))
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .newdetail {
    text-align: center;
    padding: 1rem .5rem;
    h6 {
      font-size: .8rem;
    }
    p {
      font-size: .65rem;
      color: rgba(153, 153, 153, 1);
      line-height: 1.5rem;
    }
    .content {
      text-align: left;
      padding: 1rem 0.5rem;
      font-size:.65rem;
      color:rgba(102,102,102,1);
      line-height:1.2rem;
    }
  }
</style>
