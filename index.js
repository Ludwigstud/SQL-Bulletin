import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());


app.listen(3000, () => console.log('Server running on port 3000'));INSERT INTO users (id, username, email, created_at)
VALUES (
    id:integer,
    'username:character varying',
    'email:character varying',
    'created_at:timestamp without time zone'
  );