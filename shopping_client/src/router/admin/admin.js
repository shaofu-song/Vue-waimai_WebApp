export default {
  path : '/admin',
  component : () => import('../../pages/Admin/Admin'),
  children : [
      {
          path : 'emailUserManage',
          component : () => import('../../pages/Admin/EmailUserManage')
      },
      {
          path : 'shopManage',
          component : () => import('../../pages/Admin/ShopManage')
      },
      {
          path : 'orderManage',
          component : () => import('../../pages/Admin/OrderManage')
      },
      {
          path : '/admin',
          redirect : 'emailUserManage'
      }
  ]
}