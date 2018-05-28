<template>
  <!--产品详情页面-->
  <div>
    <div class="detail-top">
      <p class="detail-title">{{title}}</p>
      <div style="display: flex;justify-content: space-between">
        <p class="detail-desc">
          {{desc}}
        </p>
        <p class="buy-btn">购买</p>
      </div>
    </div>
    <!--导航1-->
    <div>
      <tab :line-width="2" active-color="#00aaff">
        <tab-item selected @on-item-click="Products.showFuc = true,Products.showScen=false,Products.showAdv=false">
          功能描述
        </tab-item>
        <tab-item @on-item-click="Products.showFuc = false,Products.showScen=true,Products.showAdv=false">应用场景
        </tab-item>
        <tab-item @on-item-click="Products.showFuc = false,Products.showScen=false,Products.showAdv=true">产品优势
        </tab-item>
      </tab>
      <div class="detail-content">
        <div v-if="Products.showFuc">
          <h6 class="title">{{Products.Functions.title}}</h6>
          <ul>
            <li v-for="(desc,index) in Products.Functions.descs" :key="index">{{desc}}</li>
          </ul>
        </div>
        <div v-if="Products.showScen">
          <h6 class="title">{{Products.Applications.title}}</h6>
          <ul>
            <li v-for="(desc,index) in Products.Applications.descs" :key="index">{{desc}}</li>
          </ul>
        </div>
        <div v-if="Products.showAdv">
          <h6 class="title">{{Products.Advantages.title}}</h6>
          <ul>
            <li v-for="(desc,index) in Products.Advantages.descs" :key="index">{{desc}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!--导航2-->
    <div>
      <tab :line-width="2" active-color="#00aaff" custom-bar-width="80%">
        <tab-item selected @on-item-click="lists.list1 = true,lists.list2 = false,lists.list3 = false">
          场景1
        </tab-item>
        <tab-item @on-item-click="lists.list1 = false,lists.list2 = true,lists.list3 = false">场景2</tab-item>
        <tab-item @on-item-click="lists.list1 = false,lists.list2 = false,lists.list3 = true">场景3</tab-item>
      </tab>
      <div class="detail-content">
        <div v-if="lists.list1">
          <h6 class="title">{{lists.list1s.title}}</h6>
          <ul>
            <li v-for="(desc,index) in lists.list1s.descs" :key="index">{{desc}}</li>
          </ul>
        </div>
        <div v-if="lists.list2">
          <h6 class="title">{{lists.list2s.title}}</h6>
          <ul>
            <li v-for="(desc,index) in lists.list1s.descs" :key="index">{{desc}}</li>
          </ul>
        </div>
        <div v-if="lists.list3">
          <h6 class="title">{{lists.list3s.title}}</h6>
          <ul>
            <li v-for="(desc,index) in lists.list3s.descs" :key="index">{{desc}}</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  export default{
    components: {
      Tab,
      TabItem
    },
    data ()  {
      scrollTo(0, 0)
      return {
        title: sessionStorage.getItem('title'),
        desc: sessionStorage.getItem('desc'),
        // 导航1
        Products: {
          showFuc: true,
          showScen: false,
          showAdv: false,
          Functions: {
            title: '功能描述',
            descs: ['提供安全、稳定、高速、隔离的网络连接，具有VPC功能，帮助用户构建虚拟私有云，支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。', '提供安全、稳定、高速、隔离的网络连接，具有VPC功能，帮助用户构建虚拟私有云，支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。']
          },
          Applications: {
            title: '应用场景',
            descs: ['帮助用户构建虚拟私有云，支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。', '提供安全、稳定、高速、隔离的网络连接，具有VPC功能，帮助用户构建虚拟私有云，支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。']
          },
          Advantages: {
            title: '产品优势',
            descs: ['支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。', '提供安全、稳定、高速、隔离的网络连接，具有VPC功能，帮助用户构建虚拟私有云，支持二层和三层网络能力，具有防火墙、负载均衡、DDoS、私有网关和VPN等功能，能实现混合云和跨云部署。']
          }
        },
        // 导航2
        lists: {
          list1: true,
          list2: false,
          list3: false,
          list1s: {
            title: '场景1',
            descs: []
          },
          list2s: {
            title: '场景2',
            descs: []
          },
          list3s: {
            title: '场景3',
            descs: []
          }
        },
      }
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
      margin-top: .35rem;
    }

  }

  .detail-content {
    .title {
      padding: .9rem 1rem .5rem 1rem;
      font-size: .8rem;
      font-weight: normal;
      color: #000;
      border-bottom: 1px solid #e7e7e7;
    }
    ul {
      padding: 0 .75rem;
      background: #fff;
      li {
        position: relative;
        list-style: none;
        font-size: .65rem;
        color: rgba(34, 34, 34, 1);
        line-height: 1.2rem;
        padding: .3rem 0 .5rem 3.5rem;
        border-bottom: 1px solid #e7e7e7;
        &:before {
          content: '';
          width: 2.5rem;
          height: 2.5rem;
          display: inline-block;
          background-color: #e7e7e7;
          position: absolute;
          left: .2rem;
          top: .5rem;

        }
      }
    }
  }
</style>
