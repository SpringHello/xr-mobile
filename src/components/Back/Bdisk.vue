<template>
  <!--资源详情页面-->
  <div class="resouredetail">
    <x-header></x-header>
    <div class="box" v-if="list!=''">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="push(item)">
          <div class="soures">
            <!--<img src="../../assets/img/back/open.png">-->
            <div>
              <p class="soures-title">名称: {{item.title}}</p>
              <p class="soures-desc">
                <span>硬盘类型: {{item.desc == 'ssd' ? 'SSD' : item.desc == 'sas' ? 'SAS' : 'SATA'}}</span>
                <span>磁盘容量: {{item.capacity}}G</span>
              </p>
            </div>
          </div>
          <p class="check">详细信息</p>
        </li>
      </ul>
    </div>
    <p v-else style="color: #ccc;text-align: center;font-size: .3rem;margin: 50% auto;">暂无数据</p>
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
            this.address = 'diskdetail'
            var params={
              id:item.id
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
      let operate = null
      if (to.query.type=='disk') {
          url = 'Disk/listDisk.do'
          operate = (response) => {
            response.data.result.forEach(disk => {
              list.push({title: disk.diskname, desc: disk.diskoffer,id:disk.id,capacity:disk.disksize})
            })
          }
      }
      axios.get(url, {
        params: {
          zoneId: $store.state.zone.zoneid
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
            display: inline-block;
          }
          > div {
            display: inline-block;
            .soures-title {
              color: rgba(34, 34, 34, 1);
              font-size: .32rem;
            }
            .soures-desc {
              color: rgba(153, 153, 153, 1);
              font-size: .24rem;
              line-height: .33rem;
              padding-top: .08rem;
              span{
                &:last-of-type{
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
      }
    }
  }
</style>
