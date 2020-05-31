# install sequelize ORM
npm install --save sequelize-cli sequelize

# execute sequelize
npx sequelize --help
npx sequelize init

npx sequelize model:generate --help # create model and generate migration

# create model User
npx sequelize model:generate --name User --attributes username:STRING,password:STRING,fullname:STRING --underscored

# status migration
npx sequelize db:migrate:status

# run pending migration
npx sequelize db:migrate

# revert a migration
npx sequelize db:migrate:undo

# run sqlite3 tools
sqlite3 secrets_dev.db
  .open filename
  .tables
  .quit

# show content node_modules
npm ls

# create model Secret
npx sequelize model:generate --name Secret --attributes username:STRING,name:STRING,value:STRING --underscored
