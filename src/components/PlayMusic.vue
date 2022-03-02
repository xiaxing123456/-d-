<template>
  <div class="playMusic">
    <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
    <div class="playTop" @click="$emit('back')">
      <div class="back">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou--copy"></use>
        </svg>
      </div>
      <div class="center">
        <div class="title">
          <marquee behavior="scroll" direction="left">{{playDetail.al.name}}</marquee>
        </div>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-share_icon"></use>
        </svg>
      </div>
    </div>
    <div class="playContent" v-show="!isLyric">
        <img class="needle" :class="{active:!paused}" src="@/assets/images/playContent1.png" alt="">
        <img class="disc" src="@/assets/images/playContent2.png" alt="">
        <img class="playImg" :src="playDetail.al.picUrl" alt="">
    </div>
    <div class="playLyric" v-show='isLyric' ref="playLyric">
      <p :class="{active:(currentTime*1000 >= item.pre&&currentTime*1000 < item.time)}" v-for="(item,i) in $store.getters.lyricList" :key="i">
      {{item.lyric}}
      </p>
    </div>
    <div class="progress"></div>
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-047caozuo_shangyishou"></use>
      </svg>
      <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg v-else class="icon play" aria-hidden="true" @click="play">
        <use xlink:href="#icon-ziyuan100-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-49xiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:['playDetail','paused','play'],
  data(){
    return{
      isLyric:true
    }
  },
  computed:{
    ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),
  },
  methods:{
    goPlay(number){
      console.log(this.playlist)
      console.log(this.playCurrentIndex)
      let index = this.playCurrentIndex+number
      if(index < 0 ){
        index = this.playCurrentIndex.length -1
      }else if(index >= this.playCurrentIndex.length){
        index = 0
      }
        this.$store.commit('setPlayIndex',index)
      
    }
  },
  updated(){
    // console.log(this.paused)
    // console.log(this.currentTime)
  },
  watch:{
    currentTime(newValue){
      console.log(newValue)
      console.log([this.$refs.playLyric])
      let p = document.querySelector('p.active')
      console.log([p])
      let offsetTop = p.offsetTop;//当前的位置高
      let h = this.$refs.playLyric.offsetHeight;//整体高度
      console.log(offsetTop)
      console.log(h)
      console.log(this.$refs.playLyric.scrollTop)
      if(offsetTop >= 160){
        this.$refs.playLyric.scrollTop += 20; 
      }

    }
  }
}
</script>

<style lang='less' scoped>
.playMusic{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
   background-color: #fff;
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size:auto 100%;
    background-position: center;
    filter:blur(60px);
  }
  .playTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    padding: 0 0.4rem;
    .icon{
      fill: #fff;
      width: 0.5rem;
      height: 0.5rem;
    }
    .title{
      font-size: 0.4rem;
    }
    marquee{
      width: 5rem;
      flex: 1;
    }
  }
  .playContent{
    position: absolute;
    width: 7.5rem;
    height: 7.5rem;
    left: 0;
    top: 1.5rem;
    .needle{
      width: 2rem;
      height: auto;
      position: absolute;
      left: 50%;
      top: 0;
      transform-origin: 0.3rem 0;
      transform: rotate(-20deg);
      transition: all 1s;
      z-index: 1;
    }
    .needle.active{
      transform: rotate(0deg);
      transition: all 1s;
    }
    .disc{
      width: 5.5rem;
      height: 5.5rem;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0%);
      top: 1.8rem;
    }
    .playImg{
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1.75rem;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0%);
      top: 2.8rem;
    }
  }
  .playFooter{
    width: 7.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
    .icon{
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
    .icon.play{
      width: 1rem;
      height: 1rem;
    }
  }
  .playLyric{
    position: absolute;
    width: 7.5rem;
    height: 8rem;
    left: 0;
    top: calc(50% - 4rem);
    overflow: scroll;
    text-align: center;
    color: #fff;
    .active{
      color: orangered;
    }
  }
}
</style>