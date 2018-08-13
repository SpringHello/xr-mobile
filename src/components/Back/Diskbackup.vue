<template>
  <div>
    <x-header>硬盘备份</x-header>
    <div class="top">
      <img src="../../assets/img/back/yjfk.png">
      <div>
        <p>云硬盘数据服务为每块磁盘提供8个备份额度，当某块磁盘的备份数量达到额度上限，在创建新的备份任务时，系统会删除由自动备份策略所生成的时间最早的自动备份点。</p>
      </div>
    </div>

    <div class="backup">
      <p>您正为 <span>{{Diskname}}</span> 创建备份</p>
      <Group>
        <x-input title="备份名称" v-model="backName" placeholder="请输入磁盘备份名称"></x-input>
      </Group>
    </div>

    <button @click="created">提交</button>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {XHeader, XInput, Group} from 'vux'
  export default{
    components: {
      XHeader,
      XInput,
      Group
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.diskID = to.params.diskID
      })
    },
    data (){
      return {
        Diskname: sessionStorage.getItem('name'),
        diskID: '',
        //备份名称
        backName: '',
      }
    },
    methods: {
      //备份提交
      created(){
        if (this.backName) {
          axios.get('Snapshot/createDiskSnapshot.do', {
            params: {
              diskId: this.diskID,
              name: this.backName,
              zoneId: $store.state.zone.zoneid,
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$router.push('/ruicloud/DiskbackupList')
            } else {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        } else {
          this.$vux.toast.text('请输入磁盘备份名称', 'middle')
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .top {
    display: flex;
    justify-content: space-between;
    padding: .3rem .2rem;
    background: #F7FBFF;
    > div {
      width: 95%;
      p {
        font-size: .24rem;
        color: rgba(125, 161, 217, 1);
        line-height: .36rem;
      }
    }
    img {
      width: .32rem;
      height: .32rem;
    }
  }

  .backup {
    p {
      padding: .56rem 0 0 .39rem;
      font-size: .24rem;
      color: rgba(51, 51, 51, 1);
      line-height: .33rem;
      span {
        color: #4A90E2;
      }
    }
  }

  button {
    position: fixed;
    bottom: .48rem;
    width: 90%;
    margin: 0 5% 0 5%;
    padding: .19rem 0;
    outline: none;
    background: rgba(74, 144, 226, 1);
    border-radius: .1rem;
    border: none;
    font-size: .36rem;
    color: rgba(255, 255, 255, 1);
    line-height: .5rem;
  }
</style>
