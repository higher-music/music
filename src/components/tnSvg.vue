<template>
  <div :class="svgContainer">
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"/>
    </svg>
    <p :class="noTitle">{{ title }}</p>
  </div>
</template>
<script>
export default {
  name: 'TnSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      svgSelect: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    noTitle() {
      if (this.title === '') {
        return 'no-title'
      }
    },
    svgContainer() {
      if (this.title !== '') {
        return 'svg-container'
      }
    }
  }
}
</script>

<style scoped>
  .svg-container {
    cursor: pointer;
    box-sizing: border-box;
    min-width: 42px;
    height: 40px;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 2px;
  }

  .no-title {
    display: none;
  }

  .svg-icon {
    width: 1.3em;
    height: 1.3em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
