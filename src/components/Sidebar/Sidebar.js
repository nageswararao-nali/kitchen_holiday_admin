import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)
  const navigateToRoute = (routeName) => {
    console.log("welcome to navigation")

    navigate('/'+routeName)
  }
  return (
    <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('')}>
          <NavLink to="/" className="nav-link collapsed">
            <i className="bi bi-grid-1x2-fill"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('users')}>
          <NavLink to="users" className="nav-link collapsed" >
          <i class="bi bi-people-fill"></i>
            <span>Users</span>
          </NavLink>
        </li>
        : null
      }
       {
        (user.user_type == "admin") ?
        <li className="nav-item " onClick={() => navigateToRoute('customers')}>
          <NavLink to="customers" className="collapsed nav-link " >
          <i class="bi bi-people-fill"></i>
            <span>Customers</span>
          </NavLink>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item">
           <NavLink to="/" className="nav-link collapsed inn" data-bs-target="#orders-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-bag-check-fill"></i><span>Orders</span><i className="bi bi-caret-right-fill ms-auto"></i>
          </NavLink>
          <ul id="orders-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">           
            <li onClick={() => navigateToRoute('all-orders')}>
            <NavLink to="all-orders">
              <i class="bi bi-diamond"></i><span>All Orders</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('today-orders')}>
            <NavLink to="today-orders">
              <i class="bi bi-diamond"></i><span>Today Orders</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('orders')}>
            <NavLink to="orders">
              <i class="bi bi-diamond"></i><span>Normal Orders</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('sub-orders')}>
            <NavLink to="sub-orders">
              <i class="bi bi-diamond"></i><span>Subscription Orders</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('users-subscriptions')}>
            <NavLink to="sub-orders">
              <i class="bi bi-diamond"></i><span>User Subscriptions</span>
              </NavLink>
            </li>
          </ul>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item">
          <NavLink to="/" className="nav-link collapsed inn" data-bs-target="#items-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-view-list"></i><span>Items</span><i className="bi bi-caret-right-fill ms-auto"></i>
          </NavLink>
          <ul id="items-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li onClick={() => navigateToRoute('categories')}>
              <NavLink to="categories">
              <i class="bi bi-diamond"></i><span>Categories</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('items')}>
            <NavLink to="items">
              <i class="bi bi-diamond"></i><span>Items</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('sub-items')}>
              <NavLink to="sub-items">
              <i class="bi bi-diamond"></i><span>Sub Items</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('items/mapping')}>
              <NavLink to="items/mapping">
              <i class="bi bi-diamond"></i><span>Items Mapping</span>
              </NavLink>
            </li>
          </ul>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('subscriptions')}>           
          <NavLink to="/" className="nav-link collapsed inn" data-bs-target="#subscriptions-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-view-list"></i><span>Subscriptions</span><i className="bi bi-caret-right-fill ms-auto"></i>
          </NavLink>
          <ul id="subscriptions-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li onClick={() => navigateToRoute('subscriptions')}>
              <NavLink to="subscriptions">
              <i class="bi bi-diamond"></i><span>Subscriptions</span>
              </NavLink>
            </li>
            <li onClick={() => navigateToRoute('subscriptions/subscription_users')}>
              <NavLink to="subscriptions/subscription_users">
              <i class="bi bi-diamond"></i><span>Subscriptions Users</span>
              </NavLink>
            </li>
          </ul>
        </li>
        : null
      }
      {
        (user.user_type == "admin") ?
        <li className="nav-item" onClick={() => navigateToRoute('delivery-zone')}>
          <NavLink to="delivery-zone" className="nav-link collapsed" >
            <i className="bi bi-map-fill"></i>
            <span>Delivery Zone</span>
          </NavLink>
        </li> : null
      }
      
      {
        (user.user_type == "admin" || user.user_type == "delivery boy") ?
          <li className="nav-item" onClick={() => navigateToRoute('delivery-orders')}>
          <NavLink to="delivery-orders" className="nav-link collapsed" >
          <i class="bi bi-truck"></i>
            <span>Delivery Orders</span>
          </NavLink>
        </li>
        : null
      }
      
      {
        (user.user_type == "admin" || user.user_type == "kitchen") ?
        <li className="nav-item" onClick={() => navigateToRoute('kitchen-orders')}>
          <NavLink to="kitchen-orders"  className="nav-link collapsed" >
          <i class="bi bi-egg-fill"></i>
            <span>Kitchen Orders</span>
          </NavLink>
        </li>
        : null
      }
       {
        (user.user_type == "admin") ?
        <li className="nav-item">
           <NavLink to="invoices" className="nav-link collapsed" data-bs-target="#invoice-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-receipt-cutoff"></i><span className="flex-1">Invoice and Payments</span><i className="bi bi-caret-right-fill ms-auto"></i>
          </NavLink>
          <ul id="invoice-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li onClick={() => navigateToRoute('invoices')}>
              <a >
              <i class="bi bi-diamond"></i><span>Invoices </span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('payments-refunds')}>
              <a>
              <i class="bi bi-diamond"></i><span>Payments & Refunds</span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('tax')}>
              <a>
              <i class="bi bi-diamond"></i><span>Tax </span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('discount')}>
              <a>
              <i class="bi bi-diamond"></i><span>Discount </span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('delivery-fee')}>
              <a>
              <i class="bi bi-diamond"></i><span>Delivery Fee  </span>
              </a>
            </li>
            <li onClick={() => navigateToRoute('hanfling-charges')}>
              <a>
              <i class="bi bi-diamond"></i><span>Handling Charges  </span>
              </a>
            </li>
          </ul>
        </li>
        : null
      }
      
    </ul>

  </aside>

  
  );
}