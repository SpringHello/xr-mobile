<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header></x-header>
    <div class="box">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="push(item)">
          <div class="soures">
            <img src="">
            <div>
              <p class="soures-title">名称:{{item.title}}
              </p>
              <span class="soures-desc">镜像描述:{{item.desc}}</span>
            </div>
          </div>
          <p class="check">详细信息</p>
        </li>
      </ul>
      <p v-if="list==''" style="color: #ccc;text-align: center;font-size: .3rem;">暂无数据</p>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox, XHeader} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader
    },
    data () {
      return {
        list: [],
        address: '',
      }
    },
    methods: {
      push(item){
        this.address = 'ipDetail'
        var params ={
          id:item.id,
        }
        this.$router.push({path: this.address, query: params})
      },
      setData(list){
        this.list = list
      }
    },
    beforeRouteEnter(to, from, next){
      let url = ''
      let list = []
      let operate ={}
      if (to.query.type=='mirror') {
        url = 'information/listTemplates.do'
        operate = (response) => {
          for (let type in response.data.result){
            response.data.result[type].forEach(mirror => {
              list.push({title:mirror.templatename, desc:mirror.templatedescript ,id:mirror.systemtemplateid})
            })
          }
        }
      }
      axios.get(url, {
        params: {
          zoneId: $store.state.zone.zoneid,
          user: 0
        }
      }).then(response => {
        operate(response)
        next(vm => {
          vm.setData(list)
        })
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .box {
    background:rgba(243,243,243,1);
    margin-bottom: 1rem;
    ul {
      padding: .3rem;
      background:rgba(255,255,255,1);
      li {
        border-bottom: 1px solid #e7e7e7;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .soures {
          img {
            width: .8rem;
            height: .8rem;
            margin-right: .24rem;
            /*background: #00aaff;*/
            display: inline-block;
          }
          > div {
            display: inline-block;
            font-size: .32rem;
            .soures-title {
              color: rgba(34, 34, 34, 1);
            }
            .soures-desc {
              color: rgba(153, 153, 153, 1);
              font-size: .24rem;
              line-height: .33rem;
            }
          }
        }
        .check {
          color: rgba(102, 102, 102, 1);
          font-size: .28rem;
          &::after {
            content: '';
            width: .15rem;
            height: .15rem;
            border-right: 1px solid #999999;
            border-bottom: 1px solid #999999;
            transform: translateY(-.025rem) rotate(311deg);
            display: inline-block;
            margin-left: .2rem;
          }
        }
      }
    }
  }
</style>
