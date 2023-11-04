import "./App.css";
// import logo from "./logo.png";
import React, { useState, useEffect } from "react";
import { Products } from "./Products";

const App = () => {
  // BROWSE CODE ################
  const [ProductsCategory, setProductsCategory] = useState(Products);

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = Products.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      //   console.log(eachProduct);
      //   console.log(e.target.value.toLowerCase());
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  // CART CODE ################
  const [cart, setCart] = useState([]);

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  //   const listItems = items.map((el) => (
  // 	<div key={el.id}>
  // 	  <img class="img-fluid" src={el.image} width={150} /> <br />
  // 	  {el.title} <br />
  // 	  {el.category} <br />
  // 	  {el.price} <br />
  // 	</div>
  // 	));
  // CONFIRMATION CODE ################

  const render_products = (ProductsCategory) => {
    return (
      <div className="category-section fixed">
        {/* {console.log("Step 3 : in render_products ")} */}
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({ProductsCategory.length})
        </h2>

        <div
          className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
          style={{ maxHeight: "800px", overflowY: "scroll" }}
        >
          {/* Loop Products */}
          {ProductsCategory.map((product, index) => (
            <div key={index} className="group relative shadow-lg">
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                <img
                  alt="Product Image"
                  src={product.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                    </a>
                    <p>Tag - {product.category}</p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(ProductsCategory)}
                    >
                      -
                    </button>{" "}
                    <button
                      type="button"
                      variant="light"
                      onClick={() => addToCart(ProductsCategory)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">
					Rating: {product.rating.rate}
				  </p> */}
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="browseView">
        <div className="flex fixed flex-row">
          <div
            className="h-screen  bg-slate-800 p-3 xl:basis-1/5"
            style={{ minWidth: "65%" }}
          >
            {/* <img className="w-full" src={logo} alt="Sunset in the mountains" /> */}
            <div className="px-6 py-4">
              <h1 className="text-3xl mb-2 font-bold text-white">
                {" "}
                IASG Online Store{" "}
              </h1>
              <div className="py-10">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="search"
                  value={query}
                  onChange={handleChange}
                />
              </div>
              {/* <p className="text-gray-700 text-white">
            by - <b style={{ color: 'orange' }}>Design Shubham, Development Abraham</b>
          </p> */}
              {/* <div className="py-10">
            { (Categories) ? <p className='text-white'>Tags : </p> : ''}
            {
              Categories.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" >{tag}</button>)
            }
          </div> */}
            </div>
          </div>
          <div className="ml-5  p-10 xl:basis-4/5">
            {render_products(ProductsCategory)}
          </div>
        </div>
      </div>

      <div className="cartView"></div>
      <div className="confirmationView">
        <h1>This is a test</h1>
      </div>
    </div>
  );
};

export default App;
