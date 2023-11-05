import "./App.css";
// import logo from "./logo.png";
import React, { useState, useEffect } from "react";
import { Products } from "./Products";

const App = () => {
  const [ProductsCategory, setProductsCategory] = useState(Products);

  const [query, setQuery] = useState("");

  function toggleViews() {
    setIsBrowseViewVisible(!isBrowseViewVisible);
    setIsCartViewVisible(!isCartViewVisible);

    const searchInput = document.getElementById("search");
    console.log(searchInput.value);
    searchInput.value = "";
    setQuery("");

    handleChange({ target: { value: "" } });
  }

  const [isBrowseViewVisible, setIsBrowseViewVisible] = useState(true);
  const [isCartViewVisible, setIsCartViewVisible] = useState(false);

  // BROWSE CODE ################

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

  const addToCart = (item) => {
    // console.log(item);
    const existingCart = cart.find((cartItem) => cartItem.id === item.id);

    if (existingCart) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    // console.log(cart);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 0) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    setCart(updatedCart);
  };

  const cartItems = cart
    .filter((item) => item.quantity >= 1)
    .map((item) => (
      <div key={item.id}>
        <div className="row border-top border-bottom" key={item.id}>
          <div className="row main align-items-center">
            <div className="col-2">
              <img className="img-fluid" src={item.image} />
            </div>
            <div className="col">
              <div className="row text-muted">{item.title}</div>
              <div className="row">{item.category}</div>
            </div>
            <div className="col"></div>
            <div className="col">${item.price}</div>
            <div className="col">Quantity: {item.quantity}</div>
          </div>
        </div>
      </div>
    ));

  const cartTotal = () => {
    // console.log("trying to get total");
    const total = cart.reduce((acc, item) => {
      const itemPrice = item.price * item.quantity;
      if (item.quantity >= 0) {
        return acc + itemPrice;
      }

      return acc;
    }, 0);
    // console.log(total);

    return total;
  };

  // VALIDATION ##################
  function CheckoutForm() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      card: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setValidationErrors({ ...validationErrors, [name]: "" });
    };
    const handleSubmit = (e) => {
      e.preventDefault();

      // Validate the form data
      const errors = {};
      if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        errors.email = "Invalid email address";
      }
      if (formData.name.trim() === "") {
        errors.name = "Name is required";
      }
	  if (formData.address.trim() === "") {
        errors.address = "Address is required";
      }
	  if (formData.city.trim() === "") {
        errors.city = "City is required";
      }
	  if (formData.state.trim() === "") {
        errors.state = "State is required";
      }
	  if (isNaN(formData.zip) || formData.zip.length !== 5) {
        errors.zip = "Zip code is required";
      }
      if (!formData.card.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) {
        errors.card = "Invalid card format";
      }
      if (Object.keys(errors).length === 0) {
        alert("Form is valid and can be submitted.");
      } else {
        setValidationErrors(errors);
      }
    };

    return (
      <div>
        <div class="container">
          <div class="row">
            <div class="col-2"></div>

            <div class="col-8">
              <h1 className="text-3xl category-title">Payment Information</h1>

              <div id="liveAlertPlaceholder"></div>
              <form
                className="row g-3"
                id="checkout-form"
                onSubmit={handleSubmit}
              >
                <div class="col-md-6">
                  <label for="inputName" class="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.name ? "is-invalid" : ""
                    }`}
                    id="inputName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Must be like, "John Doe"</div>
                </div>

                <div class="col-md-6">
                  <label for="inputEmail" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      validationErrors.email ? "is-invalid" : ""
                    }`}
                    id="inputEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">
                    Must be like, "abc@xyz.efg"
                  </div>
                </div>

                <div class="col-md-12">
                  <label for="inputCard" class="form-label">
                    Card Number
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi-credit-card-fill"></i>
                    </span>
                    <input
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      type="text"
                      className={`form-control ${
                        validationErrors.card ? "is-invalid" : ""
                      }`}
                      id="inputCard"
                      name="card"
                      value={formData.card}
                      onChange={handleChange}
                    />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">
                      Must be like, "7777-7777-7777-7777"
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <label for="inputAddress" class="form-label">
                    Address
                  </label>
                  <input
                    placeholder="1234 Main St"
                    type="text"
                    className={`form-control ${
                      validationErrors.address ? "is-invalid" : ""
                    }`}
                    id="inputAddress"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Address is required</div>
                </div>

                <div class="col-md-12">
                  <label for="inputAddress2" class="form-label">
                    Address 2
                  </label>
                  <input
                    placeholder="Apartment, studio, or floor"
                    type="text"
                    className={`form-control`}
                    id="inputAddress2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>

                <div class="col-md-6">
                  <label for="inputCity" class="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.city ? "is-invalid" : ""
                    }`}
                    id="inputCity"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">City is required</div>
                </div>

                <div class="col-md-6">
                  <label for="inputState" class="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.state ? "is-invalid" : ""
                    }`}
                    id="inputState"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">State is required</div>
                </div>

				<div class="col-md-6">
	<label for="inputZip" class="form-label">
	  Zip Code
	</label>
	<input
	  type="text"
	  className={`form-control ${
		validationErrors.zip ? "is-invalid" : ""
	  }`}
	  id="inputZip"
	  name="zip"
	  value={formData.zip}
	  onChange={handleChange}
	/>
	<div class="valid-feedback">Looks good!</div>
	<div class="invalid-feedback">Zip code is required</div>
  </div>

                <button type="submit" className="btn btn-success text-dark">
                  Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CONFIRMATION CODE ################

  const showProducts = (ProductsCategory) => {
    return (
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({ProductsCategory.length})
        </h2>
        <div
          className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
          style={{ maxHeight: "800px", overflowY: "scroll" }}
        ></div>

        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {ProductsCategory.map((product, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm">
                  <img alt="Product Image" src={product.image} />
                  <div className="card-body">
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      {product.title}
                    </span>
                    <p className="card-text">
                      {product.price} <br></br>
                      <strong>Description: </strong>
                      {product.description}
                      <br></br>
                      <strong>Tag</strong> - {product.category}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                        className="btn btn-sm btn-primary"
                      >
                        {" "}
                        +{" "}
                      </button>
                      <span className="item-quantity">
                        Quantity:{" "}
                        {cart.find((item) => item.id === product.id)
                          ?.quantity ?? 0}
                      </span>
                      <button
                        onClick={() => {
                          removeFromCart(product);
                        }}
                        className="btn btn-sm btn-primary"
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="top-0 p-4 flex justify-between items-center">
        <h1 className="text-3xl">
          <strong>IASG Online Store</strong>{" "}
        </h1>
        <button
          className="btn btn-md btn-primary"
          onClick={() => toggleViews()}
        >
          {isBrowseViewVisible ? "Checkout" : "Return"}
        </button>
      </div>
      <div
        className="browseView"
        style={{ display: isBrowseViewVisible ? "block" : "none" }}
      >
        <div>
          <div>
            <div>
              <div className="py-10">
                <input
                  id="search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="search"
                  value={query}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>{showProducts(ProductsCategory)}</div>
        </div>
      </div>

      <div
        className="cartView"
        style={{ display: isCartViewVisible ? "block" : "none" }}
      >
        <div>
          <div className="card">
            <div className="row">
              <div className="col-md-8 cart">
                <div className="title">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <b>Your Cart</b>
                      </h4>
                    </div>
                  </div>
                </div>
                <div>{cartItems}</div>
              </div>
              <div className="float-end">
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Order total:</span>
                  <span className="lead fw-normal">
                    ${cartTotal().toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <CheckoutForm />
        </div>
      </div>
      <div className="confirmationView"></div>
    </div>
  );
};

export default App;
