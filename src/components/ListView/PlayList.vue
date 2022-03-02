<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ playlist.tracks.length }}首)</div>
        </div>
      </div>
      <div class="right">+ 收藏（{{changeValue(playlist.subscribedCount)}}）</div>
    </div>
    <div class="list">
      <div class="playItem" v-for="(item,i) in playlist.tracks" :key="i" @click="setPlayIndex(i)">
        <div class="left">
          <div class="index">{{i+1}}</div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="tags">
              <span class="tag" v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</span>
              <span class="author">{{item.al.name}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo1"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapMutations
} from 'vuex'
export default {
  props: ["playlist"],
  methods:{
    changeValue(number){
      let result = 0
      if(number > 10000){
        result =  number/10000
        result = result.toFixed(1)
      }
      return result + '万'
    },
    ...mapMutations(['setPlayIndex'])
  },
  
};
</script>

<style lang='less' scoped>
.playlist {
  width: 7.5rem;
  padding: 0 0.4rem;
  background: #fff;
  border-radius: 0.1rem 0.1rem 0 0;
  margin-top: 0.4rem;
  .playlist-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:1rem;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.2rem;
      }
      .text {
        display: flex;
        align-items: center;
        .title {
          font-size: 0.35rem;
          font-weight: 600;
        }
        .num {
          font-size: 0.25rem;
          color: #ccc;
        }
      }
    }
    .right{
      font-size: 0.25rem;
      color: #fff;
      background: orangered;
      line-height: 0.6rem;
      padding: 0.1rem;
      border-radius: 0.4rem;
    }
  }
  .list{
    .playItem{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      margin-bottom: 0.2rem;
      .left{
        display: flex;
        align-items: center;
        color: #666;
        .index{
          width: 0.5rem;
          height: 0.5rem;
          text-align: center;
        }
        .content{
          margin-left: 0.2rem;
        }
        .title{
          font-size: 0.3rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.05rem;
        }
        .tags{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .tag{
          font-size: 0.2rem;
          color: orangered;
          border: 1px solid orangered;
          border-radius: 0.05rem;
          margin-left: 0.02rem;
        }
        .author{
          color: #666;
        }
      }
    }
    .right{
      display: flex;
      .icon{
        margin: 0 0.2rem;
      }
    }
    
  }
}
</style>