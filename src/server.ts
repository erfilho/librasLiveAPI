import dotenv from 'dotenv';
dotenv.config();

import app from './app/app';

const port = (process.env.PORT || 8080) as number;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server is running on port: ${port}`);
});
