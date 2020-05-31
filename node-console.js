const db = require('/.models')

// create user
const user = db.User.build({ username: 'kaguya', password: 'pass'})

// save user
user.save().then(console.log).catch(console.error)

// transform object sequelize to JSON
user.toJSON()

// show users
db.User.findAll().then(console.log).catch(console.error)

// get an user
db.User.findByPk(1).then(console.log).catch(console.error)

// update an user
async function updateUser (user) {
  user.fullname = 'Kayuga Shinomiya'
  await user.save()
}
db.User.findByPk(1).then(updateUser).catch(console.error)
