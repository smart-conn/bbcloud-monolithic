function manufacturerConfig(nga, admin) {

  var manufacturer = admin.getEntity('manufacturers');

  manufacturer.listView()
    .title('厂商管理')
    .fields([
      nga.field('name').label('名称')
    ])
    .actions(['batch'])
    .listActions(['delete']);

}
