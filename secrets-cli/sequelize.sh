# install sequelize ORM
npm install --save sequelize-cli sequelize

# execute sequelize
npx sequelize --help
npx sequelize init

npx sequelize model:generate --help # create model and generate migration

# create model User
npx sequelize model:generate --name User --attributes username:STRING,password:STRING,fullname:STRING --underscored
