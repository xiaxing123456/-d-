<template>
<div id="swipercom">
  <div class="swiper-container" id="bannerSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,i) in imgs" :key="i"><img :src="item.pic" alt=""></div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/css/swiper.css';
import {getBanner} from '../api/index.js'
export default {
  data(){
    return{
      imgs:[],
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  async mounted() {
    let res = await getBanner(1)
    this.imgs = res.data.banners
    // console.log(res)
  },
  updated(){
        new Swiper("#bannerSwiper", {
      // direction: "vertical", // 垂直切换选项
      loop: true, // 循环模式选项
      autoplay:true,//自动切换
      // effect : 'coverflow',//切换效果
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
      // freeMode:true,//抵抗反弹
    });
  }

};
</script>

<style lang='less' >
#swipercom{
  width: 7.5rem;

  .swiper-container {
    width: 7.1rem;
    height: 2.6rem;
    border-radius: 0.1rem;
    margin-top: 0.15rem;
  }
  .swiper-slide img {
    width: 100%;
    // height: 100%;
  }
  .swiper-pagination-bullet-active{
    background-color: orangered;
  }
}
</style>