"use client";

import { useState } from 'react';
import Head from 'next/head';
import ProductTile from '../components/ProductTile';

//TODO: Create seaparate file of shopify links
const shopifySites = ["https://helmboots.com", "https://shop.dia.com", "https://rothys.com"]

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [shopifyLink, setShopifyLink] = useState(shopifySites[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const filteredProducts = products.filter(
        (product) => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the indexes for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setCurrentPage(1)
            setLoading(true);
            setProducts([]);
    
            // Getting products from the site that meet search term
            // TODO: Get all products from site dynamically
            var page = 1;
            while (true) {
                const res = await fetch(shopifyLink+'/products.json?limit=250&page='+page);
                const data = await res.json();
                var products = data['products']
                setProducts(prevArray => [...prevArray, ...products]);

                if (products.length === 250) {
                    page += 1;
                } else {
                    break;
                }
            }
              
            setLoading(false);
            setError(null);
    
        } catch (err) {
          setProducts([]);
          setLoading(false);
          setError(err.message)
          console.log(err);
        }
      }
    return (
        <div>
        <Head>
            <title>Products Page</title>
            <meta name="description" content="Products page with filters" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search a Shopify Site</h1>

            {/* Filter Panel */}
            <div className="flex items-center space-x-4 mb-4">
            {/* Product Type Filter */}
            <div>
                <label htmlFor="shopifySite">Shopify Site: </label>
                <select 
                className="border p-2"
                id="shopifySite"
                value={shopifyLink}
                onChange={(e) => setShopifyLink(e.target.value)}>
                  {shopifySites.map((link) => (
                    <option key={link} value={link}>
                      {link}
                    </option>
                  ))}
                </select>
            </div>

            {/* Search Input */}
            <div>
                <label htmlFor="searchTerm">Search Term: </label>
                <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-1"
                />
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Loading..." : "Search"}
            </button>
            </div>
            {error && <p className='text-red-800 mb-5'>{error}</p>}

            {/* Display Items per Page Dropdown */}
            <label className="mr-2">Items per page:</label>
            <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border p-1"
            >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            </select>

            {/* Displaying search results count */}
            <p className="my-2">{`Showing ${indexOfFirstItem + 1} - ${
            indexOfLastItem > filteredProducts.length
                ? filteredProducts.length
                : indexOfLastItem
            } of ${filteredProducts.length} results`}</p>

            {/* Product Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((product) => (
                <ProductTile product={product} />
            ))}
            </div>

            {/* Pagination Buttons */}
            <div className="mt-4 flex justify-between">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous Page
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next Page
            </button>
            </div>
        </main>
        </div>
  );
};

export default Products;
