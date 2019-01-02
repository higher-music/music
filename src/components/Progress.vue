<template>
  <div class="progress-container">
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
  name: 'Progress'
}
</script>

<style scoped>
.progress-container{
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
</style>
