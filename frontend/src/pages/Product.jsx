import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
  } = useProductStore();

  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link
        to={`/`}
        className="flex items-center text-gray-700 hover:text-gray-900"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Anasayfaya dön
      </Link>

      <div className="grid gap-10 sm:grid-cols-2 mt-8">
        {/* PRODUCT IMAGE */}
        <div className="rounded-xl overflow-hidden shadow-md bg-white">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="w-full"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="bg-primary/30 shadow-md rounded-lg p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id);
            }}
            className="space-y-5"
          >
            {/* PRODUCT NAME */}
            <div>
              <label className="block text-sm font-semibold text-white">
                Ürün Adı
              </label>
              <input
                type="text"
                placeholder="Ürün adını giriniz"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* PRODUCT PRICE */}
            <div>
              <label className="block text-sm font-semibold text-white">
                Fiyat (₺)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            {/* PRODUCT IMAGE URL */}
            <div>
              <label className="block text-sm font-semibold text-white">
                Görsel URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-primary"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            {/* FORM ACTIONS */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50"
                disabled={
                  loading ||
                  !formData.name ||
                  !formData.price ||
                  !formData.image
                }
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full" />
                ) : (
                  <>Kaydet</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
