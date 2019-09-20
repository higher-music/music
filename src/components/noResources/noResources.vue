<template>
  <v-snackbar v-model="show" :timeout="3000" bottom>
    该歌曲没有有效音质源
    <v-btn :ripple="false" color="pink" flat @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>
