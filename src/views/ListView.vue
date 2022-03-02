<template>
  <div class="listView">
    <!-- 头部 -->
    <list-view-top :playlist='playlist'></list-view-top>
    <!-- 播放列表 -->
    <play-list :playlist='playlist'></play-list>
  </div>
</template>

<script>
import ListViewTop from '@/components/ListView/LIstViewTop.vue'
import PlayList from '@/components/ListView/PlayList.vue'
import {getplaylistDetail} from '@/api/index'
export default {
  components:{
    ListViewTop,
    PlayList,
  },
  data(){
    return{
      id:null,
      list:[],
      playlist:{
        creator:{},
        tracks:[],
      }
    }
  },
  created(){
    this.id = this.$route.query.id
  },
  async mounted(){
    let res = await getplaylistDetail(this.id);
    // console.log(res)
    this.playlist = res.data.playlist
    this.$store.commit('setPlaylist',this.playlist.tracks)
    // console.log(this.playlist)
  }
}
</script>

<style>

</style>