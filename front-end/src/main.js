import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './views/ShoppingCartPage.vue';
import ProductsPage from './views/ProductsPage.vue';
import ProductDetailPage from './views/ProductDetailPage.vue';
import NotFoundPage from './views/NotFoundPage.vue';

createApp(App)
.use(VueRouter.createRouter({
    history:VueRouter.createWebHistory(process.env.BASE_URL),
    routes:[{
        path: '/cart',
        component: ShoppingCartPage
    },{
        path: '/products',
        component: ProductsPage
    },{
        path: '/products/:productId',
        component: ProductDetailPage
    },{
        path: '/:pathMatch(.*)*',
        component: NotFoundPage
    }]
}))
.mount('#app')
