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
        .validation({required: true}),
      nga.field('code').label('编码')
        .validation({required: true})
    ]);

  model.editionView()
    .fields(model.creationView().fields());

    model.deletionView()
        .title('删除设备型号')
}
