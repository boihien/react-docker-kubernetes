const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgressdb',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

const getProducts = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
}
const createProducts = (body) => {
  return new Promise(function(resolve, reject) {
    const { product_no, name, price} = body
    pool.query('INSERT INTO products (product_no, name, price) VALUES ($1, $2, $3) RETURNING *', [product_no, name, price], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new product has been added: ${results.rows[0]}`)
    })
  })
}

  module.exports = {
    getProducts,
    createProducts,
  }