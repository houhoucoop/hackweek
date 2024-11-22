<script>
import '../react_app/longhorn-ui/src/publicPath'

// import assets
import '../react_app/longhorn-ui/src/assets/iconfont/iconfont.eot'
import '../react_app/longhorn-ui/src/assets/iconfont/iconfont.svg'
import '../react_app/longhorn-ui/src/assets/iconfont/iconfont.ttf'
import '../react_app/longhorn-ui/src/assets/iconfont/iconfont.woff'

import {startApp, store} from '../dva'
import Main from './Main.vue'
import 'ant-design-vue/dist/antd.css'

export default {
  components: { Main },
  mounted() {
    if (store) {
      console.log('DVA store created successfully:', store);
    } else {
      console.error('DVA store creation failed');
    }
    startApp('#longhorn-app');
  }
}
</script>

<template>
  <div id="longhorn-app">
    <Main />
  </div>
</template>
