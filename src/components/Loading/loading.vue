<template>
  <div v-show="show" class="loading__container">
    <div class="modal"/>
    <div class="progress-container">
      <v-progress-circular
        :size="100"
        :width="10"
        color="purple"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
};
</script>
<style lang="scss" scoped>
  .loading__container{
    /*z-index: 2001;*/
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    .modal{
      /*z-index: 2000;*/
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(#1e3264,#04060c 130%);
    }
    .progress-container{
      /*z-index: 1020;*/
      position: absolute;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
    }
  }
</style>
