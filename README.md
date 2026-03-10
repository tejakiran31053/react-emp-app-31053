# Employee Manager App

A simple Employee CRUD application built with Vite + React, using Material UI and Tailwind CSS for the interface, and sessionStorage for data persistence.

## Features

- Create, Read, Update, and Delete employees
- Search employees by name
- Sort by name or salary
- Export/Import employee data as JSON
- Responsive design
- Form validation
- User feedback with snackbars

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

## Technology Stack

- Vite + React
- Material UI (MUI) for components
- Tailwind CSS for layout and utilities
- sessionStorage for data persistence

## Usage

- Click "Add Employee" to create a new employee
- Use the search box to filter employees by name
- Click column headers to sort
- Use Export/Import buttons to backup or restore data
- Click edit/delete icons in the table for respective actions

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
