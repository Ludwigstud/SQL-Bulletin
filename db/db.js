import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
	user: "ludde",
	host: "localhost",
	database: "postgres",
	password: "ludde123",
	port: 5432,
});

 
export default pool;
