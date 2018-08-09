<template>
  <div id="diskdetails">
    <x-header></x-header>
    <div class="host">
      <div class="host-item">
        <h6 class="title" v-if="!details.mounton && !details.mountonname && details.status == 1">挂载磁盘信息</h6>
        <h6 class="title" v-if="details.mounton && details.mountonname && details.status == 1">卸载磁盘信息</h6>
        <ul>
          <li>硬盘名称 <span style="vertical-align: middle;">{{diskname}}<img src="../../assets/img/back/Fill.png"
                                                                          style="padding-left: .2rem;"
                                                                          @click="rename=true"></span></li>
          <li>硬盘类型 <span>{{details.diskoffer == 'ssd' ? 'SSD' : details.diskoffer == 'sas' ? 'SAS' : 'SATA'}}</span>
          </li>
          <li>容量 <span>{{details.disksize}}GB</span></li>
          <li>状态 <span>{{details.status === 0 ? '欠费' : (details.status === 1 && !details.mounton && !details.mountonname) ? '可挂载' : (details.status === 1 && details.mounton && details.mountonname) ? '已启用（' + details.mountonname + ')' : details.status === -1 ? '异常' : details.status === 2 ? '创建中' : details.status === 3 ? '删除中' : details.status === 4 ? '卸载中' : details.status === 5 ? '挂载中' : details.status === 6 ? '备份中' : '--'}}</span>
          </li>
          <li>计费类型 <span>{{details.caseType == 1 ? '包年' : details.caseType == 2 ? '包月' : '实时'}}</span></li>
          <li>价格 <span>{{details.caseType == 1 ? details.cpCase+'/年' : details.caseType == 2 ? details.cpCase+'/月'  :details.cpCase+'/时' }}</span>
          </li>
          <li>创建时间 <span>{{details.createtime}}</span></li>
        </ul>
      </div>
    </div>

    <group>
      <popup-picker title="挂载" class="bei" :data="mountHostList" v-model="mount" :columns="2"
                    v-if="!details.mounton && !details.mountonname && details.status == 1"
                    @on-show="showMount" show-name @on-change="onChange"></popup-picker>
      <x-switch title="卸载" class="bei" v-if="details.mounton && details.mountonname && details.status == 1"
                @click.native="showUnload(details)"></x-switch>
    </group>
    <group class="delete" @click.native="delDisk">
      <p> 删除云硬盘</p>
    </group>

    <div v-transfer-dom>
      <confirm v-model="rename"
               title="修改硬盘"
               @on-confirm="ReDiskname">
        <div style="text-align:center;">
          <p style="font-size: .3rem;color: #888;padding-bottom: .2rem;">硬盘名称</p>
          <input v-model="newName" type="text"
                 style="text-align: center;font-size: .36rem;color: #333;width: 70%;outline: none;border: none;border-bottom: 1px solid #e7e7e7">
        </div>
      </confirm>
    </div>

    <toast v-model="showOK" type="text" is-show-mask :text="messageOK" position="middle" width="35%"></toast>
    <toast v-model="showError" type="text" is-show-mask :text="messageError" position="middle" width="35%"></toast>
  </div>
</template>

<script>
  import axios from '@/util/iaxios'
  import $store from '@/vuex'
  import {Grid, GridItem, CellFormPreview, Group, Cell, XHeader, XSwitch, Confirm, Toast, PopupPicker} from 'vux'
  function getDisk(cb, diskId) {
    axios.get('Disk/listDiskById.do', {
      params: {
        diskId,
        zoneId: $store.state.zone.zoneid,
      }
    }).then(response => {
      if (response.status == 200 && response.data.status == 1) {
        let disks = response.data.result[0]
        cb(disks)
      }
    })

  }
  export default{
    components: {
      Grid,
      GridItem,
      CellFormPreview,
      Group,
      Cell,
      XHeader,
      XSwitch,
      Confirm,
      Toast,
      PopupPicker
    },
    data (){
      window.scrollTo(0, 0);
      return {
        //重命名
        rename: false,
        diskname: '',
        newName: '',

        details: {},
        mount: [],
        mountHostList: [],
        showOK: false,
        messageOK: '',
        showError: false,
        messageError: ''
      }
    },
    beforeRouteEnter(to, from, next){
      let cb = (disks) => {
        next(vm => {
          vm.setData(disks)
        })
      }
      getDisk(cb, to.params.diskId)
    },
    methods: {
      // 获取磁盘数据
      setData(disks){
        this.details = disks
        this.diskname = this.details.diskname
      },
      //修改磁盘名称
      ReDiskname(){
        if (this.newName) {
          axios.get('Disk/updateDisk.do', {
            params: {
              zoneId: $store.state.zone.zoneid,
              diskId: this.details.diskid,
              diskName: this.newName
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.diskname = this.newName
            }
          })
        } else {
          this.$vux.toast.text('请输入磁盘名称', 'middle')
        }
      },
      // 卸载弹窗
      showUnload(details){
        this.$vux.confirm.show({
          title: '磁盘卸载',
          content: '是否将确认将硬盘（' + details.diskname + '）从主机（' + details.mountonname + '）卸载，卸载之后该主机将失去该硬盘所存信息',
          onConfirm: () => {
            this._unloadOk()
          }
        })
      },
      /* 确认卸载磁盘 */
      _unloadOk() {
        this.details.status = 4
        axios.get('Disk/detachVolume.do', {
          params: {
            zoneId: this.details.zoneid,
            diskId: this.details.diskid,
            VMId: this.details.mounton
          }
        }).then(response => {
          let cb = (data) => {
            this.setData(data)
          }
          getDisk(cb, this.$route.params.diskId)
          if (response.status == 200 && response.statusText == 'OK') {
            this.showOK = true
            this.messageOK = response.data.message
          } else {
            this.showError = true
            this.messageError = response.data.message
          }
        })
      },
      //挂载弹窗
      showMount(){
        axios.get('Disk/listAttachComputer.do', {
          params: {
            diskId: this.details.diskid,
            zoneId: this.details.zoneid,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            response.data.result.forEach(list => {
              this.mountHostList.push({name: list.computername, value: list.computerid, parent: 0})
            })
          }
        })
      },
      //确认挂载
      onChange(){
        this.details.status = 5
        axios.get('Disk/attachVolume.do', {
          params: {
            diskId: this.details.diskid,
            VMId: this.mount[0],
            zoneId: this.details.zoneid,
          }
        }).then(response => {
          let cb = (data) => {
            this.setData(data)
          }
          getDisk(cb, this.$route.params.diskId)
          if (response.status == 200 && response.statusText == 'OK') {
            this.showOK = true
            this.messageOK = response.data.message
          } else {
            this.showError = true
            this.messageError = response.data.message
          }
        })
      },
      //删除硬盘
      delDisk(){
        axios.get('Disk/delDisk.do', {
          params: {
            id: this.details.id,
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push('/ruicloud/bdisk')
            this.$vux.toast.text(response.data.message, 'middle')
          } else {
            this.$router.push('/ruicloud/bdisk')
            this.$vux.toast.text(response.data.message, 'middle')

          }
        })
      },
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host {
    background: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #e7e7e7;
    margin-bottom: .2rem;
    .host-item {
      .title {
        margin-left: .3rem;
        padding: .23rem 0 .2rem 0;
        font-size: .32rem;
        font-weight: normal;
        color: #222;
        line-height: .45rem;
        border-bottom: 1px solid #e7e7e7;
      }
      ul {
        margin-left: .3rem;
        li {
          padding: .24rem .3rem .24rem 0;
          border-bottom: 1px solid #e7e7e7;
          list-style: none;
          font-size: .28rem;
          color: #333;
          span {
            display: inline-block;
            font-size: .28rem;
            color: #666;
            float: right;
          }
          &:last-of-type {
            border-bottom: none;
          }
        ;
        }
      }
    }
  }

  .delete {
    p {
      font-size: .28rem;
      color: #FF0000;
      line-height: .4rem;
      padding: .24rem 0;
      text-align: center;
    }
  }
</style>
