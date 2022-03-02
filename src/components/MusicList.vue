<template>
  <div class="musicList">
    <div class="musicList-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <div class="swiper-container" id="musicSwiper">
        <div class="swiper-wrapper" >
          <router-link :to="{path:'/listview',query:{id:item.id}}" class="swiper-slide" v-for="(item,i) in musicList" :key="i">
            <img :src="item.picUrl" :alt="item.name">
            <div class="name">{{item.name}}</div>
            <div class="count">
              <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-bofang1" ></use>
              </svg> 
              <span style="font-size:0.1rem;">{{changeValue(item.playCount)}}</span> 
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/css/swiper.css';
import {getMusicList} from '@/api/index.js'
// import store from '@/store/index.js'
export default {
  data(){
    return{
      musicList:[]
    }
  },
  methods:{
    changeValue(number){
      let result = 0
      if(number > 10000){
        result =  number/10000
        result = result.toFixed(2)
      }
      return result + '万'
    }
  },
  async mounted(){
    let res  = await getMusicList()
    this.musicList = res.data.result

  },
  updated(){
    new Swiper('#musicSwiper',{
      slidesPerView:3,
      spaceBetween:10,
    })
  }
}
</script>


<style lang="less" scoped>
.musicList{
  width:7.5rem;
  padding:0 0.2rem;
  .musicList-top{
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title{
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more{
      border:1px solid #ccc;
      padding: 0.08rem 0.1rem;
      border-radius: 0.3rem;
      font-size: 0.2rem;
      height: 0.5rem;
      width: 1.4rem;
      text-align: center;
    }
  }
  .mlist{
    .swiper-container{
      width: 100%;
      height: 3rem;
      .swiper-slide{
        // background-color: orange;
        display: flex;
        flex-direction: column;
        position: relative;
        img{
          width: 100%;
          height: auto;
          border-radius: 0.1rem;
        }
        .name{
          height: 0.6rem;
          width: 100%;
          font-size: 0.24rem;
          line-height: 0.4rem;
        }
        .count{
          position: absolute;
          top: 0rem;
          right: 0.1rem;
          color: rgb(236, 236, 236);
          display: flex;
          align-items: center;
          .icon{
            width: 0.24rem;
            height: 0.24rem;
            fill: #ccc;
          }
        }
      }
    }
  }
}
</style>