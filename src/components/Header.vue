<template>
  <div class="header_wrap">
    <div id="title">
      Twitter<span><img :src="require('@/assets/images/logo.png')" alt="logo" ref="logo" /></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header_wrap {
  #title {
    height: 15vh;
    font-size: 50px;
    color: #fff;
  }
  #title span {
    height: 100%;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  }
  #title img {
    height: 70%;
    max-width: 100%;
  }
}
</style>
