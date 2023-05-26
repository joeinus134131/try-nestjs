const AdminUser = require('nestjs-admin').AdminUserEntity
module.exports = {
  /* ... */,
  entities: [/* ... */, AdminUser],
  // Alternatively:
  // entities: [/* ... */, 'node_modules/nestjs-admin/**/*.entity.js'],
}
