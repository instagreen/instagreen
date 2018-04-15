const { Schema } = require('./schema');
require('dotenv/config');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    // host: 'localhost',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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


const createFks = () => {
  const tables = [];

  tables.push(() => (knex.schema.table('posts', (posts) => {
    posts.integer('user_id').unsigned();
    posts.foreign('user_id').references('users.id');
  })));

  tables.push(() => (knex.schema.table('comments', (comments) => {
    comments.integer('user_id').unsigned();
    comments.foreign('user_id').references('users.id');
  })));

  tables.push(() => (knex.schema.table('comments', (comments) => {
    comments.integer('post_id').unsigned();
    comments.foreign('post_id').references('posts.id');
  })));

  tables.push(() => (knex.schema.table('likes', (likes) => {
    likes.integer('post_id').unsigned();
    likes.foreign('post_id').references('posts.id');
  })));

  tables.push(() => (knex.schema.table('likes', (likes) => {
    likes.integer('user_id').unsigned();
    likes.foreign('user_id').references('users.id');
  })));

  tables.push(() => (knex.schema.table('user_target_relation', (user_target_relation) => {
    user_target_relation.integer('user_id').unsigned();
    user_target_relation.foreign('user_id').references('users.id');
  })));

  tables.push(() => (knex.schema.table('user_target_relation', (user_target_relation) => {
    user_target_relation.integer('target_id').unsigned();
    user_target_relation.foreign('target_id').references('users.id');
  })));
  return sequence(tables);
};

createTables()
  .then(() => {
    console.log('Tables created!!');
    createFks()
      .then(() => {
        console.log('Associations created!');
        process.exit(0);
      })
      .catch((error) => {
        console.log('error while creating associations', error);
        process.exit();
      });
  })
  .catch((error) => {
    console.log('error while creating tables', error);
    process.exit();
  });

// fkSqls.forEach((fksql) => {
//   knex.schema.raw(fksql);
// });

