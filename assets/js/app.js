import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './views/App.vue';
import router from './routes.js';
import registerComponents from './component';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

window.swal = require('sweetalert2');
window.toast = toast;
defineElement(lottie.loadAnimation);

const pinia = createPinia();
const app = createApp(App)

registerComponents(app);

app.use(router);
app.use(pinia);
app.mount('#app')

export default {app, router}