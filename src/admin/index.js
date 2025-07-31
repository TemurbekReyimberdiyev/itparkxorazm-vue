// src/admin/router.js
export default [
  {
    path: '/admin',
    component: () => import('./layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('./views/Dashboard.vue'),
      },
      // boshqa admin sahifalar bu yerda bo'ladi
    ],
  },
]
