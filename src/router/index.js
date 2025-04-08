// router.js
import { createRouter, createWebHistory } from 'vue-router';

// Импорт компонентов страниц
import Home from '../views/HomeView.vue';
import Catalog from '../views/CatalogView.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Service from '../views/ServiceView.vue';
import Contacts from '../views/Contacts.vue';
import AdminList from '@/views/AdminList.vue';
import AdminAdd from '@/views/AdminAdd.vue';
import AdminEdit from '@/views/AdminEdit.vue';


// Определяем маршруты
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/catalog/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/service', name: 'Service', component: Service },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/admin', component: AdminList },
  { path: '/admin/add', component: AdminAdd },
  { path: '/admin/edit/:id', component: AdminEdit, props: true },];

// Создаём экземпляр роутера с заданной историей и поведением скролла
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
