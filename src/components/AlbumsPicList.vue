<template>
  <div class="grid-container">
    <div v-for="item in data" :key="item.id">
      <div class="list-container">
        <div class="list-wapper">
          <div class="image-wapper">
            <!--<img :src="item.img" :alt="item.name" :title="item.name">-->
            <v-img
              :src="item.img"
              :alt="item.name"
              :title="item.name"
              lazy-src="static/img/default.jpeg"
              @click="toDetail(item.id)"
            />
          </div>
          <div class="text-wapper text-truncate">
            <span>{{ item.name }}</span>
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
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    toDetail(id){
      this.$router.push({ path: `/${this.type}/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid-container{
    box-sizing: content-box;
    padding-top: 15px;
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
          div:hover {
            transition: opacity .3s;
            opacity: .7;
          }
          /*img{*/
            /*border-radius: 5px;*/
            /*width: 100%;*/
            /*height: 100%;*/
            /*transition: opacity .3s;*/
          /*}*/
        }
        .text-wapper{
          span{
            font-weight: 500;
            outline: 0;
            flex: 1;
          }
        }
      }
    }
  }

</style>
