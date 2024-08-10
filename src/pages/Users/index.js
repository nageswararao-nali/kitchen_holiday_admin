import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/usersSlice';



function Users() {
  const navigate = useNavigate();
    const [userType , setUserType] = useState(null)
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)

    const getUsersData = async () => {
      await dispatch(getUsers({}))
    }
    useEffect(() => {
        if(!users.length && !userType) {
          getUsersData()
        }
    }, [users])

    const filterUsers = async (userTypeValue) => {
      if(userTypeValue) {
        await dispatch(getUsers({user_type: userTypeValue}))
      } else {
        await dispatch(getUsers({}))
      }
      
    }
    const columns = [
      {
        dataField: "id",
        text: "User ID",
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
        dataField: "username",
        text: "Username",
      },
      {
        dataField: "mobile",
        text: "Mobile",
      },
      {
        dataField: "email",
        text: "Email"
      },
      {
        dataField: "user_type",
        text: "User Type"
      },
      {
        isDummyField: true,
        text: 'Actions',
        formatter: (cell, row, rowIndex) => {
          return (
            <div key={row.id} style={{display: "flex", justifyContent: 'space-evenly'}}>
            </div>
          )
        }
      }
    ];
  return (
    <div className='container'>
        <div className='row mb-2' style={{justifyContent: 'end'}}>
            <div className='col-sm-2'>
                <Button onClick={() => navigate('/users/add')}> Add User</Button>
            </div>
        </div>
        <div className='row mb-3'>
            <div className='col-sm-12'>
                <div className='brand-list-content'>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-new-outlined" value="customer" autoComplete="off" checked={userType == 'customer'} onChange={(e) => {setUserType(e.target.value); filterUsers(e.target.value)}} />
                        <label className="btn btn-outline-primary" htmlFor="btn-new-outlined">Customers</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-confirmed-outlined" value="delivery boy" autoComplete="off" checked={userType == 'delivery boy'} onChange={(e) => {setUserType(e.target.value); filterUsers(e.target.value)}} />
                        <label className="btn btn-outline-primary" htmlFor="btn-confirmed-outlined">Delivery Boys</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-preparing-outlined" value="admin" autoComplete="off" checked={userType == 'admin'} onChange={(e) => {setUserType(e.target.value); filterUsers(e.target.value)}} />
                        <label className="btn btn-outline-primary" htmlFor="btn-preparing-outlined">Admins</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-ready-outlined" value="kitchen" autoComplete="off" checked={userType == 'kitchen'} onChange={(e) => {setUserType(e.target.value); filterUsers(e.target.value)}} />
                        <label className="btn btn-outline-primary" htmlFor="btn-ready-outlined">Kitchen</label>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
          <Card style={{ padding: '10px' }}>
              <Card.Title>Orders</Card.Title>
              <Card.Body>
                  {
                      (users && users.length) ?
                      <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={users}
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

export default Users;
