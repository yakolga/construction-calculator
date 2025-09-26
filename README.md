# 🏗️ Construction Calculator

## Overview
Construction Calculator is a web application developed for internal use by a construction company. It allows quick estimation of renovation and construction costs based on room area and selected services.  

📌 [Figma design](https://www.figma.com/design/OrVvDTBb9W0XEN3XRTL8O4/Construction-calculator?node-id=0-1&t=iN8FzIU9XSg6wT9y-1)

## [Live Demo](https://yakolga.github.io/construction-calculator/)

## 🚀 Features

- Calculate total room area and cost of selected services  
- Dynamic data loading for rooms and services from the server  
- Cost output in **UAH** with automatic conversion to **USD** using a public exchange rate API  
- Input validation (negative values are ignored and replaced with `0`)  
- Admin authorization with session persistence  
- Admin panel to update service prices  
- Mobile-friendly layout (**375px – 1920px**)  
- Cross-browser compatibility (modern browsers only)  


## 🛠️ Tech Stack

- **Vanilla JavaScript**  
- **SASS** for styling  
- **JSON-server** for mock backend  
- **Fetch** for API requests  
- **Git** for version control 

## 📂 Project Structure

```bash
construction-calculator/
│── css/               # Styles (CSS)
│── fonts/             # Fonts
│── icons/             # Icons
│── img/               # Images
│── js/                # Application scripts
│── sass/              # Styles (SASS)
│── public/            # Static assets (images, icons, etc.)
│── db.json            # Mock backend (JSON-server)
│── index.html         # Main page
│── login.html         # Login page
│── admin.html         # Admin panel
│── package.json
│── webpack.config.js  # Build configuration
```

## ⚙️ Installation & Setup
1. Clone the repository:
```bash
git clone https://github.com/your-repo/construction-calculator.git
```
2. Start the project:
```bash
npx webpack
```

## 🔑 Admin Authentication
Admin credentials are stored in db.json, example:
```bash
"admin": {
  "login": "root",
  "password": "password"
}
```

After successful login, the Admin Panel becomes available to update service pricing.

Login state is stored in LocalStorage.

## 📐 Calculation Logic

Basic services (e.g., demolition, laminate installation):
```bash
total area × price
```
Wall services (plastering, putty, wallpaper, painting):
```bash
4 × √area × height × price
```
Baseboards:
```bash
4 × √area × price
```
Windows & doors:
```bash
1 window per 7.5 m²
1 door per 25 m²
```
Bathroom tiling
```bash
(bathroom area + toilet area) × price
```
Extra services (plumbing, electricity, front door):
```bash
Add fixed cost on top of the total.
```