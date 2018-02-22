const Schema = {
    users: { // table
      id: { //field
        type: 'increments',
        nullable: false,
        primary: true
      },
      username: {
        type: 'string',
        maxlength: 255,
        nullable: false,
        unique: true
      },
      password: {
          type: 'string',
          maxlength: 255,
          nullable: false
      },
      follower_count:{
        type: 'integer',
        nullable: false,
        unsigned: true
      },
      following_count:{
          type: 'integer',
          nullable: false,
          unsigned: true
      }    
    },
    
    posts: {
      id: {
          type: 'increments',
          nullable: false,
          primary: true
      },
      likes_count: {
        type: 'integer',
        nullable: false,
        unsigned: false
      }
    },
  
  
    comments: {
      id: {
          type: 'increments',
          nullable: false,
          primary: true
      },
      text : {
        type: 'string',
        nullable: false,
        maxlength: 255  
      }
    },
  
    user_target_relation: {  //relation table
      id: {
          type: 'increments',
          nullable: false,
          primary: true
      },
      type_of_relation: { // 0 for follower 1 for following
        type: 'integer',
        nullable: false,
        unsigned: false  
      },
    },
  
    likes: {
      id: {
          type: 'increments',
          nullable: false,
          primary: true
      },

    },
  };
  

// const Schema = {
//   users: { // table
//     id: { //field
//       type: 'increments',
//       nullable: false,
//       primary: true
//     },
//     username: {
//       type: 'string',
//       maxlength: 255,
//       nullable: false,
//       unique: true
//     },
//     password: {
//         type: 'string',
//         maxlength: 255,
//         nullable: false
//     },
//     follower_count:{
//       type: 'integer',
//       nullable: false,
//       unsigned: true
//     },
//     following_count:{
//         type: 'integer',
//         nullable: false,
//         unsigned: true
//     }    
//   },
  
//   posts: {
//     id: {
//         type: 'increments',
//         nullable: false,
//         primary: true
//     },
//     user_id: {
//       type: 'integer',
//       nullable: false,
//       unsigned: true,
//       references: 'users.id',
//       foreign: 'user_id'
//     },
//     likes_count: {
//       type: 'integer',
//       nullable: false,
//       unsigned: false
//     }
//   },


//   comments: {
//     id: {
//         type: 'increments',
//         nullable: false,
//         primary: true
//     },
//     user_id: {
//       type: 'integer',
//       nullable: false,
//       unsigned: true,
//       references: 'users.id',
//       foreign: 'user_id'
//     },
//     post_id: {
//       type: 'integer',
//       nullable: false,
//       unsigned: false,
//       references: 'posts.id',
//       foreign: 'post_id'
//     },
//     text : {
//       type: 'string',
//       nullable: false,
//       maxlength: 255  
//     }
//   },

//   user_target_relation: {  //relation table
//     id: {
//         type: 'increments',
//         nullable: false,
//         primary: true
//     },
//     type_of_relation: { // 0 for follower 1 for following
//       type: 'integer',
//       nullable: false,
//       unsigned: false  
//     },
//     user_id: {
//       type: 'integer',
//       nullable: false,
//       unsigned: true,
//       references: 'users.id',
//       foreign: 'user_id'
//     },
//     target_id: {
//       type: 'integer',
//       nullable: false,
//       unsigned: false,
//       references: 'users.id',
//       foreign: 'target_id'
//     }
//   },

//   likes: {
//     id: {
//         type: 'increments',
//         nullable: false,
//         primary: true
//     },
//     user_id: {
//       type: 'integer',
//       nullable: false,
//       unsigned: true,
//       references: 'users.id',
//       foreign: 'user_id'
//     },
//     post_id: {
//       type: 'integer',
//       nullable: false,
//       unsigned: false,
//       references: 'posts.id',
//       foreign: 'post_id'
//     }
//   },
// };

module.exports.Schema = Schema;