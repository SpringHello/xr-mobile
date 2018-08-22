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
      window.scrollTo(0, 0);
      return {
        details: JSON.parse(sessionStorage.getItem('content'))
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .newdetail {
    margin: .2rem;
    /*height: 3.5rem;*/
    background: #FFF;
    text-align: center;
    h6 {
      font-size: .32rem;
      padding-top: .25rem;
    }
    p {
      font-size: .2rem;
      color: rgba(153, 153, 153, 1);
      line-height: .28rem;
      padding-top: .1rem;
    }
    .content {
      margin-top: .24rem;
      border-top: 1px solid #E8E8E8;
      text-align: left;
      font-size: .24rem;
      color: rgba(102, 102, 102, 1);
      line-height: .45rem;
      padding: .24rem;
    }
  }
</style>
