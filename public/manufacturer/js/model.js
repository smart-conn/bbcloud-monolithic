function modelConfig(nga, admin) {

  var model = admin.getEntity('models');

  model.listView()
    .title('设备型号')
    .fields([
      nga.field('name').label('名称'),
      nga.field('code').label('编码')
    ])
    .listActions(['edit', 'delete']);

  model.creationView()
    .title('建立新型号')
    .fields([
      nga.field('name').label('名称')
    ]);

  model.editionView()
    .fields([
      nga.field('name').label('名称'),
      nga.field('code').label('编码')
    ]);

}
