import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions } from '../../store/subscriptionsSlice';



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
      }
    ];
  return (
    <div className='container-fluid'>
       
        <div className='row'>
          <Card style={{ padding: '10px' }}>
              {/* <Card.Title>Subscriptions</Card.Title> */}
              <div class="card-header  mb-3">
                <div class="card-title h5">Subscriptions</div>
                <div className=' mb-2' style={{justifyContent: 'end'}}>
                    <div>
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
