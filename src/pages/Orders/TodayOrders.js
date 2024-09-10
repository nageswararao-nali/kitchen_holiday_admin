import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';
import * as moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;
function TodayOrders() {
    const navigate = useNavigate();
    const [status , setStatus] = useState(null)
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedOrder, setSelectedOrder] = useState({})

    const getOrdersData = async () => {
      await dispatch(getOrders({orderDate: moment().format('YYYY-MM-DD')}))
    }
    // useEffect(() => {
    //     if(!orders.length && !status) {
    //       getOrdersData()
    //     }
    // }, [orders])
    useEffect(() => {
      // if(!orders.length && !status) {
        getOrdersData()
      // }
  }, [])

    const updateOrder = async(orderId, statusD) => {
      console.log(orderId, status)
      await dispatch(updateOrderStatus({orderId, status: statusD}))
      filterOrders(status)

    }

    const filterOrders = async (statusValue) => {
      if(statusValue) {
        await dispatch(getOrders({status: statusValue, orderDate: moment().format('YYYY-MM-DD')}))
      } else {
        await dispatch(getOrders({orderDate: moment().format('YYYY-MM-DD')}))
      }
      
    }
    
    const columns = [
      {
        dataField: "id",
        text: "Order ID",
        formatter: (cell, row, rowIndex) => {
            return (
                <span onClick={() => {
                    navigate('/kitchen-orders/details/'+row.id)
                  } }>{row.id}</span>
            )
        }
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
        dataField: "userId",
        text: "Customer ID",
        formatter: (cell, row, rowIndex) => {
            return (
                <span onClick={() => {
                    setSelectedOrder(row)
                    handleShow(row.invoiceFile)
                  } }>{row.userId}</span>
            )
        }
      },
      {
        dataField: "customerName",
        text: "Customer Name",
      },
      {
        dataField: "customerMobile",
        text: "Customer Mobile",
      },
      {
        dataField: "itemName",
        text: "Meal",
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
    <div className='container-fluid'>
        <div className='row mb-3'>
        <Card >
        {/* <Card.Title>Today Orders</Card.Title> */}
       
       
              <Card.Body>
                  {
                      (orders && orders.length) ?
                      <ToolkitProvider
                        keyField="id"
                        data={ orders }
                        columns={ columns }
                        exportCSV
                      >
                        {
                          props => (
                            <div>
                              
                             
                              <div class="card-header  mb-3">
                                <div class="card-title h5">Today Orders</div>
                                <div className=' mb-2  d-flex align-items-center' style={{justifyContent: 'end'}}>
                                <div className='search-bar mr-2' style={{minWidth:'250px'}}>
                                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                                        <input type="text" className="form-control" name="query" placeholder="Search" title="Enter search keyword" />
                                        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                                    </form>
                                </div>
                               
                                <ExportCSVButton { ...props.csvProps } class="btn btn-primary btn-secondry mr-2">Export CSV!!</ExportCSVButton>
                                </div>
                              </div>
                              {/* <div className='d-flex justify-content-around flex-wrap today_menu'>
                                <span>Total Meals : 25</span>
                                <span>Veg Meals : 10</span>
                                <span>Non Veg Meals : 15</span>
                                <span>Extra Items : 20</span>
                                <span>Dal : 2</span>
                              </div>
                              <span className='card-header pt-0'></span> */}
                            <div className='col-sm-12'>
                                <div className='brand-list-content my-3'>
                                    <div className='brand-list'>
                                        <input type="radio" name="brand" className="btn-check" id="btn-new-outlined" value="new" autoComplete="off" checked={status == 'new'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                                        <label className="btn btn-outline-primary" htmlFor="btn-new-outlined">New Orders</label>
                                    </div>
                                    <div className='brand-list'>
                                        <input type="radio" name="brand" className="btn-check" id="btn-confirmed-outlined" value="confirmed" autoComplete="off" checked={status == 'confirmed'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                                        <label className="btn btn-outline-primary" htmlFor="btn-confirmed-outlined">Confirmed</label>
                                    </div>
                                    <div className='brand-list'>
                                        <input type="radio" name="brand" className="btn-check" id="btn-preparing-outlined" value="preparing" autoComplete="off" checked={status == 'preparing'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                                        <label className="btn btn-outline-primary" htmlFor="btn-preparing-outlined">Preparing</label>
                                    </div>
                                    <div className='brand-list'>
                                        <input type="radio" name="brand" className="btn-check" id="btn-ready-outlined" value="ready" autoComplete="off" checked={status == 'ready'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                                        <label className="btn btn-outline-primary" htmlFor="btn-ready-outlined">Ready for Pickup</label>
                                    </div>
                                    <div className='brand-list'>
                                        <input type="radio" name="brand" className="btn-check" id="btn-completed-outlined" value="completed" autoComplete="off" checked={status == 'completed'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                                        <label className="btn btn-outline-primary" htmlFor="btn-completed-outlined">Order Completed</label>
                                    </div>
                                    <div className='brand-list'>
                                        <input type="radio" name="brand" className="btn-check" id="btn-cancelled-outlined" value="cancelled" autoComplete="off" checked={status == 'cancelled'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                                        <label className="btn btn-outline-primary" htmlFor="btn-cancelled-outlined">Cancelled</label>
                                    </div>
                                </div>
                            </div>
                              <BootstrapTable
                                      { ...props.baseProps }
                                    pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true, onPageChange:(page)=>console.log("DB CALL with page" + page) })}
                                    
                                />
                            </div>
                            
                            
                          )
                        }
                      </ToolkitProvider>
                      
                      : null
                  }
                
              </Card.Body>
            </Card>
            <div
            className="modal show"     
            >
            <Modal show={show} onHide={handleClose} className='form_modal'>
                <Modal.Header closeButton>
                <Modal.Title className='modal-title fs-20'>Order Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Invoice
                    <iframe src={selectedOrder.invoice}></iframe>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Download
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
            </div>
    </div>
  );
}

export default TodayOrders;
