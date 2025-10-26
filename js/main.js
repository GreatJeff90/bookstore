// Enhanced main.js with complete navigation and cart management

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(bookId, bookTitle, bookPrice) {
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: bookId,
            title: bookTitle,
            price: bookPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${bookTitle} added to cart!`, 'success');
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Authentication functions
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.loggedIn;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Update navigation based on auth status
function updateNavigation() {
    const user = getCurrentUser();
    const authSection = document.getElementById('authSection');
    
    if (!authSection) return;
    
    if (user && user.loggedIn) {
        // User is logged in - show profile dropdown
        authSection.innerHTML = `
            <div class="relative group">
                <button class="flex items-center text-gray-700 hover:text-primary font-medium">
                    <i class="fas fa-user-circle mr-1"></i> 
                    ${user.name || user.email.split('@')[0]}
                    <i class="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
                <div class="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-50 right-0">
                    <a href="profile.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-user-circle mr-2"></i>My Profile
                    </a>
                    <a href="order-tracking.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-history mr-2"></i>Order History
                    </a>
                    <div class="border-t my-1"></div>
                    <a href="#" onclick="logout()" class="block px-4 py-2 text-red-600 hover:bg-red-50">
                        <i class="fas fa-sign-out-alt mr-2"></i>Logout
                    </a>
                </div>
            </div>
        `;
    } else {
        // User is not logged in - show login link
        authSection.innerHTML = `
            <a href="login.html" class="text-gray-700 hover:text-primary font-medium">
                <i class="fas fa-sign-in-alt mr-1"></i> Login
            </a>
        `;
    }
    
    // Update cart count
    updateCartCount();
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        showToast('Logged out successfully!', 'success');
        
        // Redirect to home page after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Protect routes that require authentication
function requireAuth() {
    const user = getCurrentUser();
    if (!user || !user.loggedIn) {
        showToast('Please login to access this page', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return false;
    }
    return true;
}

// Protect admin routes
function requireAdmin() {
    const user = getCurrentUser();
    if (!user || !user.loggedIn || user.role !== 'admin') {
        showToast('Admin access required', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return false;
    }
    return true;
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    }[type] || 'bg-gray-500';

    const icon = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-triangle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-circle'
    }[type] || 'fa-info-circle';

    const toastHTML = `
        <div class="toast-message fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300">
            <div class="flex items-center space-x-2">
                <i class="fas ${icon}"></i>
                <span class="font-medium">${message}</span>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', toastHTML);

    // Auto remove after 4 seconds
    setTimeout(() => {
        const toast = document.querySelector('.toast-message');
        if (toast) {
            toast.remove();
        }
    }, 4000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    
    // Check auth for protected pages
    if (window.location.pathname.includes('checkout.html') || 
        window.location.pathname.includes('profile.html') ||
        window.location.pathname.includes('order-tracking.html')) {
        if (!requireAuth()) return;
    }
    
    // Check admin access for admin pages
    if (window.location.pathname.includes('admin.html')) {
        if (!requireAdmin()) return;
    }
    
    // Update cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];
});

// Utility function to get URL parameters
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}

// Clear cart function
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    showToast('Cart cleared', 'info');
}

// Remove item from cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Item removed from cart', 'info');
}

// Update item quantity in cart
function updateCartQuantity(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(bookId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    }
}