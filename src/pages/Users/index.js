import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from '../../store/usersSlice';



function Users() {
  const navigate = useNavigate();
    const [userType , setUserType] = useState('delivery boy')
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)

    const getUsersData = async () => {
      await dispatch(getUsers({user_type: userType}))
    }
    useEffect(() => {
      getUsersData()
    }, [])

    const deleteUserData = async (userId) => {
      console.log("user id ", userId)
      await dispatch(deleteUser({userId: userId}))
      await filterUsers()
    }

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
        isDummyField: true,
        text: "Full Name",
        formatter: (cell, row, rowIndex) => {
          return (
            row.fName + " " +row.lName
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
              <span className='btn btn-primary shadow btn-xs sharp me-1 d-flex justify-content-center m-0 p-0'>
                  <i style={{color: '#fff'}} className="bi bi-trash2-fill" onClick={() => {
                     console.log (row);
                     deleteUserData(row.id)
                     console.log(cell)
                   } } />
              </span>
            </div>
          )
        }
      }
    ];
  return (
    <div className='container-fluid'>
      
        {/* <div className='row mb-3'>
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
        </div> */}
        <div className='row'>
          <Card >
              {/* <Card.Title>Users</Card.Title> */}
              <div class="card-header">
                <div class="card-title h5">Users</div>
                <div className='mb-2  d-flex align-items-center' style={{justifyContent: 'space-between'}}>
                  <div className='search-bar mr-2' style={{minWidth:'250px'}}>
                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                  </div>
                  <div className='card widget-stat mb-0'>
                  <Button onClick={() => navigate('/users/add')}> Add User</Button>
                  </div>
                </div>
              </div>
              <Card.Body className='py-0'>
              
                <div className='col-sm-12'>
                <div className='brand-list-content my-3'>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-confirmed-outlined" value="delivery boy" autoComplete="off" checked={userType == 'delivery boy'} onChange={(e) => {setUserType(e.target.value); filterUsers(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg2" htmlFor="btn-confirmed-outlined">Delivery Boys</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-preparing-outlined" value="admin" autoComplete="off" checked={userType == 'admin'} onChange={(e) => {setUserType(e.target.value); filterUsers(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg3" htmlFor="btn-preparing-outlined">Admins</label>
                    </div>
                    <div className='brand-list'>
                        <input type="radio" name="brand" className="btn-check" id="btn-ready-outlined" value="kitchen" autoComplete="off" checked={userType == 'kitchen'} onChange={(e) => {setUserType(e.target.value); filterUsers(e.target.value)}} />
                        <label className="btn btn-outline-primary selected_bg4" htmlFor="btn-ready-outlined">Kitchen</label>
                    </div>
              </div>
              </div>
            
                  {
                      (users && users.length) ?
                      <div className='table-responsive'>
                      <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={users}
                          columns={columns}
                          pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true, onPageChange:(page)=>console.log("DB CALL with page" + page) })}
                      
                      />
                      </div>
                      : null
                  }
                
              </Card.Body>
            </Card>
        </div>
    </div>
  );
}

export default Users;
