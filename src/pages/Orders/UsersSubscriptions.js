import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateMySubscription, deleteMySubscription, userSubscriptions } from '../../store/subscriptionsSlice';
import CalendarComponent from './calendarcomponent';


function UsersSubscriptions() {
  const navigate = useNavigate();
    const [userType , setUserType] = useState(null)
    const [show, setShow] = useState(false);
  const [selectedSub, setSelectedSub] = useState({});
  const [rDates, setrDates] = useState([]);
  const [mySubLastDate, setMySubLastDate] = useState();

    const dispatch = useDispatch()
    const { usersSubscriptions } = useSelector((state) => state.subscriptions)

    const getSubscriptionsData = async () => {
      await dispatch(userSubscriptions({}))
    }
    useEffect(() => {
        getSubscriptionsData()
    }, [])

    const updateMySubscriptions = async (mySubId) => {
        console.log(mySubId)
        setShow(false)
        if(rDates.length) {
          await dispatch(updateMySubscription({subId: mySubId, dates:rDates, mySubLastDate}))
          await getSubscriptionsData()
        }
    }
    const deleteMySubscriptions = async (mySubId) => {
        console.log(mySubId)
        if (window.confirm('Are you sure you want to delete Subscription?')) {
          setShow(false)
          await dispatch(deleteMySubscription({subId: mySubId}))
          await getSubscriptionsData()
        }
        
    }
    const removedDates = async (dtData) => {
        console.log(dtData.dt)
        let rrDates = rDates
        rrDates.push(dtData.dt) 
        setrDates(rrDates)
        setMySubLastDate(dtData.lastDate)
    }
    const showSub = async (sub) => {
        setSelectedSub(sub)
        setShow(true)
    }

    const columns = [
      {
        dataField: "subName",
        text: "Subscription Name",
      },
      {
        dataField: "itemName",
        text: "Item Name",
      },
      {
        dataField: "quantity",
        text: "Quantity",
      },
      {
        dataField: "startDate",
        text: "Start Date",
      },
      {
        dataField: "endDate",
        text: "End Date"
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
                     showSub(row)
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
              <div class="card-header ">
                <div class="card-title h5">User Subscriptions</div>
                <div style={{justifyContent: 'space-between'}}>
                    {/* <div>
                    <Button onClick={() => navigate('/subscriptions/add')}> User Subscriptions</Button>

                    </div> */}
                  <div className='search-bar mr-2' style={{minWidth:'250px'}}>
                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                  </div>
                </div>
                </div>
                <Card.Body>

                
                  {
                      (usersSubscriptions && usersSubscriptions.length) ?
                      <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={usersSubscriptions}
                          columns={columns}
                          pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true, onPageChange:(page)=>console.log("DB CALL with page" + page) })}
                      
                      />
                      : null
                  }
                
              </Card.Body>
            </Card>
        </div>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>{selectedSub.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
            <CalendarComponent selectedDates={selectedSub.orderDates ? JSON.parse(selectedSub.orderDates) : []} removedDated={removedDates} />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" className="btn2 btn6 txt3 text-white" onClick={() => updateMySubscriptions(selectedSub.id)}>
                Swap Orders
            </Button>
            <Button variant="primary" className="btn2 txt3 text-white" onClick={() => deleteMySubscriptions(selectedSub.id)}>
                Delete Subscription
            </Button>
                
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default UsersSubscriptions;
