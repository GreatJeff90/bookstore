# 📚 UNIPORT Bookstore - E-Commerce Platform

A complete web-based bookstore system for University of Port Harcourt, built with HTML, Tailwind CSS, and JavaScript.

## 🚀 Live Demo
[Add your live URL here when deployed]

## 📋 Table of Contents
- [Features](#features)
- [User Guide](#user-guide)
- [Admin Guide](#admin-guide)
- [Technical Details](#technical-details)
- [Installation](#installation)
- [File Structure](#file-structure)

## ✨ Features

### 👥 User Features
- **User Registration & Authentication** - Role-based accounts (Student, Faculty, Staff, Admin)
- **Book Catalog** - Browse and search books with filters
- **Shopping Cart** - Add/remove items with quantity control
- **Secure Checkout** - Mock Paystack payment integration
- **Order Tracking** - View order history and status
- **User Profiles** - Manage personal information and orders

### 🛠️ Admin Features
- **Dashboard** - Sales analytics and statistics
- **Inventory Management** - Add/edit/delete books
- **Order Management** - Process and track orders
- **User Management** - View registered users
- **Stock Alerts** - Low inventory notifications

## 👤 User Guide

### 🎯 Getting Started
1. **Register Account**
   - Visit `register.html`
   - Fill in personal details
   - Choose role (Student, Faculty, Staff)
   - Use university email for verification

2. **Browse Books**
   - Visit `books.html` 
   - Use search bar to find specific books
   - Filter by department, course, price, format
   - Click any book to view details

3. **Purchase Books**
   - Add books to cart from catalog or details page
   - Review cart at `cart.html`
   - Apply promo codes: `UNIPORT10`, `STUDENT15`, `WELCOME20`, `FIRSTORDER`
   - Proceed to checkout with secure payment

### 🔐 Authentication System
- **Registration**: Creates user account in localStorage
- **Login**: Validates credentials and creates session
- **Session Management**: Automatic login state across pages
- **Protected Routes**: Checkout and profile require authentication

### 🛒 Shopping Features
- **Cart Persistence**: Items saved in browser storage
- **Quantity Control**: Adjust item quantities in cart
- **Promo Codes**: Discount system for special offers
- **Order History**: Track all previous purchases

## 👨‍💼 Admin Guide

### 🔧 Accessing Admin Panel
**Method 1: Browser Console (Quick Setup)**
```javascript
// Run in browser console after logging in
const user = JSON.parse(localStorage.getItem('currentUser'));
user.role = 'admin';
localStorage.setItem('currentUser', JSON.stringify(user));
location.reload();
```

**Method 2: Special Admin Registration**
- Register with email containing "admin"
- System automatically grants admin privileges

### 📊 Admin Dashboard Features
1. **Statistics Overview**
   - Total sales and revenue
   - Order count and growth metrics
   - Book inventory count
   - Low stock alerts

2. **Book Management**
   - Add new books with full details
   - Edit existing book information
   - Manage stock levels
   - Restock low inventory items

3. **Order Management**
   - View all customer orders
   - Update order status (confirmed → shipped → delivered)
   - Process returns and refunds
   - Generate order reports

4. **User Management**
   - View registered users
   - Monitor user activity
   - Manage user roles

## 🛠️ Technical Details

### 🏗️ Architecture
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Storage**: Browser localStorage for data persistence
- **Authentication**: JWT-like session management
- **Payment**: Mock Paystack integration

### 📁 Data Structure
```javascript
// User Object
{
  id: number,
  name: string,
  email: string,
  role: 'student' | 'faculty' | 'staff' | 'admin',
  department: string,
  loggedIn: boolean,
  loginTime: string
}

// Book Object  
{
  id: number,
  title: string,
  author: string,
  price: number,
  stock: number,
  department: string,
  course: string,
  rating: number,
  description: string
}

// Order Object
{
  id: string,
  items: array,
  total: string,
  status: string,
  shippingInfo: object,
  payment: object
}
```

### 🔒 Security Features
- Input validation on all forms
- Role-based access control
- Protected route authentication
- Secure data handling in localStorage

## 📦 Installation

### Local Development
1. **Clone or Download** all HTML files
2. **Open** `index.html` in web browser
3. **No server required** - runs directly in browser

### File Structure
```
uniport-bookstore/
├── index.html              # Homepage
├── books.html              # Book catalog
├── book-details.html       # Individual book pages
├── cart.html               # Shopping cart
├── checkout.html           # Checkout process
├── login.html              # User login
├── register.html           # User registration
├── profile.html            # User profile
├── order-tracking.html     # Order history
├── admin.html              # Admin dashboard
├── js/
│   └── main.js             # Core functionality
└── assets/                 # Images and resources
```

## 🎨 Design System

### Color Scheme
- **Primary**: UNIPORT Blue (#0000ff)
- **Secondary**: UNIPORT Gold (#F2A900)
- **Background**: Gray-50 (#F9FAFB)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Responsive navigation bar
- Card-based book displays
- Modal dialogs for actions
- Toast notifications
- Form validation with visual feedback

## 🔄 Workflow Examples

### Student Purchase Flow
1. Register/Login → Browse Books → Add to Cart → Checkout → Order Confirmation

### Admin Management Flow  
1. Login → Dashboard → Add Books → Manage Orders → View Analytics

### Book Discovery Flow
1. Search/Filters → Book Details → Related Books → Add to Cart

## 🚀 Deployment

### Static Hosting Options
- **Netlify**: Drag and drop HTML files
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Free hosting for static sites
- **AWS S3**: Scalable cloud storage

### Environment Setup
No environment variables needed - completely client-side application.

## 📞 Support

For technical issues or questions:
1. Check browser console for errors
2. Clear localStorage and retry actions
3. Ensure JavaScript is enabled
4. Use modern browsers (Chrome, Firefox, Safari, Edge)

## 🔮 Future Enhancements

### Planned Features
- [ ] Backend API integration
- [ ] Real payment processing
- [ ] Email notifications
- [ ] Advanced search with AI
- [ ] Mobile app version
- [ ] Inventory barcode system
- [ ] Multi-language support

### Technical Improvements
- [ ] Progressive Web App (PWA)
- [ ] Service workers for offline functionality
- [ ] Database migration from localStorage
- [ ] API rate limiting and security
- [ ] Automated testing suite

---

**Developed for University of Port Harcourt** 🎓  
*Transforming academic resource access through technology*