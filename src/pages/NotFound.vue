<template>
  <div class="all">
    <span class="text">404</span>
    <router-link :replace="true" to="/browse" tag="u" style="cursor: pointer">回到首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.all {
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.text {
  font-size: 80px;
  font-weight: bolder;
}
</style>
