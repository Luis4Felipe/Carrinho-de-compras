import { useEffect, useState } from "react";
import styled from "styled-components";
import Cart from "./Cart";
import Products from "./Products";

/**
 * Função para chamar API
 * @param {string} url caminho da função
 * @param {string} method método do função
 * @returns objeto de resposta
 */
async function api(url, method, body = undefined) {
  const response = await fetch(`http://localhost:4000${url}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : null,
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

/**
 * Busca todos os produtos da API
 * @returns lista de produtos
 */
async function apiGetProducts() {
  const data = await api("/products", "GET");
  return data.products;
}

/**
 * Salva o carrinho de compras na API
 * @param {Object[]} products lista de produtos
 */
async function apiSubmitCart(products) {
  await api("/purchases", "POST", { products });
}

function App() {
  const [productsLoading, setProductsLoading] = useState(false); // Status do loading de produtos
  const [products, setProducts] = useState([]); // Lista de produtos
  const [cart, setCart] = useState([]); // Lista de produtos no carrinho
  const [cartLoading, setCartLoading] = useState(false); // Status do loading do carrinho

  /**
   * Busca os produtos
   */
  async function getProducts() {
    setProductsLoading(true); // Ativa loading de produtos
    try {
      const products = await apiGetProducts();
      setProducts(products); // Salva lista de produtos na variável global
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setProductsLoading(false); // Desativa loading de produtos
    }
  }

  /**
   * Salva o carrinho
   */
  async function submitCart() {
    setCartLoading(true); // Ativa loading do carrinho
    try {
      await apiSubmitCart(cart); // Salva o carrinho
      setCart([]); // Limpa o carrinho
      getProducts(); // Busca os produtos novamente
    } catch (error) {
      console.error('Failed to submit cart:', error);
    } finally {
      setCartLoading(false); // Desativa loading do carrinho
    }
  }

  /**
   * Altera unidades do produto
   */
  function setProduct(product, change) {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, units: item.units + change } : item
    ).filter((item) => item.units > 0);

    setCart(updatedCart); // Atualiza o carrinho
    setProducts((lastProducts) =>
      lastProducts.map((item) =>
        item.id === product.id ? { ...item, units: product.units } : item
      )
    ); // Atualiza a lista de produtos
  }

  /**
   * Adiciona produto no carrinho
   */
  function addProduct(product) {
    product.units = 1;

    setCart((prevCart) => [...prevCart, product]); // Adiciona o produto ao carrinho
    setProducts((prevProducts) =>
      prevProducts.filter(({ id }) => id !== product.id)
    ); // Remove o produto da lista de produtos
  }

  useEffect(() => {
    getProducts(); // Busca os produtos ao carregar a página
  }, []);

  const SMain = styled.main`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 300px 1fr; /* Corrigido */
    grid-template-rows: 1fr;
  `;

  return (
    <SMain>
      <Cart
        products={cart}
        onChange={setProduct}
        onClick={submitCart}
        isLoading={cartLoading}
      />
      <Products
        products={products}
        onClick={addProduct}
        isLoading={productsLoading}
      />
    </SMain>
  );
}

export default App;
