import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(product);
    setProduct({ name: "", price: "", image: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h2 className="font-bold text-lg">Add New Product</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="string"
            name="image"
            placeholder="Image"
            value={product.image}
            onChange={handleInputChange}
            className="input input-bordered w-full mb-2"
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
