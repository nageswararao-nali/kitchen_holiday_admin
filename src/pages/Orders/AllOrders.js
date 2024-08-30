import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import * as moment from 'moment';
import Modal from 'react-bootstrap/Modal';
const { ExportCSVButton } = CSVExport;

function AllOrders() {
  const navigate = useNavigate();
    const [status , setStatus] = useState(null)
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                  console.log(row)
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
        <div className='row'>
        <Card style={{ padding: '10px' }}>
        <div class="card-header  mb-3">
                <div class="card-title h5">All Orders</div>
                <div className=' mb-2' style={{justifyContent: 'end'}}>
                    <div>
                    <Button onClick={() => navigate('/orders/add')}> Add Normal Order</Button>

                    </div>
                </div>
              </div>
        <div className='row mb-3'>
            <div className='col-sm-12'>
            <div class="card-action coin-tabs mt-3 mt-sm-0">
                <ul class="nav nav-tabs nav" role="tablist">
                  <li class="nav-item nav-item">
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-new-outlined" value="new" autoComplete="off" checked={status == 'new'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg1" htmlFor="btn-new-outlined">New Orders</label>
                    </div>
                    </li>
                    <li class="nav-item nav-item">
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-confirmed-outlined" value="confirmed" autoComplete="off" checked={status == 'confirmed'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg2" htmlFor="btn-confirmed-outlined">Confirmed</label>
                    </div>
                    </li>
                    <li class="nav-item nav-item">
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-preparing-outlined" value="preparing" autoComplete="off" checked={status == 'preparing'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg3" htmlFor="btn-preparing-outlined">Preparing</label>
                    </div>
                    </li>
                    <li class="nav-item nav-item">
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-ready-outlined" value="ready" autoComplete="off" checked={status == 'ready'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg4" htmlFor="btn-ready-outlined">Ready for Pickup</label>
                    </div>
                    </li>
                    <li class="nav-item nav-item">
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-completed-outlined" value="completed" autoComplete="off" checked={status == 'completed'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg5" htmlFor="btn-completed-outlined">Order Completed</label>
                    </div>
                    </li>
                    <li class="nav-item nav-item">
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-cancelled-outlined" value="cancelled" autoComplete="off" checked={status == 'cancelled'} onChange={(e) => {setStatus(e.target.value); filterOrders(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg6" htmlFor="btn-cancelled-outlined">Cancelled</label>
                    </div>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
       
              {/* <Card.Title>Orders</Card.Title> */}
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
                              <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                              <hr />
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
                    {/* <iframe src={selectedOrder.invoice}></iframe> */}
                    <object id="fgh" data={selectedOrder.invoice}  width="400" height="400"></object>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                    Download
                </Button> */}
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    </div>
  );
}

export default AllOrders;
