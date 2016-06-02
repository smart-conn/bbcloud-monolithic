function menuConfig(nga, admin) {
  return nga.menu()
    .addChild(nga.menu()
      .title('批次管理')
      .icon('<i class="fa fa-briefcase fa-fw"></i>')
      .link('/batches/list')
    )
    .addChild(nga.menu()
      .title('型号管理')
      .icon('<i class="fa fa-mobile fa-fw"></i>')
      .link('/models/list')
<<<<<<< HEAD
=======
    )
    .addChild(nga.menu()
      .title('厂商设置')
      .icon('<i class="fa fa-gear fa-fw"></i>')
      .link('/404')
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
    );
}
