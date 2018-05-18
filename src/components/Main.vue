<template>
  <div id="app">
    <router-view></router-view>
    <div class="weui-tabbar components-bottom-bar">
      <router-link to="home" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <p class="iconfont icon-home"></p>
        </div>
        <p class="weui-tabbar__label"><span>首页</span></p>
      </router-link>
      <router-link to="sort" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <p class="iconfont icon-classify"></p>
        </div>
        <p class="weui-tabbar__label"><span>活动</span></p>
      </router-link>
      <router-link to="console" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <p class="iconfont icon-mall"></p>
        </div>
        <p class="weui-tabbar__label"><span>控制台</span></p>
      </router-link>
      <router-link to="mine" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <p class="iconfont icon-mine"></p>
        </div>
        <p class="weui-tabbar__label"><span>我的</span></p>
      </router-link>
    </div>
  </div>
</template>

