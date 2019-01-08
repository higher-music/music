import Progress from '@/components/Progress'

let $vm

export default {
  install(Vue, options) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(Progress);

      $vm = new LoadingPlugin({
        el: document.createElement('div')
      });

      document.body.appendChild($vm.$el);
    }
    $vm.show = false
    const loading = {
      show() {
        $vm.show = true;
        return $vm.show
      },
      hide() {
        $vm.show = false;
        return $vm.show
      }
    };

    if (!Vue.$loading) {
      Vue.$loading = loading;
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      }
    })
  }
}
