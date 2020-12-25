import { createConnection } from 'typeorm';

createConnection().then(() => console.log('Success in database connection!'));