// src/admin/router.js
export default [
  {
    path: '/admin',
    component: () => import('@/admin/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/admin/views/Dashboard.vue'),
      },
      // boshqa admin sahifalar bu yerda bo'ladi
    ],
  },
]
