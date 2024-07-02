module.exports = ()=>{
    console.log('Hello world');
}

/*Api sukurkite nauja endpointa:
/api/search/name
kurio pagalba galima surasti produkta pagal pavadinima

url: http://127.0.0.1:8000/api/search/?name=Stacionarus kompiuteris

*/
const express = require('express');
const app = express();

// Sample product data
const products = [
  { id: 1, name: "Stacionarus kompiuteris", description: "Stationary computer" },
  { id: 2, name: "Nešiojamas kompiuteris", description: "Laptop" },
  { id: 3, name: "Planšetė", description: "Tablet" }
];

app.get('/api/search/', (req, res) => {
  const name = req.query.name;
  if (name) {
    const results = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    res.json(results);
  } else {
    res.status(404).json({ error: "No products found" });
  }
});

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});

