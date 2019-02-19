<template>
  <v-bottom-sheet v-model="sheet" inset max-width="512px">
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
    <v-snackbar v-model="snackbar" :timeout="0" right>
      <v-progress-linear :indeterminate="true"/>
      <v-btn color="pink" flat @click="show = false">Close</v-btn>
    </v-snackbar>
  </v-bottom-sheet>
</template>
<script>
const downloadjs = require('downloadjs');
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
      snackbar: false,
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
      if (this.type === 'download') {
        return false
      }
      this.changeType(this.radioGroup)
    }
  },
  methods: {
    ...mapActions([
      'changeType'
    ]),
    async download() {
      this.sheet = false
      const source = await this.getDiffSource()
      if (this.radioGroup === FLAC) {
        fetch(source.src).then(res => {
          return res.blob()
        }).then(blob => {
          downloadjs(blob, `${source.name}.flac`);
        }).catch(() => {
          this.$noResources.show()
        })
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', source.src, true);
        xhr.responseType = 'blob';
        xhr.onload = (e) => {
          downloadjs(e.target.response, `${source.name}.mp3`);
        }
        xhr.onerror = () => {
          this.$noResources.show()
        }
        xhr.send(null);
      }
    },
    getDiffSource() {
      return new Promise((resolve, reject) => {
        const source = {}
        const { flac, mp3_320k, mp3_128k, name } = this.resource
        source.name = `${name}-${this.resource.singer[0].name}`
        if (this.radioGroup === FLAC) {
          source.src = flac
        } else if (this.radioGroup === MP3_320K) {
          source.src = mp3_320k
        } else if (this.radioGroup === MP3_128K) {
          source.src = mp3_128k
        }
        resolve(source)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .sheet-container {
    padding: 8px 16px !important;
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
