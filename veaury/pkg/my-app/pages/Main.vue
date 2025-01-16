<script>
import { applyPureReactInVue } from 'veaury';
import LonghornReact from '../react_app';
import {VueProviderForReact} from '../pages/Provider';

export default {
  name: 'LonghornVueWrapper',
  components: {
    VueProviderForReact,
    PureLonghornReact: applyPureReactInVue(LonghornReact),
  },
};
</script>

<template>
  <VueProviderForReact>
    <PureLonghornReact />
  </VueProviderForReact>
</template>
