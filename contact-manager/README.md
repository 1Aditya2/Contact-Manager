# Contact Manager

A modern, responsive React-based contact management application built with TypeScript. This application allows users to manage their contacts with full CRUD (Create, Read, Update, Delete) operations, including bulk delete functionality.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Key Components](#key-components)
- [State Management](#state-management)
- [Form Validation](#form-validation)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

Contact Manager is a single-page application (SPA) that provides an intuitive interface for managing personal or business contacts. The application features a clean, modern UI with responsive design that works seamlessly on both desktop and mobile devices.

## ✨ Features

### Core Functionality

- **Add Contacts**: Create new contacts with comprehensive information including name, contact number, email, address, state, and pincode
- **View Contacts**: Display all contacts in a searchable, sortable table format
- **Edit Contacts**: Update existing contact information through a modal interface
- **Delete Contacts**: Remove individual contacts or perform bulk deletion
- **Search Functionality**: Real-time search across contact names and email addresses
- **Bulk Operations**: Select multiple contacts and delete them simultaneously
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

### User Experience

- **Form Validation**: Comprehensive client-side validation using Yup schema validation
- **Toast Notifications**: User-friendly success messages for all operations
- **Loading States**: Visual feedback during form submissions and deletions
- **Persistent Storage**: Contacts are persisted to browser's local storage using Redux Persist
- **Accessibility**: ARIA labels and semantic HTML for better screen reader support

## 🛠 Technology Stack

### Core Technologies

- **React 19.2.1**: UI library for building the user interface
- **TypeScript 4.9.5**: Type-safe JavaScript for better code quality
- **Redux Toolkit 2.11.1**: State management library
- **Redux Persist 6.0.0**: Persist Redux state to local storage

### UI & Styling

- **CSS Modules**: Scoped styling for components
- **Lucide React**: Icon library for UI elements
- **React Hot Toast**: Toast notification library

### Form Management

- **Formik 2.4.9**: Form state management and validation
- **Yup 1.7.1**: Schema validation library

### Development Tools

- **React Scripts 5.0.1**: Build tooling and development server
- **Testing Library**: Unit and integration testing utilities

## 📁 Project Structure

```
contact-manager/
├── public/                 # Static assets
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Searchbar/
│   │   ├── Selectbox/
│   │   ├── Table/
│   │   └── Topbar/
│   ├── hooks/             # Custom React hooks
│   │   └── reduxHooks.ts
│   ├── pages/             # Page components
│   │   └── Home/
│   │       ├── AddContactModal/
│   │       ├── DeleteContact/
│   │       ├── EditContactModal.tsx
│   │       ├── Home.tsx
│   │       └── helper.ts
│   ├── redux/             # Redux store and slices
│   │   ├── contactsSlice.ts
│   │   └── store.ts
│   ├── styles/            # Global styles
│   │   ├── global.css
│   │   └── tokens.css
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── index.tsx          # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd contact-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The application will automatically open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## 📖 Usage

### Adding a Contact

1. Click the **"Add Contact"** button in the top-right corner
2. Fill in the required fields:
   - Name (required)
   - Contact No. (required, 7-15 digits)
   - Email (required, valid email format)
   - Address Line 1 (required)
   - Address Line 2 (optional)
   - State (required, select from dropdown)
   - Pincode (required, 5-6 digits)
3. Click **"Add Contact"** to save
4. A success toast notification will confirm the action

### Editing a Contact

1. Click the **"Edit"** icon in the Actions column of the desired contact
2. Modify the contact information in the modal
3. Click **"Edit Contact"** to save changes
4. A success toast notification will confirm the update

### Deleting a Contact

**Single Delete:**
1. Click the **"Delete"** icon in the Actions column
2. Confirm the deletion in the modal dialog
3. The contact will be permanently removed

**Bulk Delete:**
1. Select one or more contacts using the checkboxes
2. Click the **"Bulk Delete"** button that appears
3. Confirm the deletion in the modal dialog
4. All selected contacts will be removed

### Searching Contacts

- Use the search bar at the top to filter contacts
- Search works across contact names and email addresses
- Results update in real-time as you type

## 🧩 Key Components

### Home Component
The main page component that orchestrates the contact management interface. It handles:
- Contact list display
- Search functionality
- Modal state management
- Row selection for bulk operations

### Table Component
A reusable, responsive table component that:
- Displays contacts in a tabular format on desktop
- Shows card-based layout on mobile devices
- Supports row selection with checkboxes
- Provides action buttons for each row

### AddContactModal Component
Modal form for creating new contacts with:
- Formik form management
- Yup validation schema
- All required contact fields
- Loading states during submission

### EditContactModal Component
Similar to AddContactModal but pre-populated with existing contact data for editing.

### DeleteContact Component
Confirmation modal for deleting contacts, supporting both single and bulk deletion.

### Reusable UI Components
- **Button**: Customizable button with variants (primary, outline, danger)
- **Input**: Text input with label, placeholder, and error display
- **Selectbox**: Dropdown select component
- **Modal**: Reusable modal wrapper
- **Searchbar**: Search input component
- **Topbar**: Application header with logo

## 🔄 State Management

The application uses **Redux Toolkit** for state management with the following structure:

### Redux Store

```typescript
{
  contacts: {
    list: ContactFormValues[]
  }
}
```

### Redux Actions

- `addContact`: Adds a new contact to the list
- `editContact`: Updates an existing contact
- `deleteContact`: Removes a single contact by ID
- `bulkDeleteContacts`: Removes multiple contacts by IDs

### State Persistence

Contacts are automatically saved to the browser's **local storage** using Redux Persist. This means:
- Contacts persist across browser sessions
- Data is available immediately on page reload
- No data loss when the browser is closed

### Contact Data Structure

```typescript
interface ContactFormValues {
  id: number;
  name: string;
  contact: string;
  email: string;
  address1: string;
  address2?: string;
  state: string | null;
  pincode: string;
}
```

## ✅ Form Validation

Form validation is handled using **Yup** schema validation with the following rules:

- **Name**: Required, trimmed
- **Contact**: Required, 7-15 digits only
- **Email**: Required, valid email format
- **Address Line 1**: Required, trimmed
- **Address Line 2**: Optional
- **State**: Required, must be selected from dropdown
- **Pincode**: Required, 5-6 digits only

Validation errors are displayed inline below each field when:
- The field has been touched (user interacted with it)
- The field contains invalid data

## ⚠️ Limitations

### Current Limitations

1. **Static Data Storage**: 
   - All contact data is stored locally in the browser's local storage
   - No backend API integration
   - Data is not synchronized across devices or browsers
   - Data can be lost if local storage is cleared

2. **No API Calls**:
   - No server-side persistence
   - No data synchronization
   - No user authentication
   - No data backup or cloud storage

3. **Client-Side Only**:
   - All operations are performed client-side
   - No server-side validation
   - No data sharing between users
   - Limited scalability

4. **Browser Dependency**:
   - Data is tied to the specific browser and device
   - Clearing browser data will remove all contacts
   - No data recovery mechanism

### Data Persistence

- Contacts are stored in browser's `localStorage` via Redux Persist
- Storage key: `persist:root`
- Data format: JSON serialized Redux state
- Storage limit: Typically 5-10MB per domain (browser dependent)

## 🔮 Future Enhancements

### Potential Improvements

1. **Backend Integration**:
   - RESTful API for CRUD operations
   - Database persistence (PostgreSQL, MongoDB, etc.)
   - User authentication and authorization
   - Multi-user support

2. **Enhanced Features**:
   - Contact import/export (CSV, JSON)
   - Contact categories/tags
   - Contact notes and history
   - Contact photo upload
   - Advanced search and filtering
   - Sorting options (by name, email, date added, etc.)

3. **User Experience**:
   - Pagination for large contact lists
   - Infinite scroll
   - Dark mode support
   - Keyboard shortcuts
   - Undo/redo functionality

4. **Data Management**:
   - Data backup and restore
   - Data export/import
   - Contact merging
   - Duplicate detection

5. **Performance**:
   - Virtual scrolling for large lists
   - Lazy loading
   - Code splitting
   - Service worker for offline support

6. **Testing**:
   - Unit tests for components
   - Integration tests
   - End-to-end tests
   - Test coverage reports

## 📝 Notes

- The application uses a 2-3 second delay simulation for form submissions and deletions to demonstrate loading states
- Contact IDs are generated using a random number generator (1000-9999 range)
- The state dropdown currently includes 8 Indian states (AP, BR, GJ, HR, KA, KL, MP, PB)
- Mobile responsiveness is achieved through CSS media queries and a separate mobile view in the Table component

## 🤝 Contributing

This is a demonstration project. For production use, consider implementing:
- Backend API integration
- Proper error handling
- Loading states
- Error boundaries
- Comprehensive testing
- Security best practices

## 📄 License

This project is created for demonstration purposes.

---

**Built with ❤️ using React, TypeScript, and Redux Toolkit**
