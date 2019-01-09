<template>
  <div v-show="show" class="progress-container">
    <v-progress-circular
      :size="100"
      :width="10"
      color="purple"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<style>
.progress-container{
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
</style>
