<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header>云硬盘</x-header>
    <Group>
      <popup-picker title="节点选择" :data="nodeList" v-model="nodes" :columns="3" show-name></popup-picker>
    </Group>
    <div class="box" v-if="list!=''">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="push(item)">
          <div class="soures">
            <div>
              <p class="soures-title">{{item.diskname}}</p>
              <p class="soures-desc">
                <span>硬盘类型: {{item.diskoffer.toUpperCase()}}</span>
                <span>磁盘容量: {{item.disksize}}G</span>
              </p>
            </div>
          </div>
          <p class="check">详细信息</p>
        </li>
      </ul>
    </div>
    <div v-else class="nodata">
      <img src="../../assets/img/back/zero.png">
      <p> 暂无数据 </p>
    </div>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Group, Cell, CellBox, XHeader, PopupPicker} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XHeader,
      PopupPicker
    },
    beforeRouteEnter(to, from, next){
      axios.get('Disk/listDisk.do', {
        params: {
          zoneId: $store.state.zone.zoneid
        }
      }).then(response => {
        next(vm => {
          vm.setData(response.data.result)
        })
      })
    },
    watch: {
      nodes(){
        axios.get('Disk/listDisk.do', {
          params: {
            zoneId: this.nodes[0]
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.setData(response.data.result)
          }
        })
      },
    },
    data () {
      window.scrollTo(0, 0);
      let nodeList = []
      let nodes = []
      $store.state.zoneList.forEach(e => {
        nodeList.push({name: e.zonename, value: e.zoneid})
      })
      nodes = [$store.state.zone.zoneid]
      return {
        list: [],
        //节点选择
        nodeList,
        nodes,
      }
    },
    methods: {
      push(item){
        let address = `diskdetail/${item.diskid}`
        this.$router.push({path: address})
      },
      setData(list){
        this.list = list
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .box {
    margin-top: .2rem;
    border-top: 1px solid #e7e7e7;
    ul {
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid #e7e7e7;
      li {
        border-bottom: 1px solid #e7e7e7;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: .3rem;
        padding: .2rem .3rem .2rem 0;
        .soures {
          display: flex;
          align-items: center;
          /*img {*/
          /*width: .8rem;*/
          /*margin-right: .24rem;*/
          /*}*/
          > div {
            .soures-title {
              color: rgba(34, 34, 34, 1);
              font-size: .32rem;
            }
            .soures-desc {
              color: rgba(153, 153, 153, 1);
              font-size: .24rem;
              line-height: .33rem;
              padding-top: .08rem;
              span {
                &:last-of-type {
                  display: inline-block;
                  padding-left: .25rem;
                }
              }
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
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }

  .nodata {
    text-align: center;
    margin: 50% auto;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    p {
      font-size: .36rem;
      color: rgba(153, 153, 153, 1);
      line-height: 0;
    }
  }
</style>
