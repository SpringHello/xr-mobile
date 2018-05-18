<template>
  <div>
    <div class="detail-top">
      <p class="detail-title">{{$route.query.item.descTitle}}</p>
      <div style="display: flex;justify-content: space-between">
        <p class="detail-desc">
          {{$route.query.item.descContent}}
        </p>
        <p class="buy-btn">购买</p>
      </div>
    </div>
    <div>
      <tab :line-width="2" active-color="#00aaff">
        <tab-item selected @on-item-click="onItemClick">功能描述</tab-item>
        <tab-item @on-item-click="onItemClick">应用场景</tab-item>
        <tab-item @on-item-click="onItemClick">产品优势</tab-item>
      </tab>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'
  export default{
    components: {
      Tab,
      TabItem
    },
    data ()  {
      return {}
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .detail-top {
    background: rgba(216, 216, 216, 1);
    padding: 1.2rem;
    .detail-title {
      font-size: .8rem;
      color: rgba(34, 34, 34, 1);
      line-height: 1rem;
      margin-bottom: .5rem;
    }
    .detail-desc {
      width: 70%;
      font-size: .5rem;
    }
    .buy-btn {
      text-align: center;
      font-size: .8rem;
      color: rgba(34, 34, 34, 1);
      width: 2.25rem;
      height: 2.25rem;
      line-height: 2.25rem;
      border-radius: 50%;
      background: rgba(43, 153, 242, 1);
      margin-top: .45rem;
    }

  }
</style>
