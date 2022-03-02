import axios from 'axios';

let baseUrl = 'http://music.cpengx.cn'

//获取轮播图的api,type = 0: pc/1: android/2: iphone/3: ipad
export function getBanner(type = 2){
  return axios.get(`${baseUrl}/banner?type=${type}`)
}

//获取推荐歌单 limit:取出数量默认是10
export function getMusicList(limit = 10){
  return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}


//获取歌单的详情
export function getplaylistDetail(id){
  return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}

//获取歌词
export function getLyric(id){
  return axios.get(`${baseUrl}/lyric?id=${id}`)
}

//搜索歌曲
export function getSearchMusic(keyword){
  return axios.get(`${baseUrl}/search?keywords=${keyword}`)
}

export default{
  getBanner,getMusicList,getplaylistDetail,getLyric,getSearchMusic
}