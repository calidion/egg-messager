module.exports = {
  host: process.env.NN_MAIL_SERVER,
  port: process.env.NN_MAIL_PORT,
  secure: 'true',
  password: process.env.NN_MAIL_PASSWORD,
  email: process.env.NN_MAIL_EMAIL
};
