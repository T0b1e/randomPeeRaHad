# React + Vite

This Project is working on React.js Vite.js and Google App scripts (For running the backend)

## Installation

To get started with this project, follow these steps:

1. Initialize a new npm project:

   ```bash
      npm init -y, npm create vite@latest
      npm install, 
      npm install crypto-js
      npm install axios
      npm install react-router-dom
      npm install @mui/material @emotion/react @emotion/styled 
    ```

## Running the Project
   ```bash
      npm run dev
   ```

## Trouble Shoot
1. When trying to run Google sheet API with the frontend, the Received bug said "Uncaught ReferenceError: process is not defined."
   By doing 
        npx npm-check-updates -u
        npm install --legacy-peer-deps
2. After debug 1. Then I got "Uncaught TypeError: Class extends value undefined is not a constructor or null." 
3. After 2 days googled I gave up and giving thought on google app scripts and it turned out working really fine, So my point is to find way to work with it 

# Refer
https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined
https://bobbyhadz.com/blog/react-referenceerror-process-not-defined
https://github.com/googleapis/gaxios/issues/531

# Avariable Plugin
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
