import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';
import * as moment from 'moment';


function KitchenOrders() {
  const navigate = useNavigate();
    const [status , setStatus] = useState(null)
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)

    const { user } = useSelector((state) => state.auth)

    const getOrdersData = async () => {
      await dispatch(getOrders({orderDate: moment().format('YYYY-MM-DD')}))
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
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'confirmed')}}> 
                        Confirm
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'preparing')}}> 
                        Preparing 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'ready')}}> 
                        Ready to Pickup 
                      </Dropdown.Item> 
                    </Dropdown.Menu> 
                  </Dropdown>
									<i style={{color: 'green'}} className="bi bi-eye-fill"
                onClick={() => {
                    navigate('/kitchen-orders/details/'+row.id)
                  } } />
            </div>
          )
        }
      }
    ];
  return (
   <div class="container-fluid">
    <div class="row mb-3">
    <Card >
      <div className="card-header">
            <div className="card-title my-0 h5">Kitchen Orders</div>
            <div class="d-flex justify-content-between align-items-center flex-wrap">
          <div className='search-bar mr-2' style={{minWidth:'250px'}}>
            <form className="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
          </div>
        <div>        
      </div>
    </div>
        </div>         
        <Card.Body>
                 
        
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
      
    </Card.Body>
    </Card>
    </div>
  </div>
  );
}

export default KitchenOrders;
