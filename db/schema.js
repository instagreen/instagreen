const Schema = {
  users: { // table
    id: { // field
      type: 'increments',
      nullable: false,
      primary: true,
    },
    username: {
      type: 'string',
      maxlength: 255,
      nullable: false,
      unique: true,
    },
    password: {
      type: 'string',
      maxlength: 255,
      nullable: false,
    },
    follower_count: {
      type: 'integer',
      nullable: false,
      unsigned: true,
    },
    following_count: {
      type: 'integer',
      nullable: false,
      unsigned: true,
    },
  },
  posts: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true,
    },
    likes_count: {
      type: 'integer',
      nullable: false,
      unsigned: false,
    },
  },


  comments: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true,
    },
    text: {
      type: 'string',
      nullable: false,
      maxlength: 255,
    },
  },

  user_target_relation: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true,
    },
    isAccepted: {
      type: 'boolean',
      nullable: false,
    },
  },

  likes: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true,
    },

  },
};
module.exports.Schema = Schema;
