<template>
  <div class="listViewTop">
    <img class="bg" :src="playlist.coverImgUrl" alt="">
    <div class="listViewTopNav" >
      <div class="left" @click='$router.go(-1)'>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuojiantou--copy"></use>
        </svg>
        <div class="title">歌单</div>
      </div>
      <div class="right">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo1"></use>
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" alt="">
        <div class="count">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-bofang1" ></use>
        </svg> 
        <span>{{changeValue(playlist.playCount)}}</span>
        </div>
      </div>
      <div class="contentRight">
        <h3>{{playlist.name}}</h3>
        <div class="author">
          <img :src="playlist.creator.avatarUrl" alt="" class="header">
          <span>{{playlist.creator.nickname}}</span>
        </div>
        <div class="description">
          {{playlist.description}}
        </div>
      </div>
    </div>
    <div class="iconList">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-liaotian" ></use>
        </svg> 
        <span>{{playlist.commentCount}}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-share_icon" ></use>
        </svg> 
        <span>{{playlist.shareCount}}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-xiazai" ></use>
        </svg> 
        <span>下载</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-show_duoxuan" ></use>
        </svg> 
        <span>多选</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props:['playlist'],
  methods:{
    changeValue(number){
      let result = 0
      if(number > 10000){
        result =  number/10000
        result = result.toFixed(2)
      }
      return result + '万'
    },
  }

}
</script>

<style lang='less' scoped>
  .listViewTop{
    width: 7.5rem;
    padding: 0 0.4rem;
    // height: 6rem;
    .bg{
      position: fixed;
      left: 0;
      top: 0;
      width: 7.5rem;
      height: auto;
      z-index: -1;
      filter: blur(40px);
    }
    .listViewTopNav{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.2rem;
      font-size: 0.35rem;
      .icon{
        width: 0.5rem;
        height: 0.5rem;
        fill:#fff;
      }
    }
    .left,.right{
      display: flex;
      color: #fff;
    }
    .title{
      margin-left: 0.4rem;
    }
    .search{
      margin-right: 0.5rem;
    }
    .content{
      display: flex;
      justify-content: space-between;
      padding: 0.6rem 0;
      .contentLeft{
        position: relative;
        img{
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 0.1rem;
        }
        
        .count{
          position: absolute;
          top: 0rem;
          right: 0.1rem;
          color: #aaa;
          display: flex;
          align-items: center;
          .icon{
            width: 0.2rem;
            height: 0.2rem;
            fill: #ccc;
          }
        }
      }
      .contentRight{
        width: 3.5rem;
        h3{
          color: #fff;
        }
        .author{
          display: flex;
          align-items: center;
          margin: 0.2rem 0;
          img.header{
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 0.3rem;
            margin-right: 0.2rem;
          }
          span{
            color: #ccc;
            font-size: 0.26rem;
          }
        }
        .description{
          font-size: 0.24rem;
          color: #ccc;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }

    .iconList{
      display: flex;
      justify-content: space-around;
      .iconItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon{
          width: 0.5rem;
          height: 0.5rem;
          fill: #fff;
        }
        span{
          font-size: 0.3rem;
          padding-top: 0.2rem;
          color: #fff;
        }
      }
    }
  }
</style>