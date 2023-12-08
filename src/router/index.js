import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../views/product/IndexView.vue'
import ProductDetail from '../views/product/DetailView.vue'
import Cart from '../views/cart/IndexView.vue'
import NotFound from '../views/errors/404View.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Product',
    component: Product
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '*',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
