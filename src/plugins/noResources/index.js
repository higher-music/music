import noSourcePopupComponent from './noResources.vue'

let $vm

export default {
  install(Vue, options) {
    if (!$vm) {
      const NoSourcePopupPlugin = Vue.extend(noSourcePopupComponent);
      $vm = new NoSourcePopupPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    $vm.show = false;

    const noResources = {
      show() {
        $vm.show = true;
      },
      hide() {
        $vm.show = false;
      }
    };

    if (!Vue.$noResources) {
      Vue.$noResources = noResources;
    }

    Vue.mixin({
      created() {
        this.$noResources = Vue.$noResources;
      }
    })
  }
}
