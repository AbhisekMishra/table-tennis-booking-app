const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const apolloServer = require('./graphql').default;
const appPort = 5000;

connectToDatabase();

app.use(cors());
app.get("/", async (req, res) => {
  try {
    // const user = await User.findById(1);
    // const response = { message: `This response came from the node.js app. User ${user.username} is on the database.` };
    // res.send(response);
  } catch (error) {
    res.status(422).send(error);
  }
});
app.listen(appPort, () => console.log(`The node.js app is listening on port ${appPort}.`));

function connectToDatabase() {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
  sequelize
    .authenticate()
    .then(() => {
      connectGraphQLServer();
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.log("Unable to connect to the database:", err);
    });
}

function connectGraphQLServer() {
  // apolloServer.listen(apolloPort, () => console.log(`Apollo server is listening on port ${apolloPort}.`));
  apolloServer.applyMiddleware({
    app,
    path: '/apollo',
  });
}
