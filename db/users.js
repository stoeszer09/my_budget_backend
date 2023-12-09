const DB_URI = process.env.DATABASE_URL;
const { Pool } = require('pg');
const client = new Pool({
    connectionString: DB_URI,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});

const userExists = async (auth) => {
  // Check to see if a user exists.
  const user = await client.query(
    "SELECT id FROM account_user WHERE auth=$1",
    [auth]
  )
  return user.rows.length > 0;
};

// database.js

// Function to add a sample record to the database
async function addUser(name, auth) {
    try {
      if (await userExists(auth)) {
        return false
      }
      const result = await client.query(
        'INSERT INTO account_user (name, auth) VALUES ($1, $2) RETURNING *',
        [name, auth]
      );
      console.log('Inserted data:', result.rows[0]);
      return result
    } catch (error) {
      console.error('Error adding sample data:', error);
      return false
    }
}

// Export the addSampleData function
module.exports = {
  userExists,
  addUser,
};
