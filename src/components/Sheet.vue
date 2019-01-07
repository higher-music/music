<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <v-btn
        slot="activator"
        icon
      >
        <v-icon>settings</v-icon>
      </v-btn>
      <v-list>
        <v-subheader>Bitrate</v-subheader>
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
  </div>
</template>

<script>
export default {
  name: 'Sheet',
  data: () => ({
    sheet: false,
    radioGroup: 1,
    radioGroupData: [
      { val: 1, text: 'Flac (550 kbps)' },
      { val: 2, text: 'High (256 kbps)' },
      { val: 3, text: 'Standard (64 kbps)' }
    ]
  })
}
</script>

<style scoped>

</style>
