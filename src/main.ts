import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { faSpinner, faHeart as fasHeart, faArrowDown, faCircle as fasCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, faPaperPlane, faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);
app.use(createPinia());
library.add(faSpinner, fasHeart, farHeart, faPaperPlane, faArrowDown, farCircle, fasCircle, faChevronLeft);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);

app.mount('#app');