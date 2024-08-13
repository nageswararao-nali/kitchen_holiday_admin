import logo from './logo.svg';
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import './App.css';
import Otp from './pages/Otp';
import Layout from './components/Layout/Layout';
import Orders from './pages/Orders/Orders';
import Users from './pages/Users';
import AddUser from './pages/Users/add';
import Items from './pages/Item';
import AddItem from './pages/Item/add';
import SubItem from './pages/SubItem';
import AddSubItem from './pages/SubItem/add';
import Subscriptions from './pages/Subscription';
import AddSubscription from './pages/Subscription/add';
import Category from './pages/Category';
import AddOrder from './pages/Orders/AddOrder';
import Zones from './pages/DeliveryZone';
import AddZone from './pages/DeliveryZone/add';
import ItemMapping from './pages/SubItem/mapping';
import OrdersNew from './pages/OrdersNew/OrdersNew';
import OrderDetails from './pages/OrderDetails/orderDetails';

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/"  element={<ProtectedRoute />} >
            <Route path="/" element={<Home />} />
          </Route>
           <Route path="/ordersNew"  element={<OrdersNew />} >
          </Route>
          { <Route path="/orderDetails"  element={<OrderDetails />} >
            
          </Route> }
          <Route path="/orders"  element={<ProtectedRoute />} >
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/add" element={<AddOrder />} />
          </Route>
          <Route path="/users"  element={<ProtectedRoute />} >
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
          </Route>
          <Route path="/categories"  element={<ProtectedRoute />} >
            <Route path="/categories" element={<Category />} />
          </Route>
          <Route path="/items"  element={<ProtectedRoute />} >
            <Route path="/items" element={<Items />} />
            <Route path="/items/add" element={<AddItem />} />
            <Route path="/items/edit/:itemId" element={<AddItem />} />
            <Route path="/items/mapping" element={<ItemMapping />} />
          </Route>
          <Route path="/sub-items"  element={<ProtectedRoute />} >
            <Route path="/sub-items" element={<SubItem />} />
            <Route path="/sub-items/add" element={<AddSubItem />} />
          </Route>
          <Route path="/subscriptions"  element={<ProtectedRoute />} >
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/subscriptions/add" element={<AddSubscription />} />
          </Route>
          <Route path="/delivery-zone"  element={<ProtectedRoute />} >
            <Route path="/delivery-zone" element={<Zones />} />
            <Route path="/delivery-zone/add" element={<AddZone />} />
          </Route>
          
          <Route path="/login"  element={<Login />} />
          <Route path="/otp"  element={<Otp />} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
