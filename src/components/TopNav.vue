<template>
    <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
      <div class="topCenter">
        <span class="navBtn">我的</span>
        <span class="navBtn active">发现</span>
        <span class="navBtn">云村</span>
        <span class="navBtn">视频</span>
      </div>
      <div class="topRight" @click="$router.push('/search')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>  
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.topNav{
  width: 7.5rem;
  height: 1rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  box-shadow: 0 0.02rem 0.02rem rgba(100,100,100,0.1);
  .icon{
    width: 0.4rem;
    height: 0.4rem;
    
  }
  .topCenter{
    width: 5rem;
    display: flex;
    justify-content: space-around;
    margin: 0 1.2rem;
    .active{
      font-weight: 900;
      
    }
  }
}
</style>