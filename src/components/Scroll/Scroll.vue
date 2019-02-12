<template>
  <div ref="wrapper" class="scroll">
    <slot/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    listenScroll: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        mouseWheel: true,
        scrollbar: {
          fade: false,
          interactive: true
        },
        dblclick: true,
        probeType: 3
      })

      if (this.listenScroll) {
        const me = this
        this.scroll.on('scroll', (pos) => {
          const a = document.getElementsByClassName('v-menu__content')
          const b = Array.from(a)
          for (let i = 0; i < b.length; i++){
            b[i].style.display = 'none'
          }
          me.$emit('scroll', pos)
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>
<style>
  .scroll{
    height: 100%;
  }
</style>
