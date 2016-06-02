function manufacturerConfig(nga, admin) {

  var manufacturer = admin.getEntity('manufacturers');

  manufacturer.listView()
    .title('厂商管理')
    .fields([
<<<<<<< HEAD
      nga.field('name').label('名称'),
      nga.field('code').label('编码')
    ])
    .listActions(['edit', 'delete']);

  manufacturer.creationView()
    .fields([
      nga.field('name').label('名称'),
      nga.field('code').label('编码')
    ]);

  manufacturer.editionView()
    .fields([
      nga.field('name').label('名称'),
      nga.field('code').label('编码')
    ]);
=======
      nga.field('name').label('名称')
    ])
    .actions(['batch'])
    .listActions(['delete']);
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70

}
