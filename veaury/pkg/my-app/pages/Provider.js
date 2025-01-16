import {createCrossingProviderForPureReactInVue} from 'veaury'
import {store} from '../dva'

const [useVueHooksInReact, VueProviderForReact, reactContext] = createCrossingProviderForPureReactInVue(function() {
  return {
    store: store
  }
})

export {
  useVueHooksInReact,
  VueProviderForReact,
  reactContext
}