import { EditIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();

  return (
    <div className="card glass w-96">
      <figure>
        <img
          src={product.image}
          alt="car!"
          className="max-h-64 "
          objectFit="cover"
          //write css for image cover
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.price}₺</p>
        <div className="card-actions justify-end ">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-primary rounded-full "
          >
            <EditIcon />
          </Link>
          <button
            className="btn btn-primary rounded-full"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
