import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, getUsersSearch } from '../../store/usersSlice';



function Customers() {
  const navigate = useNavigate();
    const [userType , setUserType] = useState('customer')
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)
    const [searchUserValue, setSearchUserValue] = useState('')

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
    const searchUser = async () => {
      if(searchUserValue) {
        let reqObj = {
          user_type: userType,
          search: searchUserValue
        }
        await dispatch(getUsersSearch(reqObj))
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
              <span className='btn btn-secondry shadow btn-xs sharp me-1 d-flex justify-content-center m-0 p-0'>
                  <i style={{color: '#fff'}} className="bi bi-pencil-fill"
                  onClick={() => {
                      navigate('/customers/edit/'+row.id)
                    } } />
              </span>
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
          <Card className='card_new'>
              {/* <Card.Title>Users</Card.Title> */}
              <div className="card-header">
                <div className="card-title h5">Customers</div>
                
              </div>
             
              <Card.Body>
              <div className=' mb-3 d-sm-flex d-block align-items-center justify-content-between'>
                    <div className='search-bar mr-2'>
                        <form className="search-form d-flex align-items-center">
                            <input type="text" className="form-control" name="query" value={searchUserValue} onChange={(e) => setSearchUserValue(e.target.value)} placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                            <button type="submit" title="Search"  onClick={() => searchUser()} ><i className="bi bi-search"></i></button>
                        </form>
                    </div>
                    <div className='card widget-stat mb-0 mr-2'>
                        <Button > Send notification</Button>
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

export default Customers;
