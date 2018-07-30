<template>
  <div class="background">
    <h2>产品优势</h2>
    <div class="center">
      <ul v-for="item in advantages">
        <li><img :src="item.src"/></li>
        <li>{{ item.title}}</li>
        <li>{{ item.describe}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        advantages: [
          {
            src: require('../../../../assets/img/active/groupbooking/gb-icon8.png'),
            title: '安全稳定',
            describe: '40G超大流量免费防护，高性能DDoS硬件，秒级防护，专业漏洞检测，流量清洗，用户100%网络隔离 '
          }, {
            src: require('../../../../assets/img/active/groupbooking/gb-icon9.png'),
            title: '性价比高',
            describe: '0基础设施建设投入，企业级云产品便捷采购，0门槛上云，专家团队免费在线咨询，享受云网超顶级硬件与超大带宽'
          }, {
            src: require('../../../../assets/img/active/groupbooking/gb-icon10.png'),
            title: '数据持久性',
            describe: '全场景光纤网络数据存储，超低延迟高吞吐，最高20万级IOPS，SDN网络诊断技术，快速屏蔽网络故障'
          }, {
            src: require('../../../../assets/img/active/groupbooking/gb-icon11.png'),
            title: '服务完善',
            describe: '7*24小时在线客服，80秒客户问题快速响应，7天无理由退款，12年运营商级技术团队为您保驾护航'
          },
        ]
      }
    },
    props: {},
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .background {
    padding: .25rem 0;
    h2 {
      font-size: .36rem;
      font-family: "Microsoft YaHei", "微软雅黑";
      color: rgba(75, 19, 43, 1);
      text-align: center;
      font-weight: normal;
      position: relative;
      &:before {
        display: inline-block;
        content: '';
        background: linear-gradient(133.1deg, rgba(254, 79, 74, 1), rgba(252, 169, 135, 1));
        opacity: 0.5;
        width: .2rem;
        height: .2rem;
        border-radius: .1rem;
        position: absolute;
        top: 15%;
        left: 35%;
      }
    }
    .center {
      margin-top: .3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      ul {
        text-align: center;
        width: 3.41rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        list-style: none;
        padding: .25rem .3rem;
        li {
          font-size: .24rem;
          font-family: "Microsoft YaHei", "微软雅黑";
          color: rgba(253, 140, 115, 1);
          line-height: .33rem;
        }
        li:nth-child(2) {
          margin-top: .2rem;
        }
        li:nth-child(3) {
          margin-top: .1rem;
          color: #666666;
        }
      }
      ul:nth-child(1) {
        margin-bottom: .2rem;
      }
      ul:nth-child(2) {
        margin-bottom: .2rem;
      }
    }
  }
</style>
