const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  )
);
