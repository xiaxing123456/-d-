import { createStore } from 'vuex'
import api from '@/api/index.js'
export default createStore({
  state: {
    playlist:[
      {
        name: "朝夕盼风",
        id: 1864091407,
        al:{
          id: 130866498,
          name: "朝夕盼风",
          pic: 109951166215099520,
          picUrl: "http://p3.music.126.net/VpOrTwQXtRdRdkeyDJnKNw==/109951166215099515.jpg",
          pic_str: "109951166215099515"
        }
      }
    ],
    playCurrentIndex:0,
    lyric:'',
    currentTime:0,
    intervalId:0,
  },
  getters:{
    lyricList(state){
      let arr =  state.lyric.split(/\n/igs).map((item,i,arr) => {
        let min = parseInt(item.slice(1,3)) ;
        let sec = parseInt(item.slice(4,6)) ;
        let mill = parseInt(item.slice(7,10)) ;
        return {
          min,
          sec,
          mill,
          lyric:item.slice(12,item.length),
          content:item,
          time:mill+sec*1000+min*60*1000
        }
      })
      arr.forEach((item,i) => {
        if(i==0){
          item.pre = 0
        }else{
          item.pre = arr[i-1].time
        }
      })
      console.log(arr)
      return arr 
      
    }
  },
  mutations: {
    setPlaylist:function(state,value){
      state.playlist = value
    },
    pushPlaylist(state,value){
      state.playlist.push(value)
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
    },
    setLyric(state,value){
      state.lyric = value
    },
    setCurrentTime(state,value){
      state.currentTime = value
    }
  },
  actions: {
    async reqLyric(content,payload){
      // console.log(payload)
      let res = await api.getLyric(payload.id)
      content.commit('setLyric',res.data.lrc.lyric)
      console.log(res.data.lrc.lyric)
    },
  },
  modules: {
  }
})
