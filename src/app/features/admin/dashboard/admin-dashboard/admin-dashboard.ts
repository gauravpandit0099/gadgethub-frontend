import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../../layout/admin-sidebar/admin-sidebar';
import { AdminNavbar } from '../../layout/admin-navbar/admin-navbar';
import { AdminFooter } from '../../layout/admin-footer/admin-footer';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,     
    AdminSidebar,
    AdminNavbar,
    AdminFooter,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})

export class AdminDashboard {
  activeNav = 'Dashboard';
  selectedPeriod = 'This year';
  searchQuery = '';

  readonly navigation = [
    {
      title: 'MAIN MENU',
      items: [
        { name: 'Dashboard', icon: 'dashboard' },
        { name: 'Products', icon: 'box' },
        { name: 'Categories', icon: 'layers' },
        { name: 'Orders', icon: 'shopping-cart', badge: '8' },
        { name: 'Customers', icon: 'users' },
        { name: 'Inventory', icon: 'package' },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { name: 'Sales Reports', icon: 'chart' },
        { name: 'Top Products', icon: 'trending' },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { name: 'Coupons', icon: 'ticket' },
        { name: 'Banners', icon: 'image' },
        { name: 'Settings', icon: 'settings' },
      ],
    },
  ];

  readonly stats = [
    {
      title: 'Total Revenue',
      value: '₹2,48,590',
      change: '+12.8%',
      caption: 'vs. last month',
      icon: 'revenue',
      color: 'violet',
      points: '0,34 18,27 34,31 52,17 69,22 87,9 104,14 123,2',
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
      caption: 'vs. last month',
      icon: 'cart',
      color: 'cyan',
      points: '0,32 17,24 34,29 52,12 68,18 86,4 104,13 123,0',
    },
    {
      title: 'Total Products',
      value: '356',
      change: '+3.6%',
      caption: 'vs. last month',
      icon: 'box',
      color: 'orange',
      points: '0,31 18,20 35,27 52,13 70,18 87,6 104,10 123,1',
    },
    {
      title: 'Total Customers',
      value: '892',
      change: '+15.4%',
      caption: 'vs. last month',
      icon: 'users',
      color: 'emerald',
      points: '0,34 17,28 35,17 52,22 69,10 87,15 105,5 123,0',
    },
  ];

  readonly categories = [
    { name: 'Mobile Phones', percent: 32, color: '#8b5cf6' },
    { name: 'Audio & Headphones', percent: 24, color: '#06b6d4' },
    { name: 'Laptops', percent: 19, color: '#f59e0b' },
    { name: 'Accessories', percent: 15, color: '#10b981' },
    { name: 'Smart Wearables', percent: 10, color: '#ec4899' },
  ];

  readonly orders = [
    {
      id: '#GH-1028',
      customer: 'Rahul Sharma',
      initials: 'RS',
      product: 'Wireless Headphones',
      amount: '₹4,999',
      status: 'Processing',
      date: '22 Oct 2026',
      avatar: 'from-violet-500 to-indigo-500',
    },
    {
      id: '#GH-1027',
      customer: 'Priya Patel',
      initials: 'PP',
      product: 'Smart Watch Pro',
      amount: '₹7,499',
      status: 'Completed',
      date: '22 Oct 2026',
      avatar: 'from-pink-500 to-rose-500',
    },
    {
      id: '#GH-1026',
      customer: 'Amit Verma',
      initials: 'AV',
      product: 'USB-C Fast Charger',
      amount: '₹1,299',
      status: 'Shipped',
      date: '21 Oct 2026',
      avatar: 'from-cyan-500 to-blue-500',
    },
    {
      id: '#GH-1025',
      customer: 'Sneha Joshi',
      initials: 'SJ',
      product: 'Bluetooth Speaker',
      amount: '₹3,299',
      status: 'Pending',
      date: '21 Oct 2026',
      avatar: 'from-orange-500 to-pink-500',
    },
  ];

  readonly quickActions = [
    {
      title: 'Add Product',
      description: 'Expand your catalogue',
      icon: 'plus',
      color: 'violet',
      target: 'Products',
    },
    {
      title: 'Manage Orders',
      description: 'Review customer orders',
      icon: 'cart',
      color: 'cyan',
      target: 'Orders',
    },
    {
      title: 'Manage Inventory',
      description: 'Check your stock levels',
      icon: 'package',
      color: 'emerald',
      target: 'Inventory',
    },
    {
      title: 'View Reports',
      description: 'Explore store performance',
      icon: 'chart',
      color: 'orange',
      target: 'Sales Reports',
    },
  ];

  readonly months = [
    { name: 'Jan', revenue: 38, orders: 23 },
    { name: 'Feb', revenue: 48, orders: 29 },
    { name: 'Mar', revenue: 42, orders: 26 },
    { name: 'Apr', revenue: 57, orders: 35 },
    { name: 'May', revenue: 52, orders: 32 },
    { name: 'Jun', revenue: 66, orders: 40 },
    { name: 'Jul', revenue: 59, orders: 37 },
    { name: 'Aug', revenue: 78, orders: 49 },
    { name: 'Sep', revenue: 72, orders: 45 },
    { name: 'Oct', revenue: 91, orders: 56 },
    { name: 'Nov', revenue: 82, orders: 51 },
    { name: 'Dec', revenue: 98, orders: 63 },
  ];

  setActiveNav(name: string): void {
    this.activeNav = name;
  }

  openQuickAction(target: string): void {
    this.activeNav = target;
  }

  onSearch(value: string): void {
    this.searchQuery = value;
  }

  get filteredOrders() {
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) {
      return this.orders;
    }

    return this.orders.filter((order) =>
      [
        order.id,
        order.customer,
        order.product,
        order.status,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }
}
