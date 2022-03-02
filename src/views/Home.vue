<template>
  <div class="home">
    <!-- 导航头 -->
    <top-nav></top-nav>
    <!-- 轮播图 -->
    <swipers></swipers>
    <!-- 列表 -->
    <icon-list></icon-list>
    <!-- 发现好歌单 -->
    <music-list></music-list>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import Swipers from '@/components/Swipers.vue'
import IconList from '@/components/IconList.vue'
import MusicList from '@/components/MusicList.vue'


export default {
  name: "Home",
  components: {
    TopNav,
    Swipers,
    IconList,
    MusicList,
  },
  data() {
    return {};
  },
  
};
</script>

<style lang="less" scoped>

</style>
