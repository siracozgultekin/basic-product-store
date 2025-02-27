import { PlusCircleIcon, RefreshCcwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Modal from "../components/modal";
import ProductCard from "../components/productCard";
import { useProductStore } from "../store/useProductStore";

const Home = () => {
  const { products, loading, error, fetchProducts, addProduct } =
    useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, addProduct]);

  const handleSaveProduct = async (product) => {
    await addProduct(product);
    setIsModalOpen(false);
    console.log("bitti");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {products.length === 0 && !loading ? (
        <div className="alert alert-warning mb-8">No products found</div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-8">
            {/* Ürün Ekle Butonu */}
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircleIcon className="size-5 mr-2" />
              Add Product
            </button>

            {/* Yenileme Butonu */}
            <button
              className="btn btn-ghost btn-circle"
              onClick={fetchProducts}
            >
              <RefreshCcwIcon className="size-5" />
            </button>
          </div>

          {error && <div className="alert alert-error mb-8">{error}</div>}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            // Ürün Kartları bir satırda 3 tane olacak şekilde düzenlenmeli.
            <div className="flex flex-wrap  gap-10 items-center justify-center ">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Bileşeni */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </main>
  );
};

export default Home;
