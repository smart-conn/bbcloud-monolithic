function manufacturerConfig(nga, admin) {

  var manufacturer = admin.getEntity('manufacturers');

  manufacturer.listView()
    .title('厂商清单')
    .fields([
      nga.field('name').label('名称'),
      nga.field('code').label('编码')
    ])
    .actions(['batch', 'create'])
    .listActions(['<a class="btn btn-sm">加入</a>', 'delete']);

  manufacturer.creationView()
    .fields([
      nga.field('name').label('名称')
    ]);

  manufacturer.editionView()
    .fields([
      nga.field('name').label('名称')
    ]);

}
