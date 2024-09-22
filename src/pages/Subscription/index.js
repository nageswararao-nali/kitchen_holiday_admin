import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, deleteSubscription } from '../../store/subscriptionsSlice';



function Subscriptions() {
  const navigate = useNavigate();
    const [userType , setUserType] = useState(null)
    const dispatch = useDispatch()
    const { subscriptions } = useSelector((state) => state.subscriptions)

    const getSubscriptionsData = async () => {
      await dispatch(getSubscriptions({}))
    }
    useEffect(() => {
        if(!subscriptions.length) {
          getSubscriptionsData()
        }
    }, [subscriptions])

    const deleteItemFun = async (id) => {
      await dispatch(deleteSubscription({id}))
      getSubscriptionsData()
    }
    const columns = [
      {
        dataField: "id",
        text: "Subscription ID",
      },
      {
        dataField: "name",
        text: "Name",
      },
      {
        dataField: "description",
        text: "Description",
      },
      {
        dataField: "days",
        text: "No. of Days"
      },
      {
        dataField: "price",
        text: "Price"
      },
      {
        isDummyField: true,
        text: 'Actions',
        formatter: (cell, row, rowIndex) => {
          return (
            <div key={row.id} className='d-flex justify-content-center'>
              <span className='btn btn-secondry shadow btn-xs sharp me-1 d-flex justify-content-center m-0 p-0'>
              <i style={{color: '#fff'}} className="bi bi-pencil-fill"
              onClick={() => {
                  navigate('/subscriptions/edit/'+row.id)
                } } />
              </span>
              <span className='btn btn-primary shadow btn-xs sharp me-1 d-flex justify-content-center m-0 p-0'>
                <i style={{color: '#fff'}} className="bi bi-trash2-fill" onClick={() => {
                   console.log (row);
                   console.log(cell)
                   deleteItemFun(row.id)
                 } } />
                 </span>
            </div>
          )
        }
      }
    ];
  return (
    <div className='container-fluid'>
       
        <div className='row'>
          <Card >
              {/* <Card.Title>Subscriptions</Card.Title> */}
              <div class="card-header">
                <div class="card-title my-0 h5">Subscriptions</div>
                <div  className=' d-block d-sm-flex justify-content-between align-items-center flex-wrap' >
              <div className='search-bar mr-2' style={{minWidth:'250px'}}>
              <form className="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
            </div>
                    <div className='card widget-stat mb-0'>
                    <Button onClick={() => navigate('/subscriptions/add')}> Add Subscription</Button>

                    </div>
                </div>
              </div>
              <Card.Body>
             
                  {
                      (subscriptions && subscriptions.length) ?
                      <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={subscriptions}
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

export default Subscriptions;
