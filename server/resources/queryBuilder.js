// buildQuery

// module.exports.generateFeedQuery = (reqBody)=>{
//   const user_id = req.body.user_id; //the owner of the profile 
//   // return `SELECT target_id FROM user_target_relation WHERE user_id = ${user_id} AND isAccepted = true`;
  
//   knex('user_target_relation').where({
//     user_id,  //user_id : user_id ES6 style 
//     isAccepted: true
//   }).select('target_id').then((peopleUserFollows) => {
//     //find the posts of the people i follow (feed)
//     knex.('posts')
//       .whereIn('owner_id', peopleUserFollows).then((feed) => {
//         res.json(feed);
//       });
//   });  
// }
