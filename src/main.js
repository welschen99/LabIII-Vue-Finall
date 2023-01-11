import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import VueApexCharts from "vue3-apexcharts";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

createApp(App)
.use(store)
.use(router)
.use(VueApexCharts)
.use(LoadingPlugin)
.mount('#app')
