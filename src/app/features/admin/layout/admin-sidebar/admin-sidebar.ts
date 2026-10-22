
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
})
export class AdminSidebar {
  readonly navigation = [
    { label: 'Dashboard', path: '/admin', icon: 'grid' },
    { label: 'Products', path: '/admin/products', icon: 'box' },
    { label: 'Categories', path: '/admin/categories', icon: 'layers' },
    { label: 'Orders', path: '/admin/orders', icon: 'cart' },
    { label: 'Customers', path: '/admin/customers', icon: 'users' },
    { label: 'Inventory', path: '/admin/inventory', icon: 'package' },
    { label: 'Analytics', path: '/admin/analytics', icon: 'chart' },
  ];
}
