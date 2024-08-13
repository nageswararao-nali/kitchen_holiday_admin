import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';



function OrdersNew() {
  const navigate = useNavigate();
    const [status , setStatus] = useState(null)
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)

    const getOrdersData = async () => {
      await dispatch(getOrders({}))
    }
    useEffect(() => {
        if(!orders.length && !status) {
          getOrdersData()
        }
    }, [orders])

    const updateOrder = async(orderId, statusD) => {
      console.log(orderId, status)
      await dispatch(updateOrderStatus({orderId, status: statusD}))
      filterOrders(status)

    }

    const filterOrders = async (statusValue) => {
      if(statusValue) {
        await dispatch(getOrders({status: statusValue}))
      } else {
        await dispatch(getOrders({}))
      }
      
    }
    const columns = [
      {
        dataField: "id",
        text: "Order ID",
      },
      {
        dataField: "orderDateTime",
        text: "Order Date",
        formatter: (cell, row, rowIndex) => {
          return (
            row.orderDateTime
          )
        }
      },
      {
        dataField: "customerName",
        text: "Customer Name",
      },
      {
        dataField: "address",
        text: "Address",
      },
      {
        dataField: "totalAmount",
        text: "Amount"
      },
      {
        dataField: "status",
        text: "Status"
      },
      {
        isDummyField: true,
        text: 'Actions',
        formatter: (cell, row, rowIndex) => {
          return (
            <div key={row.id} style={{display: "flex", justifyContent: 'space-evenly'}}>
                {/* <i style={{color: 'green'}} className="bi bi-pencil-fill"
                onClick={() => {
                    navigate('/items/edit/'+row.id)
                  } } /> */}
                  
                  <Dropdown drop={"start"}> 
                    <Dropdown.Toggle variant="success"> 
                    <i style={{color: 'green'}} className="bi bi-pencil-fill" />
                    </Dropdown.Toggle> 
                    <Dropdown.Menu> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'confirmed')}}> 
                        Confirm
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'preparing')}}> 
                        Preparing 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'ready')}}> 
                        Ready to Pickup 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'completed')}}> 
                        Completed 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'cancelled')}}> 
                        Cancelled
                      </Dropdown.Item> 
                    </Dropdown.Menu> 
                  </Dropdown>
														
            </div>
          )
        }
      }
    ];
  return (
   <div class="container-fluid">
    <div class="mb-sm-4 d-flex flex-wrap align-items-center text-head">
      <h2 class="mb-3 me-auto">Order Page List</h2>
        <div>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active"><a href="/react/demo/order-list">Order</a></li>
            <li class="breadcrumb-item"><a href="/react/demo/order-list">Oder List</a></li>
            </ol>
          </div>
        </div>
        <div class="mb-4 d-flex justify-content-between align-items-center flex-wrap">
          <div class="customer-search sm-mb-0 mb-3">
            <div class="input-group search-area">
              <input type="text" class="form-control" placeholder="Search here......"/>
              <span class="input-group-text"><a href="/react/demo/order-list"><i class="bi bi-search"></i></a>
              </span>
            </div>
          </div>
        <div>        
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="table-responsive">
          <div id="example2_wrapper" class="dataTables_wrapper no-footer">
            <table id="example2" class="table display mb-4 dataTablesCard order-table shadow-hover  card-table text-black dataTable no-footer" role="grid" aria-describedby="example2_info">
            <thead>
            <tr role="row">
            <th class="sorting_asc">
              <div class="form-check ms-2">
                <input type="checkbox" class="form-check-input" id="checkAll"/>
                <label class="form-check-label" for="checkAll"></label>
              </div>
              </th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Status Order</th>
              <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr role="row" class="odd">
              <td class="sorting_1">
                <div class="form-check ms-2">
                  <input type="checkbox" class="form-check-input" id="customCheckBox2"/>
                  <label class="form-check-label" for="customCheckBox2"></label>
                </div>
              </td>
              <td>#0001234</td><td class="wspace-no">26 March 2020, 12:42 AM</td>
              <td>Olivia Shine</td><td class="text-ov">35 Station Road London</td>
              <td class="text-ov">$82.46</td>
              <td><span class="btn bgl-danger text-danger btn-rounded btn-sm">Pending</span></td>
              <td><div class="dropdown ml-auto dropdown">
                  <div class="btn-link i-false dropdown-toggle" id="react-aria8134856515-98" aria-expanded="false" data-bs-toggle="dropdown"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
                  <div x-placement="bottom-start" aria-labelledby="react-aria8134856515-98" class="dropdown-menu dropdown-menu-right dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start"><a data-rr-ui-dropdown-item="" class="text-black dropdown-item" role="button" tabindex="0" href="#"><i class="far fa-check-circle me-1 text-success"></i> Accept order</a><a data-rr-ui-dropdown-item="" class="text-black dropdown-item" role="button" tabindex="0" href="#"><i class="far fa-times-circle me-1 text-danger"></i> Reject order</a></div>
                  </div>
              </td>
              </tr>
              <tr role="row" class="even"><td class="sorting_1">
                <div class="form-check  ms-2">
                  <input type="checkbox" class="form-check-input" id="customCheckBox21"/><label class="form-check-label" for="customCheckBox21"></label>
                </div>
              </td>
              <td>#0001234</td>
              <td class="wspace-no">26 March 2020, 12:42 AM</td>
              <td>James WItcwicky</td><td class="text-ov">Corner Street 5th London</td>
              <td class="text-ov">$82.46</td>
              <td><span class="btn bgl-success text-success btn-rounded btn-sm">DELIVERED</span></td>
              <td><div class="dropdown ml-auto dropdown">
                  <div class="btn-link i-false dropdown-toggle" id="react-aria8134856515-99" aria-expanded="false" data-bs-toggle="dropdown"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
                  </div>
                </td>
                </tr>
                <tr role="row" class="odd"><td class="sorting_1"><div class="form-check  ms-2"><input type="checkbox" class="form-check-input" id="customCheckBox22"/><label class="form-check-label" for="customCheckBox22"></label></div></td><td>#0001234</td><td class="wspace-no">26 March 2020, 12:42 AM</td><td>Veronica</td><td class="text-ov">21 King Street London</td><td class="text-ov">$82.46</td><td><span class="btn bgl-danger text-danger btn-rounded btn-sm">PENDING</span></td><td><div class="dropdown ml-auto dropdown"><div class="btn-link i-false dropdown-toggle" id="react-aria8134856515-100" aria-expanded="false" data-bs-toggle="dropdown"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div></td></tr>
                <tr role="row" class="even"><td class="sorting_1"><div class="form-check  ms-2"><input type="checkbox" class="form-check-input" id="customCheckBox23"/><label class="form-check-label" for="customCheckBox23"></label></div></td><td>#0001234</td><td class="wspace-no">26 March 2020, 12:42 AM</td><td>Emilia Johanson</td><td class="text-ov">67 St. John’s Road London</td><td class="text-ov">$82.46</td><td><span class="btn bgl-success text-success btn-rounded btn-sm">DELIVERED</span></td><td><div class="dropdown ml-auto dropdown"><div class="btn-link i-false dropdown-toggle" id="react-aria8134856515-101" aria-expanded="false" data-bs-toggle="dropdown"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div></td></tr>
                <tr role="row" class="odd"><td class="sorting_1"><div class="form-check  ms-2"><input type="checkbox" class="form-check-input" id="customCheckBox24"/><label class="form-check-label" for="customCheckBox24"></label></div></td><td>#0001234</td><td class="wspace-no">26 March 2020, 12:42 AM</td><td>Emilia Johanson</td><td class="text-ov">67 St. John’s Road London</td><td class="text-ov">$82.46</td><td><span class="btn bgl-success text-success btn-rounded btn-sm">DELIVERED</span></td><td><div class="dropdown ml-auto dropdown"><div class="btn-link i-false dropdown-toggle" id="react-aria8134856515-102" aria-expanded="false" data-bs-toggle="dropdown"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z" stroke="#3E4954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div></td></tr>
                </tbody></table><div class="d-sm-flex text-center justify-content-between align-items-center mt-3"><div class="dataTables_info">Showing 1 to 10 of 11 entries</div><div class="dataTables_paginate paging_simple_numbers" id="example2_paginate"><a class="paginate_button previous disabled" href="/react/demo/order-list"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a><span><a class="paginate_button  current " href="/react/demo/order-list">1</a><a class="paginate_button   " href="/react/demo/order-list">2</a></span><a class="paginate_button next" href="/react/demo/order-list"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a></div></div></div></div></div></div></div>
  );
}

export default OrdersNew;
