// Don't forget to create a VueJS page called index.vue in the /pages folder!!!
import App from '../pages/App.vue';

const BLANK_CLUSTER = '_';
const YOUR_PRODUCT_NAME = 'longhorn-hack';

const routes = [
  {
    name: `${YOUR_PRODUCT_NAME}-c-cluster`,
    path: `/${YOUR_PRODUCT_NAME}/c/:cluster`,
    component: App,
    meta: {
      product: YOUR_PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg: YOUR_PRODUCT_NAME,
    },
  },
];

export default routes;