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
      <!--eslint-disable vue/valid-v-model-->
      <v-radio-group v-model="type==='download'?1:radioGroup">
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
var downloadJS = require('downloadjs');
import { FLAC, MP3_320K, MP3_128K } from '@/api/config'
import { mapActions } from 'vuex'
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
      radioGroup: store.state.playList.type,
      radioGroupData: [
        { val: FLAC, text: 'Flac (550 kbps)' },
        { val: MP3_320K, text: 'High (320 kbps)' },
        { val: MP3_128K, text: 'Standard (128 kbps)' }
      ]
    }
  },
  watch: {
    radioGroup() {
      this.changeType(this.radioGroup)
    }
  },
  methods: {
    ...mapActions([
      'changeType'
    ]),
    download() {
      this.sheet = false
      console.log(this.resource)
      const { mp3_128k, name } = this.resource
      var x = new XMLHttpRequest();
      x.open('GET', mp3_128k, true);
      x.responseType = 'blob';
      x.onload = function(e){ downloadJS(e.target.response, `${name}.mp3`, 'audio/mpeg'); };
      x.send();
    }
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
