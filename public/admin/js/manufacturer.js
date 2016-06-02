function manufacturerConfig(nga, admin) {

  var manufacturer = admin.getEntity('manufacturers');

  manufacturer.listView()
    .title('厂商管理')
    .fields([
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

}
