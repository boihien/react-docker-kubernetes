import React, {useState, useEffect} from 'react';

function App() {
  const [products, setProducts] = useState(false);
  useEffect(() => {
    
  }, []);
  function getProducts() {
    fetch('http://localhost:3001')
      .then(response => response.text())
      .then(data => {
        setProducts(data);
      });
  }
  function createProducts() {
    let product_no = prompt('Enter product_no');
    let name = prompt('Enter product name');
    let price = prompt('Enter product price');
    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({product_no, name, price}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getProducts();
      });
  }
  return (
    <div>
      {products ? products : 'There is no products data available'}
      <br />
      <button onClick={getProducts}>Get Products</button>
      <button onClick={createProducts}>Create Products</button>
    </div>
  );
}
export default App;