<template>
  <div class="grid-container">
    <div v-for="item in data" :key="item.id">
      <div class="list-container" @click="toAlbums(item)">
        <div class="list-wapper">
          <div class="image-wapper">
            <img :src="item.picUrl" :alt="item.topTitle" :title="item.topTitle">
          </div>
          <div class="text-wapper">
            <span>{{ item.topTitle }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    toAlbums(data){
      console.log(data,'1111')
      // this.$router.push({ path: '/albums/2312321' + data });
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-container{
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(186px,1fr));
    padding-left: 12px;
    padding-right: 12px;
    .list-container{
      display: flex;
      justify-content: center;
      .list-wapper {
        display: flex;
        flex-direction: column;
        width: 170px;
        padding-left: 8px;
        padding-right: 8px;
        padding-bottom: 20px;
        .image-wapper {
          background: 0 0/cover #212121;
          outline: 0;
          height: 170px;
          width: 170px;
          margin-bottom: 10px;
          border-radius: 5px;
          cursor: pointer;
          overflow: hidden;
        }
        img{
          border-radius: 5px;
          width: 100%;
          height: 100%;
          transition: opacity .3s;
        }
        .text-wapper{
          span{
            font-weight: 500;
            cursor: pointer;
            outline: 0;
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    }

</style>
