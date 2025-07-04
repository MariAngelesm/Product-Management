# Product Management System

This is a product management system developed in JavaScript, HTML, and CSS. It allows you to add, edit, delete, and view products using a simulated REST API with (`json-server`).

## Project Features

- List of products in table
- Registration of new products
- Editing existing products
- Deleting products
- Use of modal for forms
- Basic input validations
- Communication with REST API (`json-server`)


## ⚙️ Technologies used

- HTML
- CSS
- JavaScript
- json-server


## How to Run the Program

### 1. Clone the repository
```bash
git clone https://github.com/MariAngelesm/Product-Management.git
cd Product-Management
```
### 2.  Install json-server (if you don't already have it)
```bash
npm install -g json-server
```
### 3.  Start the local REST API
Run the following command from within the project folder (where db.json is located):
```bash
json-server --watch db.json --port 5000
```
This will start the API at:
```bash
http://localhost:5000/products
```
### 3.  Open the web application
Open the `index.html` file with your browser.

## 👤 Author

- [@MariAngelesm](https://github.com/MariAngelesm)
