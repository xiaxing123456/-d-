<template>
  <div class="searchTop">
    <div class="searchTopNav">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou-"></use>
        </svg>
      </div>
      <div class="right">
        <input
          type="text "
          v-model="searchKeyWord"
          :placeholder="placeholder"
          @keydown.enter="saveKeyWord"
        />
      </div>
    </div>
    <div class="history" v-show="searchSongs.length == 0">
      <div class="historyLeft">历史</div>
      <div class="historyRight">
        <div @click="historySearch(item)" class="keywordItem" v-for="(item, i) in keywordList" :key="i">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="searchSongs" v-show="searchSongs.length!= 0">
      <div class="searchSongs-top">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <div class="text">
            <div class="title">播放全部</div>
            <div class="num">(共{{ searchSongs.length }}首)</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div
          class="playItem"
          v-for="(item, i) in searchSongs"
          :key="i"
          @click="setPlay(item,i)"
        >
          <div class="left">
            <div class="index">{{ i + 1 }}</div>
            <div class="content">
              <div class="title">{{ item.name }}</div>
              <div class="tags">
                <span
                  class="tag"
                  v-for="(tag, index) in searchSongs.tags"
                  :key="index"
                  >{{ tag }}</span
                >
                <span class="author">{{ item.album.name }}</span>
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
  </div>
</template>

<script>
import { getSearchMusic } from "@/api/index.js";
export default {
  data() {
    return {
      placeholder: "陈奕迅",
      keywordList: [],
      searchKeyWord: "",
      searchSongs: [],
    };
  },
  methods: {
    async saveKeyWord() {
      this.keywordList.push(this.searchKeyWord);
      this.keywordList = Array.from(new Set(this.keywordList)) 
      if(this.keywordList.length > 10){
        this.keywordList = this.keywordList.slice(this.keywordList.length-10,this.keywordList.length)
      }
      localStorage.keywordList = JSON.stringify(this.keywordList);
      let res = await getSearchMusic(this.searchKeyWord);
      console.log(res);
      this.searchSongs = res.data.result.songs;
      console.log(this.searchSongs)
      console.log(localStorage)
    },
    historySearch(keyword){
      this.searchKeyWord = keyword
      this.saveKeyWord()
    },
    setPlay(item,i){
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('pushPlaylist',item)
      this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)
      
    }
  },
  beforeMount() {
    this.keywordList = localStorage.keywordList
      ? JSON.parse(localStorage.keywordList)
      : [];
  },
};
</script>

<style lang='less' socped>
.searchTop {
  width: 7.5rem;
  height: calc(100vh - 1.2rem) ;
  overflow: scroll;
  padding: 0 0.4rem;
  .searchTopNav {
    display: flex;
    width: 100%;
    height: 1.2rem;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    padding: 0 0.4rem;
     box-shadow: 0 0.1rem 0.1rem rgba(100,100,100,0.1);

    .icon {
      width: 0.5rem;
      height: 0.6rem;
    }
    .right {
      padding: 0 0 0 0.4rem;
      flex: 1;
      input {
        border: none;
        outline: none;
        border-bottom: 2px solid #999;
        width: 100%;
        height: 0.6rem;
        font-size: 0.35rem;
      }
    }
  }
  .history {
    display: flex;
    margin-top: 1.2rem;
    .historyLeft {
      width: 1.8rem;
      height: 0.6rem;
      font-weight: 900;
      margin: 0.2rem 0rem;
      line-height: 0.6rem;
    }
    .historyRight {
      color: #666;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      .keywordItem {
        background-color: #eee;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.3rem;
        line-height: 0.6rem;
        margin: 0.1rem 0.1rem 0.2rem 0;
        font-size: 0.2rem;
      }
    }
  }
  .searchSongs {
    width: 7.5rem;
    // padding: 0 0.4rem;
    background: #fff;
    border-radius: 0.1rem 0.1rem 0 0;
    margin-top: 0.4rem;
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;
    .searchSongs-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
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
      .right {
        font-size: 0.25rem;
        color: #fff;
        background: orangered;
        line-height: 0.6rem;
        padding: 0.1rem;
        border-radius: 0.4rem;
      }
    }
    .list {
      .playItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        margin-bottom: 0.2rem;
        .left {
          display: flex;
          align-items: center;
          color: #666;
          .index {
            width: 0.5rem;
            height: 0.5rem;
            text-align: center;
          }
          .content {
            margin-left: 0.2rem;
          }
          .title {
            font-size: 0.3rem;
            font-weight: 600;
            color: #000;
            margin-bottom: 0.05rem;
          }
          .tags {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .tag {
            font-size: 0.2rem;
            color: orangered;
            border: 1px solid orangered;
            border-radius: 0.05rem;
            margin-left: 0.02rem;
          }
          .author {
            color: #666;
          }
        }
      }
      .right {
        display: flex;
        .icon {
          margin: 0 0.2rem;
        }
      }
    }
  }
}
</style>