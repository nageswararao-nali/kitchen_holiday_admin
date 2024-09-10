import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';
import * as moment from 'moment';


function DeliveryOrders() {
  const navigate = useNavigate();
    const [status , setStatus] = useState(null)
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)
    const { user } = useSelector((state) => state.auth)

    const getOrdersData = async () => {
      let reqObj = {
        orderDate: moment().format('YYYY-MM-DD'),
      }
      if(user.user_type != 'admin') {
        reqObj['userId'] = user.id
      }
      await dispatch(getOrders(reqObj))
    }

    const updateOrder = async(orderId, statusD) => {
      console.log(orderId, status)
      await dispatch(updateOrderStatus({orderId, status: statusD}))
      // filterOrders(status)
      getOrdersData()
    }
    useEffect(() => {
      getOrdersData()
    }, [])

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
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'pickedup')}}> 
                        Ready to Pickup 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'delivered')}}> 
                        Delivered 
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
              {
              (orders && orders.length) ?
              <BootstrapTable
                  bootstrap4
                  keyField="id"
                  data={orders}
                  columns={columns}
                  pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true, onPageChange:(page)=>console.log("DB CALL with page" + page) })}
              
              />
              : null
            }
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default DeliveryOrders;
