import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/routes'
import './assets/style.scss';
Vue.config.productionTip = false
import { LMap, LTileLayer, LMarker,LIcon,LGeoJson } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-icon', LIcon);
Vue.component('l-icon', LIcon);
Vue.component('l-geo-json', LGeoJson);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
