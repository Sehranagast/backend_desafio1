const express = require("express");
const App = express();

const ProductManager = require("./ProductManager");
const productManager = new ProductManager("./Products.json"); // instanciar ProductManager

App.get("/products", async (req, res) => {
  let limit = req.query.limit;

  const products = await productManager.loadProducts();

  if (limit) {
    limit = parseInt(limit, 10);
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

App.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid, 10);

  const product = await productManager.getProductById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

App.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo no funciona!");
});

App.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080");
});
