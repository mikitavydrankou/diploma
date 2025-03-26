// import Sequelize from 'sequelize';

// export const config = new Sequelize('js_db', 'root', '1234qwer', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }


const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1234qwer",
  DB: "js_db_2",
  dialect: "mysql",
};

export default config;