<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Iframe',
  data() {
    return {
      text: ''
    }
  },
  created() {
    axios.get('https://y.qq.com/n/m/detail/taoge/index.html?ADTAG=newyqq.taoge&id=2947517062').then((res) => {
      this.text = res
    })
  }
}
</script>

<style scoped>

</style>
