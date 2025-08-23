export default [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/admin/views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/admin/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/admin/views/Dashboard.vue'),
      },
      // boshqa sahifalar
    ],
  },
]
