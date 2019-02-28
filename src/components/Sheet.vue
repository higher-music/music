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
        <v-btn v-if="type==='download'" round @click="download">Download</v-btn>
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
      <v-progress-linear
        v-show="progress"
        :indeterminate="indeterminate"
        v-model="valueDeterminate"
        color="green accent-2"/>
    </v-list>
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
      sheet: null,
      progress: null,
      valueDeterminate: 0,
      resource: null,
      indeterminate: false,
      radioGroup: this.type === 'download' ? 3 : store.state.playList.type,
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
    },
    sheet(newValue, oldValue) {
      if (!newValue) {
        this.progress = false
        this.valueDeterminate = 0
      }
    }
  },
  methods: {
    ...mapActions([
      'changeType'
    ]),
    async download() {
      this.progress = true
      const source = await this.getDiffSource()
      if (this.radioGroup === FLAC) {
        this.indeterminate = true
        fetch(source.src).then(res => res.blob()).then(blob => {
          downloadjs(blob, `${source.name}.flac`);
        }).then(() => {
          this.progress = false
          this.sheet = false
        }).catch(() => {
          this.progress = false
          this.$noResources.show()
        })
      } else {
        this.indeterminate = false
        this.progress = true
        var xhr = new XMLHttpRequest();
        xhr.open('POST', source.src, true);
        xhr.responseType = 'blob';
        xhr.addEventListener('progress', (ev) => {
          var max = ev.total;
          var value = ev.loaded;
          this.valueDeterminate = (value / max) * 100
        });
        xhr.onload = (e) => {
          downloadjs(e.target.response, `${source.name}.mp3`)
          this.sheet = false
        }
        xhr.onerror = () => {
          this.progress = false
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
        font-weight: 700;
      }
    }
    .v-input--selection-controls {
      margin-top: 6px;
    }
    /deep/ .v-input__slot {
      margin-bottom: 0;
    }
  }

</style>
