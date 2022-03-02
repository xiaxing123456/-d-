<template>
  <div class="playController">
    <div class="left" @click="show=!show">
      <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
      <div class="content">
        <div class="title">{{playlist[playCurrentIndex].al.name}}</div>
        <div class="tips">横划可以切上下首歌</div>
      </div>
    </div>
    <div class="right">
      <svg v-if="paused" class="icon" aria-hidden="true" @click="play">
        <use  xlink:href="#icon-bofang3"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon"></use>
      </svg>
    </div>
    <play-music :paused='paused' :play='play' @back='show=!show' v-show="show" :playDetail='playlist[playCurrentIndex]' ></play-music>
    <audio ref='audio' :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script>
import PlayMusic from '@/components/PlayMusic.vue'
import{
  mapGetters,
  mapState,
} from 'vuex'
export default {
  components:{
    PlayMusic,
  },
  data(){
    return{
      paused:true,
      show:false
    }
  },
  computed:{
    ...mapState(['playlist','playCurrentIndex','currentTime']),
    ...mapGetters(['lyricList'])
  },
  methods:{
    play(){
      console.log(this.$refs.audio.currentTime)
      if(this.$refs.audio.paused){
        
        this.$refs.audio.play()
        this.paused = false
        this.updateTime()
      }else{
        this.$refs.audio.pause()
        this.paused = true
        clearInterval(this.$store.state.id)
      }
    },
    updateTime(){
      this.$store.state.id = setInterval(() =>{
        this.$store.commit('setCurrentTime',this.$refs.audio.currentTime)
      },1000)
    }
  },
  mounted(){
    this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    // console.log([this.$refs.audio])
    
    
  },
  updated(){
    this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    // this.updateTime()
    console.log({id:this.playlist[this.playCurrentIndex].id})
    // console.log(this.$store.state.playlist[this.$store.state.playCurrentIndex])
  }
}
</script>

<style lang='less' scoped>
.playController{
  background: #fff;
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -0.02rem 0 rgba(100,100,100,0.1);
  .left{
    display: flex;
    padding: 0 0.2rem;
    img{
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .content{
      padding: 0  0.2rem;
      .tips{
        font-size: 0.2rem;
        color: #999;
      }
    }
  }
  .right{
    .icon{
      margin: 0 0.2rem;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}
</style>