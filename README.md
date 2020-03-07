# library-app
This is Library app with REST API's developed in NodeJs, Express, MongoDB.

### Books REST API
![Alt text](Books-Banner.png "Books")

Please free to modify the server port. The current state uses 3000 as server port.

Please use below URL's to browse Book

* **Create Book**
    - http://localhost:3000/book
* **Get Books**
    - http://localhost:3000/books
* **Get Book by ID**
    - http://localhost:3000/book/5e6066bcb96aca130cd47b9c
* **Delete Book by ID**
    - http://localhost:3000/book/5e60749dde504f144226c1ac

### Customers REST API
![Alt text](Customers-Banner.png "Customers")
Please free to modify the server port. The current state uses 5555 as server port.

Please use below URL's to browse Customer

* **Create Customers**
    - http://localhost:5555/customer
* **Get Customers**
    - http://localhost:5555/customers
* **Get Customer by ID**
    - http://localhost:5555/customer/5e6197b11e2dc11dbe636aa0
* **Delete Customer by ID**
    - http://localhost:5555/customer/5e619dd66ba3a21e4b796294

### Orders REST API
![Alt text](Orders-Banner.png "Orders")
Please free to modify the server port. The current state uses 5555 as server port.

Please use below URL's to browse Customer

* **Create CustoOrdersmers**
    - http://localhost:7777/order
* **Get Orders**
    - http://localhost:7777/orders
* **Get Order by ID**
    - http://localhost:7777/order/5e63eb9f90bfc34a8f98d1c6

- **To install npm packages**
```
npm install --save express
npm install --save body-parser
npm install --save mongoose
npm install -g nodemon
npm install --save node-banner
npm install --save request
```
- **To Start app:**
```
nodemon books.js
nodemon customers.js
```