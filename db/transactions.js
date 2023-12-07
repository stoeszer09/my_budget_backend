const DB_URI = process.env.DATABASE_URL;
const {Pool} = require("pg");
const client = new Pool({
    connectionString: DB_URI,
    ssl: {
        rejectUnauthorized: false,
    },
});

// const userExists = async (email, sub) => {
//   // Check to see if a user exists.
//   return (
//       (await client.query(
//           "SELECT user_id FROM users WHERE user_email=$1 OR user_id=$2",
//           [email, sub]
//       ).rows?.length) > 0
//   );
// };

