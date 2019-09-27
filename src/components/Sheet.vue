<template>
  <v-bottom-sheet v-model="sheet" inset max-width="512px">
    <v-btn
      v-if="type!=='download'"
      slot="activator"
      :ripple="false"
      icon>
      <v-icon>settings</v-icon>
    </v-btn>
    <v-list class="sheet-container">
      <div class="sheet-header">
        <div class="text">{{ type==='download'?'Select':'Bitrate' }}</div>
        <v-btn v-if="type==='download'" :ripple="false" round @click="download">Download</v-btn>
      </div>
      <v-progress-linear
        v-show="progress"
        v-model="valueDeterminate"
        indeterminate
        color="green accent-2"/>
      <v-radio-group v-show="!progress" v-model="radioGroup">
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
  import {FLAC, MP3_128K, MP3_320K} from '@/api/config'
  import {mapActions, mapGetters} from 'vuex'
  import store from '@/vuex/store'

  export default {
  name: 'Sheet',
  props: {
    type: String
  },
  data() {
    return {
      sheet: null,
      progress: true,
      valueDeterminate: 0,
      resource: null,
      radioGroup: this.type === 'download' ? 3 : store.state.playList.type,
      key: [FLAC, MP3_320K, MP3_128K],
      radioGroupData: [],
      data: []
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
        this.setRadioGroupData()
        this.progress = false
        this.valueDeterminate = 0
      }
    }
  },
  mounted(){
    this.setRadioGroupData()
  },
  methods: {
    // 初始化按钮数据
    setRadioGroupData(){
      this.radioGroupData = [
        { val: FLAC, text: 'Flac (550 kbps)' },
        { val: MP3_320K, text: 'High (320 kbps)' },
        { val: MP3_128K, text: 'Standard (128 kbps)' }
      ]
    },
    ...mapActions([
      'changeType'
    ]),
    async initDownload(){
      this.progress = true
      const source = await this.getSource()
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      for (let i = 0; i < 3; i++) {
        xhr.open('POST', source[i][this.key[i]], true);
        xhr.onload = (e) => {
          if (e.target.status === 200) {
            const temp = []
            temp.push(this.radioGroupData[i])
            this.radioGroupData = temp
            this.data.src = source[i][this.key[i]]
            this.data.name = source.name
            this.progress = false
          }
        }
      }
      xhr.send(null);
    },
    async download() {
      var a = document.createElement('a')
      var event = new MouseEvent('click')
      a.download = this.data.name
      a.href = this.data.src
      a.dispatchEvent(event)
    },
    getSource() {
      return new Promise((resolve, reject) => {
        const source = []
        const { flac, mp3_320k, mp3_128k, name } = this.resource
        source.name = `${name}-${this.resource.singer[0].name}`
        source.push({ 1: flac }, { 2: mp3_320k }, { 3: mp3_128k })
        resolve(source)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .sheet-container {
        background: linear-gradient(to bottom, #414345, #232526) !important;
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
