import React from "react";

interface Product {
  name: string;
  minRate: number;
  maxRate: number;
  modelRate: number;
}

interface ProductPriceTableProps {
  products: Product[];
  selectedProducts: string[];
  onProductSelect: (productName: string) => void;
}

const ProductPriceTable: React.FC<ProductPriceTableProps> = ({
  products,
  selectedProducts,
  onProductSelect,
}) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="card-title">Product Prices</h5>
      </div>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th className="text-end">Min</th>
              <th className="text-end">Model</th>
              <th className="text-end">Max</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.name)}
                    onChange={() => onProductSelect(product.name)}
                    className="form-check-input"
                  />
                </td>
                <td>{product.name}</td>
                <td className="text-end">₹{product.minRate}</td>
                <td className="text-end fw-bold">₹{product.modelRate}</td>
                <td className="text-end">₹{product.maxRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPriceTable;
