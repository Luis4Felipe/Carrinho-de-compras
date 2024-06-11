import styled from "styled-components";
import Button from "./Button";

/* Elemento de item da lista personalizado com CSS */
const SLi = styled.li`
  margin-bottom: 10px;
  padding: 16px;
  border-radius: 8px;
  background: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Elemento de bloco informativo personalizado com CSS */
const SDivInfo = styled.div`
  p {
    font-size: 16px;
    margin-bottom: 2px;
  }
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

/* Elemento de bloco de unidades personalizado com CSS */
const SDivUnits = styled.div`
  width: 86px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 5px 10px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    cursor: pointer;
  }
`;

/**
 * Componente para listagem de produto no carrinho
 * @param {Object} product Produto para listagem
 */
function CartProduct({ product, onChange, isLoading }) {
    return (
      <SLi>
        <SDivInfo>
          <p>{product.name}</p>
          <span>R${product.price}</span>
        </SDivInfo>
        <SDivUnits>
          <button disabled={isLoading} onClick={() => onChange(product, -1)}>
            -
          </button>
          <p>{product.units}</p>
          <button disabled={isLoading} onClick={() => onChange(product, +1)}>
            +
          </button>
        </SDivUnits>
      </SLi>
    );
}
/* Elemento de seção personalizado com CSS */
const SSection = styled.section`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  gap: 20px;
`;

/* Elemento de lista personalizado com CSS */
const SUl = styled.ul`
  list-style-type: none;
`;

/**
 * Componente para listagem de produtos no carrinho
 * @param {Object[]} products Produtos para listagem
 * @param {Function} onClick Função de finalização
 * @param {Boolean} isLoading Status de loading
 */
function Cart({ products, onChange, onClick, isLoading = false }) {
  return (
    <SSection>
      <SUl>
        {products.map((product) => (
          <CartProduct
            key={product.id}
            product={product}
            onChange={onChange}
            isLoading={isLoading}
          />
        ))}
      </SUl>
      <Button onClick={onClick} isLoading={isLoading}>
        Finalizar Compra
      </Button>
    </SSection>
  );
}

export default Cart;