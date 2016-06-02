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
<<<<<<< HEAD
        .validation({required: true}),
      nga.field('code').label('编码')
        .validation({required: true})
    ]);

  model.editionView()
    .fields(model.creationView().fields());
=======
    ]);

  model.editionView()
    .fields([
      nga.field('name').label('名称'),
      nga.field('code').label('编码')
    ]);
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70

}
