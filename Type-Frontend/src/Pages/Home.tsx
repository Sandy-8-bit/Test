  import { useEffect, useState } from "react";
  import { productStore } from "../Store/Products";
  import { Filter, Star, Package, Heart } from "lucide-react";
  import Layout from "./../Layout/Layout"; // Assuming you have this Layout component

  const categories = ["All", "Shoes", "Clothing", "Electronics"];
  const priceRanges = [
    { label: "All", min: "", max: "" },
    { label: "Below ₹100", min: "0", max: "99" },
    { label: "₹100 – ₹199", min: "100", max: "199" },
    { label: "₹200 – ₹499", min: "200", max: "499" },
    { label: "₹500+", min: "500", max: "" },
  ];

  const Home = () => {
    const products = productStore((state) => state.products || []);
    const loading = productStore((state) => state.loading);
    const error = productStore((state) => state.error);
    const getProducts = productStore((state) => state.getProducts);
    const getFilteredProducts = productStore(
      (state) => state.getFilteredProducts
    );

    const [category, setCategory] = useState("All");
    const [price, setPrice] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
      if (!isLogged()) window.location.href = "/login";
      getProducts();
    }, []);

    const isLogged = () => {
      const token = localStorage.getItem("token");
      return !!token;
    };

    const applyFilters = () => {
      const selectedPrice = priceRanges.find((range) => range.label === price);
      const filters: Record<string, any> = {};
      if (category !== "All") filters.category = category;
      if (selectedPrice?.min) filters.minPrice = selectedPrice.min;
      if (selectedPrice?.max) filters.maxPrice = selectedPrice.max;
      getFilteredProducts(filters);
      setCurrentPage(1);
    };

    const clearFilters = () => {
      setCategory("All");
      setPrice("All");
      getProducts();
      setCurrentPage(1);
    };

    const paginatedProducts = products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(products.length / itemsPerPage);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }

    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-800" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {showFilters ? "Hide" : "Show"}
                </button>
              </div>

              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                <div className="flex flex-col lg:flex-row flex-wrap items-stretch lg:items-end gap-4">
                  <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 bg-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <select
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 bg-white"
                    >
                      {priceRanges.map((range) => (
                        <option key={range.label} value={range.label}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={applyFilters}
                      className="px-6 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-xl shadow-lg font-medium"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-gray-800" />
                <p className="text-lg font-medium text-gray-900">
                  {products?.length || 0} Product
                  {products.length !== 1 ? "s" : ""} Found
                </p>
              </div>
            </div>

            {/* Products */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100 group"
                  >
<div className="relative">
  {Array.isArray(product.images) && product.images.length > 0 ? (
    <img
      src={product.images[0]}
      alt={product.title}
      className="w-full h-32 sm:h-48 object-cover"
    />
  ) : (
    <div className="w-full h-32 sm:h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
      No Image Available
    </div>
  )}

  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
  </button>
</div>

                    <div className="p-3 sm:p-5">
                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap mb-1">
                        {product.tags?.includes("new") && (
                          <span className="px-2 py-0.5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                            New
                          </span>
                        )}
                        {product.tags?.includes("hot") && (
                          <span className="px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                            Hot
                          </span>
                        )}
                        {product.tags?.includes("popular") && (
                          <span className="px-2 py-0.5 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {product.category}
                        {product.brand && <> • {product.brand}</>}
                      </p>

                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          ₹{product.price?.toLocaleString()}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm line-through text-gray-500">
                            ₹{product.oldPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {product.rating && (
                        <div className="flex items-center mt-1 mb-3">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-xs ml-1 text-gray-800">
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      )}

                      <button
                        className={`w-full py-2 rounded-md font-medium ${
                          product.stock === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? "Out of Stock" : "Buy Now"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-full font-medium ${
                      currentPage === index + 1
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  };

  export default Home;
