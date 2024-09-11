import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';



function Orders() {
  const navigate = useNavigate();
    const [status , setStatus] = useState(null)
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)

    const getOrdersData = async () => {
      await dispatch(getOrders({orderType: 'normal'}))
    }
    useEffect(() => {
        if(!orders.length && !status) {
          getOrdersData()
        }
    }, [orders])

    useEffect(() => {
      getOrdersData()
    }, [])

    const updateOrder = async(orderId, statusD) => {
      console.log(orderId, status)
      await dispatch(updateOrderStatus({orderId, status: statusD}))
      filterOrders(status)

    }

    const filterOrders = async (statusValue) => {
      if(statusValue) {
        await dispatch(getOrders({orderType: 'normal', status: statusValue}))
      } else {
        await dispatch(getOrders({orderType: 'normal'}))
      }
      
    }
    const columns = [
      {
        dataField: "id",
        text: "Order ID",
      },
      {
        dataField: "orderDate",
        text: "Order Date",
        formatter: (cell, row, rowIndex) => {
          return (
            row.orderDate
          )
        }
      },
      {
        dataField: "customerName",
        text: "Customer Name",
      },
      {
        dataField: "deliveryParterName",
        text: "Delivery Boy Name",
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
                    <i style={{color: '#000'}} className="bi bi-pencil-square" />
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
    <div className='container-fluid'>
       
        <div className='row mb-3'>
          <Card className='card_new'>
          <div className="card-header">
                    <div className="card-title h5">Orders</div>
                    
                </div>
                <Card.Body>
            <div className='col-sm-12'>
              <div class=" mb-3">
                <div className='mb-2  d-flex align-items-center' style={{justifyContent: 'space-between'}}>
                  <div className='search-bar mr-2' style={{minWidth:'250px'}}>
                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                  </div>
                  <div className='card widget-stat mb-0'>
                    <Button onClick={() => navigate('/orders/add')}> Add Normal Order</Button>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className='col-sm-12'>
                <div className='brand-list-content my-3'>
                  <div className='brand-list'>
                      <input type="radio" name="brand" className="btn-check" id="btn-new-outlined" value="new" autoComplete="off" checked={status == 'new'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                      <label className="btn btn-outline-primary selected_bg1" htmlFor="btn-new-outlined">New Orders</label>
                  </div>
                  <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-confirmed-outlined" value="confirmed" autoComplete="off" checked={status == 'confirmed'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg2" htmlFor="btn-confirmed-outlined">Confirmed</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-preparing-outlined" value="preparing" autoComplete="off" checked={status == 'preparing'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg3" htmlFor="btn-preparing-outlined">Preparing</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-ready-outlined" value="ready" autoComplete="off" checked={status == 'ready'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg4" htmlFor="btn-ready-outlined">Ready for Pickup</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-completed-outlined" value="completed" autoComplete="off" checked={status == 'completed'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg5" htmlFor="btn-completed-outlined">Order Completed</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-cancelled-outlined" value="cancelled" autoComplete="off" checked={status == 'cancelled'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg6" htmlFor="btn-cancelled-outlined">Cancelled</label>
                    </div>
                </div>
                   
                </div>
            </div>
              {/* <Card.Title>Orders</Card.Title> */}
           
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
                
              </Card.Body>
            </Card>
            </div>
    </div>
  );
}

export default Orders;
