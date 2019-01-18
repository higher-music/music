<template>
  <v-bottom-sheet v-model="sheet">
    <v-btn
      slot="activator"
      icon>
      <v-icon>settings</v-icon>
    </v-btn>

    <v-list class="sheet-container">
      <div class="bitrate-text">Bitrate</div>
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
import { FLAC, MP3_320K, MP3_128K } from '@/components/js/utils'
import { mapActions } from 'vuex'
import store from '@/vuex/store'

export default {
  name: 'Sheet',
  data() {
    return {
      sheet: false,
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
    ])
  }
}
</script>

<style scoped>
  .sheet-container {
    padding: 8px 16px !important;
    min-width: 100vw;
    box-sizing: border-box;
    display: block;
    outline: 0;
    max-height: 80vh;
    overflow: auto;
  }

  .bitrate-text {
    font-size: 18px;
    font-weight: 500;
  }
</style>
