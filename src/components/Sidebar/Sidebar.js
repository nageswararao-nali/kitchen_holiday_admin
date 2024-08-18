import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const navigateToRoute = (routeName) => {
    console.log("welcome to navigation")

    navigate('/'+routeName)
  }
  return (
    <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item" onClick={() => navigateToRoute('')}>
        <a className="nav-link ">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <li className="nav-item" onClick={() => navigateToRoute('users')}>
        <a className="nav-link collapsed" >
          <i className="bi bi-person"></i>
          <span>Users</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#orders-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-cart-check-fill"></i><span>Orders</span><i className="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="orders-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li onClick={() => navigateToRoute('orders')}>
            <a >
              <i className="bi bi-circle"></i><span>Normal Orders</span>
            </a>
          </li>
          <li onClick={() => navigateToRoute('sub-orders')}>
            <a>
              <i className="bi bi-circle"></i><span>Subscription Orders</span>
            </a>
          </li>
          <li onClick={() => navigateToRoute('all-orders')}>
            <a>
              <i className="bi bi-circle"></i><span>All Orders</span>
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#items-nav" data-bs-toggle="collapse" href="#">
          <i className="bi bi-journal-text"></i><span>Items</span><i className="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="items-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li onClick={() => navigateToRoute('categories')}>
            <a >
              <i className="bi bi-circle"></i><span>Categories</span>
            </a>
          </li>
          <li onClick={() => navigateToRoute('items')}>
            <a>
              <i className="bi bi-circle"></i><span>Items</span>
            </a>
          </li>
          <li onClick={() => navigateToRoute('sub-items')}>
            <a>
              <i className="bi bi-circle"></i><span>Sub Items</span>
            </a>
          </li>
          <li onClick={() => navigateToRoute('items/mapping')}>
            <a>
              <i className="bi bi-circle"></i><span>Items Mapping</span>
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item" onClick={() => navigateToRoute('subscriptions')}>
        <a className="nav-link collapsed" >
          <i className="bi bi-person"></i>
          <span>Subscriptions</span>
        </a>
      </li>
      <li className="nav-item" onClick={() => navigateToRoute('delivery-zone')}>
        <a className="nav-link collapsed" >
          <i className="bi bi-map"></i>
          <span>Delivery Zone</span>
        </a>
      </li>
      <li className="nav-item" onClick={() => navigateToRoute('orders-new')}>
        <a className="nav-link collapsed" >
          <i className="bi bi-map"></i>
          <span>Orders New</span>
        </a>
      </li>
    </ul>

  </aside>

  
  );
}