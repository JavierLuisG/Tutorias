/**
 *      @author Javier Luis Gonzalez <javierandresluisgonzalez@gmail.com>
 *      @fileoverview This script get the user's data to create registration
 *      @licence BSD 3-Clause License
 */

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// general vars ------------------------------------------------------------------

let name = null;
let typeProduct = null;
let quantity = null;
let price = null;
let latitude = null;
let longitude = null;
let product = {};

// general function -------------------------------------------------------------

/**
 * 
 * @param data 
 * @returns String sanitize data 
 */
const dataStringCapitalize = (data) => {
    let capitalize = null;
    if (data !== null && data !== undefined && data !== "") {
        capitalize = data[0].toUpperCase() + data.slice(1).toLowerCase();
    }
    return capitalize;
};

/**
 * 
 * @param data 
 * @returns Sanitize data 
 */
const promiseForSanitizeData = (data) => {
    return new Promise((resolve, reject) => {
        name = dataStringCapitalize(data.name);
        typeProduct = dataStringCapitalize(data.typeProduct);
        quantity = data.quantity;
        price = data.price;
        latitude = data.latitude;
        longitude = data.longitude;
        resolve();
    });
};

/**
 * 
 * @param data 
 * @returns Prepare the data to send
 */
const promiseBuildData = () => {
    return new Promise((resolve, reject) => {
        product = {
            name: name,
            typeProduct: typeProduct,
            quantity: quantity,
            price: price,
            latitude: latitude,
            longitude: longitude
        };
        resolve(product);
    });
};

const sendLocalStorage = (data) => {
    localStorage.setItem("product", JSON.stringify(data));
    debugger;
};

/**
 * Get data
 */
const getPromiseDataFormProduct = () => {
    return new Promise((resolve, reject) => {
        const nameCapitalize = document.getElementById("name").value;
        const typeProductCapitalize = document.getElementById("typeProduct").value;
        const quantityCapitalize = document.getElementById("quantity").value;
        const priceCapitalize = document.getElementById("price").value;
        const latitudeCapitalize = document.getElementById("latitude").value;
        const longitudeCapitalize = document.getElementById("longitude").value;
        const productForm = {
            name: nameCapitalize,
            typeProduct: typeProductCapitalize,
            quantity: quantityCapitalize,
            price: priceCapitalize,
            latitude: latitudeCapitalize,
            longitude: longitudeCapitalize
        };
        resolve(productForm);
    });
};

const getDataFormMyForm = () => {
    getPromiseDataFormProduct().then((result) => {
        return promiseForSanitizeData(result);
    }).then((result) => {
        return promiseBuildData();
    }).then((result) => {
        return sendLocalStorage(result);
    }).catch((error) => {
        throw new error(error);
    });
};