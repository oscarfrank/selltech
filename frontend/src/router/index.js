import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Admin from '../pages/Admin.vue';
import AdminUsed from '../pages/AdminUsed.vue';
import AdminEditDevice from '../pages/AdminEditDevice.vue';
import AdminAddDevice from '../pages/AdminAddDevice.vue';
import Used from '../pages/Used.vue';
import Settings from '../pages/Settings.vue';
import ChangePassword from '../pages/ChangePassword.vue';
import UserStorefront from '../pages/UserStorefront.vue';
import AddDevice from '../pages/AddDevice.vue';
import EditDevice from '../pages/EditDevice.vue';
import UserShop from '../pages/UserShop.vue';
import DeviceDetail from '../pages/DeviceDetail.vue';
import ProfileEdit from '../pages/ProfileEdit.vue';
import Dashboard from '../pages/Dashboard.vue';
import { useUserStore } from '../store';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/admin',
    component: Admin,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '/admin/used',
    component: AdminUsed,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '/admin/add',
    component: AdminAddDevice,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '/admin/edit/:id',
    component: AdminEditDevice,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: '/used',
    component: Used,
  },
  {
    path: '/settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
  {
    path: '/change-password',
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-devices',
    component: UserStorefront,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-device',
    component: AddDevice,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-device/:id',
    component: EditDevice,
    meta: { requiresAuth: true },
  },
  {
    path: '/shop/:username',
    component: UserShop,
  },
  {
    path: '/devices/:id',
    component: DeviceDetail,
  },
  {
    path: '/profile-edit',
    component: ProfileEdit,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userStore = useUserStore();
  let user = null;

  if (isAuthenticated) {
    try {
      const token = localStorage.getItem('token');
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      user = JSON.parse(jsonPayload);
      userStore.setUser(user);
    } catch (error) {
      console.error('Failed to decode token:', error);
      localStorage.removeItem('token');
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else if (to.matched.some(record => record.meta.isAdmin)) {
      if (user?.role === 'admin') {
        next();
      } else {
        next('/');
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
