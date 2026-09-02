// sidebarLinks.js

export const creatorLinks = [
  { name: 'Dashboard', href: '/dashboard', image: '/assets/Home.svg' },
  { name: 'My Products', href: '/dashboard/products', image: '/assets/Shop.svg' },
  { name: 'Orders', href: '/dashboard/orders', image: '/assets/Package.svg' },
  { name: 'Profile', href: '/profile', image: '/assets/User_alt.svg' },
  { name: 'Settings', href: '/dashboard/settings', image: '/assets/Setting_line.svg' },
];

export const customerLinks = [
  { name: 'Home', href: '/', image: '/assets/home.svg' },
  { name: 'Shop', href: '/products', image: '/assets/shop.svg' },
  { name: 'Cart', href: '/cart', image: '/assets/cart.svg' },
  { name: 'My Orders', href: '/orders', image: '/assets/Package.svg' },
  { name: 'Wishlist', href: '/wishlist', image: '/assets/wishlist.svg' },
  { name: 'Profile', href: '/profile', image: '/assets/User_alt.svg' },
];

export const adminLinks = [
  { name: 'Admin Dashboard', href: '/admin/dashboard', image: '/assets/admin-dashboard.svg' },
  { name: 'Manage Products', href: '/admin/products', image: '/assets/manage-products.svg' },
  { name: 'Manage Users', href: '/admin/users', image: '/assets/manage-users.svg' },
  { name: 'Orders', href: '/admin/orders', image: '/assets/orders.svg' },
  { name: 'Reports', href: '/admin/reports', image: '/assets/reports.svg' },
  { name: 'Site Settings', href: '/admin/settings', image: '/assets/settings.svg' },
];

export const commonLinks = [
  { name: 'Help/FAQ', href: '/help', image: '/assets/Question.svg' },
  { name: 'Logout', href: '/logout', image: '/assets/Sign_out.svg' },
];

export const categories = [
  { name: "Clothing", image: "https://images.unsplash.com/photo-1679217121311-cdba4c533593?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbGUlMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Gadgets", image: "https://images.unsplash.com/photo-1636115305669-9096bffe87fd?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Casual", image: "https://images.unsplash.com/photo-1504573356050-57fe98afe7ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym9vdHN8ZW58MHx8MHx8fDA%3D" },
  { name: "Digital Products", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYnNpdGV8ZW58MHx8MHx8fDA%3D" },
  // Add more categories as needed
];

export const products = [
  {
    id:0,
    name: "Sturdy Hoodie",
    image: "https://i.redd.it/7oj5jvmxnvo71.jpg",
    price: 29.99,
    rating: 4,
    stock: 10,
    creator:'Kai Cenat',
    creatorId:'1'
  },
  {
    id:1,
    name: "Cow Print Case",
    image: "https://i.pinimg.com/736x/08/48/f1/0848f16dbab2b2e8d5d1f2416a328611.jpg",
    price: 49.99,
    rating: 5,
    stock: 0,
    creator:'Mr Beast',
    creatorId:'3'
  },
  {
    id:2,
    name: "Fly Boxing Gloves",
    image: "https://pbs.twimg.com/media/FsfCYIYXsB0oR2L?format=jpg&name=4096x4096",
    price: 89.99,
    rating: 4,
    stock: 5,
    creator:'KSI',
    creatorId:'2'
  },
  {
    id:3,
    name: "Premium Feastables",
    image: "https://i.ytimg.com/vi/AjwAdtlRKf8/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBh--egqPbL7rx1-BlbMQWW7yUv8g",
    price: 9.99,
    rating: 3,
    stock: 100,
    creator:'Mr Beast',
    creatorId:'3'
  },
  // Add more products as needed
];

export const creators = [
  {
    id: 0,
    name: "Fiago",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7UV3-kjC1C5P85DBcdk_UnUOdOGWZwcwpTQ&s",
    description: "Soccer and Sport YouTuber"
  },
  {
    id: 2,
    name: "KSI",
    image: "https://static.independent.co.uk/2022/12/29/12/KSI.jpg?width=1200",
    description: "Knowledge, Strength and Integrity",
  },
  {
    id: 3,
    name: "Mr Beast",
    image: "https://yt3.googleusercontent.com/fxGKYucJAVme-Yz4fsdCroCFCrANWqw0ql4GYuvx8Uq4l_euNJHgE-w9MTkLQA805vWCi-kE0g=s900-c-k-c0x00ffffff-no-rj",
    description: "Unleash the beast!!!",
  },
  // Add more creators as needed
];

