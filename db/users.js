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

async function getUserId(auth) {
  try {
    const result = await client.query(
      'SELECT name, id FROM account_user WHERE auth=$1',
      [auth]
    )
    console.log('getuser: ', result.rows[0].id)
    return result.rows[0].id
  } catch (error) {
    console.error('Error updating user:', error);
    return false
  }
}

async function getCategoryList(auth) {
  try {
    const result = await client.query(
      'SELECT category.name FROM account_user JOIN category ON account_user.id = category.account_user_id WHERE account_user.auth = $1',
      [auth]
    );
    console.log('categories: ', result.rows)
    return result.rows
  } catch (error) {
    console.log('Error getting category List: ', error)
    return false
  }
}

async function updateUserName(name, auth) {
  try {
    const result = await client.query(
      'UPDATE account_user SET name=$1 WHERE auth=$2 RETURNING *',
      [name, auth]
    );
    console.log('Updated:', result.rows[0]);
    return result
  } catch (error) {
    console.error('Error updating user:', error);
    return false
  }
}

async function updateMonthlyBudget(budget, userId, month) {
  try {
    const result = await client.query(
      'INSERT INTO monthly_budget (amount, start_date, account_user_id) VALUES ($1, $2, $3) RETURNING *',
      [budget, month, userId]
    );
    console.log('Updated Budget:', result.rows[0]);
    return result
  } catch (error) {
    console.error('Error adding sample data:', error);
    return false
  }
}

async function addCategory(categoryName, userId, amount, startDate, endDate) {
  try {
    const result = await client.query(
      'INSERT INTO category (name, account_user_id, amount, effective_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [categoryName, userId, amount, startDate, endDate]
    );
    console.log(result.rows[0])
    return result.rows[0]
  } catch (error) {
    console.error('Error adding category:', error);
    return false
  }
}

// Export the addSampleData function
module.exports = {
  userExists,
  addUser,
  getUserId,
  updateUserName,
  updateMonthlyBudget,
  addCategory,
  getCategoryList,
};
