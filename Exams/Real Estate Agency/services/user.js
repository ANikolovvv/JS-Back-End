const User=require('../model/User');


async function createUser(name,username,hashedPassword) {
    const user=new User({
          name,
          username,
          hashedPassword
    })
    await user.save();
    return user
}
async function getUserByUsername(username) {
    //findOne search by username;
    const pattern=new RegExp(`^${username}$`,'i')
    const user=await User.findOne({username: {$regex: pattern} });
    return user
}

module.exports={
    createUser,
    getUserByUsername
}