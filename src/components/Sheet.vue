<template>
  <v-bottom-sheet v-model="sheet">
    <v-btn
      v-if="type!=='download'"
      slot="activator"
      icon>
      <v-icon>settings</v-icon>
    </v-btn>
    <v-list class="sheet-container">
      <div class="sheet-header">
        <div class="text">{{ type==='download'?'Select':'Bitrate' }}</div>
        <v-btn v-if="type==='download'" small color="success" @click="download">Download</v-btn>
      </div>
      <v-radio-group v-model="radioGroup">
        <v-radio
          v-for="r in radioGroupData"
          :key="r.val"
          :label="r.text"
          :value="r.val"
          color="green accent-2"
        />
      </v-radio-group>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
// var downloadJS = require('downloadjs');
import { FLAC, MP3_320K, MP3_128K } from '@/api/config'
import { mapActions, mapGetters } from 'vuex'
import store from '@/vuex/store'

export default {
  name: 'Sheet',
  props: {
    type: String
  },
  data() {
    return {
      sheet: false,
      resource: null,
      radioGroup: this.type === 'download' ? 1 : store.state.playList.type,
      radioGroupData: [
        { val: FLAC, text: 'Flac (550 kbps)' },
        { val: MP3_320K, text: 'High (320 kbps)' },
        { val: MP3_128K, text: 'Standard (128 kbps)' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getType',
      'getPlayType'
    ])
  },
  watch: {
    radioGroup() {
      if (this.type === 'download'){
        return false
      }
      this.changeType(this.radioGroup)
    }
  },
  methods: {
    ...mapActions([
      'changeType'
    ]),
    download() {
      this.sheet = false
      // this.$emit('download')
      // this.validateSource()
      // if (this.validateSource()){
      // if (this.radioGroup === this.FLAC && this.validateSource()){
      //   window.open(this.getDiffSource())
      // }
      // const { name } = this.resource
      // var x = new XMLHttpRequest();
      // x.open('POST', this.getDiffSource(), true);
      // x.responseType = 'blob';
      // if (x.response.type === 'audio/mpeg'){
      //   console.log(13333)
      //   x.onload = function(e){
      //     downloadJS(e.target.response, `${name}.mp3`, 'audio/mpeg');
      //   }
      // } else {
      //   console.log(23333)
      //   window.open(this.getDiffSource())
      // }
      // x.send(null);
      // }
    },
    // getDiffSource(){
    //   const { flac, mp3_320k, mp3_128k } = this.resource
    //   if (this.radioGroup === this.FLAC){
    //     return flac
    //   } else if (this.radioGroup === this.MP3_320K){
    //     return mp3_320k
    //   } else if (this.radioGroup === this.MP3_128K){
    //     return mp3_128k
    //   }
    // }
    // validateSource(){
    //   const audioElement = document.createElement('audio')
    //   audioElement.setAttribute('src', this.getDiffSource())
    //   audioElement.audioElement = function() {
    //     console.log(2333)
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
  .sheet-container {
    padding: 8px 16px !important;
    min-width: 100vw;
    box-sizing: border-box;
    display: block;
    outline: 0;
    max-height: 80vh;
    overflow: auto;
    .sheet-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .text {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

</style>
