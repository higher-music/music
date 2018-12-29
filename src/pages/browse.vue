<!--
 @Author: ganp
 @Date: 2018/12/28 19:28
 @ProjectName: high-material-music
 @title: browse
-->
<template>
  <div>
    <div class="section-title">Top Albums</div>
    <AlbumsList/>

  </div>
</template>

<script>
import AlbumsList from '@/components/AlbumsList'
export default {
  components: { AlbumsList },
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
  })
}
</script>

<style scoped>
  .section-title{
    cursor: default;
    line-height: normal;
    font-size: 24px;
    font-weight: 500;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 5px;
  }
</style>
