# React + Vite


admin= "email": "admin@trendora.com",
  "password": "admin123"
  
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




mere frontend me ek profile page hoga, jab user successfully login kar lega to wo profile pr ja kr additional detail dal skta hai or wo detail user me save hogi particular user ka, jisme address, gender, profile photo, etc, or mene profile page pr edit ka button diya hai jisse edit page open hoga or user wha apni detail edit kr skta hai, change profile pic ka bhi option hai wo bhi kr skta hai or ye save ho user me, iske liye api or pura setup bnao backend me.

ad eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDg3N2NkNTA0ZDM5OWU1OGNhMDMzYSIsImVtYWlsIjoiYWRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhZDEyMyIsImlhdCI6MTc0OTU4MDI1NCwiZXhwIjoxNzUwMTg1MDU0fQ._1cAHXfY93ZklyyF9TY_4JwdMhQLsxb3mUJqIddPBR8




<!-- xxxxxxxxxxxxxxxxxxxxxxx -->

Folder Structure Highlights
Admin Features: Product management (Add, Edit), Order management (OrderConfirmation, OrderDetail), Admin Dashboard, Admin Login.
User Features: Profile, EditProfile, Cart, Wishlist, TrackOrder, UserDashboard.
Pages: Home, Products, ProductDetail, Checkout, Privacy, FAQ, About, ContactUs, etc.
Assets: Images and default avatar.
Components: Navbar, Footer, Loader, etc.
Styles: Centralized CSS for user/admin/pages.

Features & Requirements Identified

Authentication
User registration and login (with unique username/email, password, phone, privacy agreement).
Admin login (single inbuilt admin, no registration from frontend).

User Profile
View and edit profile (name, phone, gender, address, profile photo).
Change profile photo (upload).
Profile info saved in user collection.

Product Management
Admin can add, edit, and manage products (with images, details, price, stock, etc.).
Product images upload support.

Cart & Wishlist
Users can add/remove products to/from cart and wishlist.
Cart supports quantity update, total calculation, and order placement.
Wishlist supports add to cart and remove.


Order Management
Place order from cart.
Track order status (with progress/history).
View order details and confirmation after placing order.
Admin can view/manage all orders.


Dashboard
User dashboard: stats (orders, wishlist, cart, addresses), quick links.
Admin dashboard: stats (products, orders, users, low stock), quick actions.
tum iska sab kuch bana do controller router model uploads ho age wo or server me connection sab kuch

Other Pages
Product listing and detail pages.
Checkout page (with shipping, payment, summary).
Privacy, FAQ, About, Contact, Return/Refund, Shipping Policy, Terms.

APIs & Backend Features Needed

Authentication
POST /api/auth/register — User registration.
POST /api/auth/login — User login.
POST /api/auth/admin/login — Admin login.

User Profile
GET /api/profile — Get user profile.
PUT /api/profile — Update user profile.
POST /api/profile/photo — Upload/change profile photo.

Product
GET /api/products — List products.
GET /api/products/:id — Product detail.
POST /api/products — Add product (admin).
PUT /api/products/:id — Edit product (admin).
DELETE /api/products/:id — Delete product (admin).
POST /api/products/upload — Upload product images.

Cart
GET /api/cart — Get user cart.
POST /api/cart — Add/update cart item.
DELETE /api/cart/:itemId — Remove cart item.

Wishlist
GET /api/wishlist — Get user wishlist.
POST /api/wishlist — Add to wishlist.
DELETE /api/wishlist/:itemId — Remove from wishlist.

Order
POST /api/orders — Place order.
GET /api/orders — Get user orders.
GET /api/orders/:id — Get order detail.
GET /api/orders/track/:id — Track order.
GET /api/admin/orders — Admin: all orders.
PUT /api/admin/orders/:id — Admin: update order status.

Dashboard Stats
GET /api/user/stats — User dashboard stats.
GET /api/admin/stats — Admin dashboard stats.

Other
Serve uploaded images (/uploads).
Middleware for auth (user/admin).
Models for User, Admin, Product, Order, Cart, Wishlist.
Utils for file upload, password hashing, JWT, etc.
