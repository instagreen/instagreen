const { Schema } = require('./schema');
const { password } = require('./config.example.js');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    // host: 'localhost',
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b10eb618184c08',
    password: '3c9d47f2',
    database: 'heroku_6060cc6c8db2b28',
    charset: 'utf8',
  },
});
const sequence = require('when/sequence');
const _ = require('lodash');

const createTable = tableName => (
  knex.schema.createTable(tableName, (table) => {
    let column;
    const columnKeys = _.keys(Schema[tableName]);
    _.each(columnKeys, (key) => {
      if (Schema[tableName][key].type === 'text' && Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      } else if (Schema[tableName][key].type === 'string' && Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      } else {
        column = table[Schema[tableName][key].type](key);
      }

      if (Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      } else {
        column.notNullable();
      }
      if (Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }
      if (Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'unique') && Schema[tableName][key].unique) {
        column.unique();
      }
      if (Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }
      if (Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'references')) {
        column.references(Schema[tableName][key].references);
      }
      if (Object.prototype.hasOwnProperty.call(Schema[tableName][key], 'defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  })
);
const createTables = () => {
  let tables = [];
  const tableNames = _.keys(Schema);
  tables = _.map(tableNames, tableName => (
    () => (
      createTable(tableName)
    )
  ));
  return sequence(tables);
};
createTables()
  .then(() => {
    console.log('Tables created!!');
    process.exit(0);
  })
  .catch((error) => {
    console.log('is it here');
    throw error;
  });
