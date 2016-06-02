function batchConfig(nga, admin) {

  var batch = admin.getEntity('batches');
  var model = admin.getEntity('models');

  batch.listView()
    .title('批次管理')
    .fields([
<<<<<<< HEAD
      nga.field('id').label('批次号'),
=======
      nga.field('id').label('订单号'),
>>>>>>> 1f15849db1279b4212bdd162b3dc58178731ae70
      nga.field('model', 'reference').label('型号')
        .targetEntity(model)
        .targetField(nga.field('name')),
      nga.field('amount', 'number').label('数量'),
      nga.field('createdAt').label('下单日期')
    ])
    .actions(['batch', 'create'])
    .listActions(['show', 'delete']);

  batch.creationView()
    .fields([
      nga.field('model', 'reference').label('型号')
        .targetEntity(model)
        .targetField(nga.field('name')),
      nga.field('amount', 'number').label('数量')
    ]);

  batch.showView()
    .fields([
      nga.field('model', 'reference').label('型号')
        .targetEntity(model)
        .targetField(nga.field('name')),
      nga.field('amount', 'number').label('数量'),
      nga.field('createdAt').label('下单日期')
    ]);

}
