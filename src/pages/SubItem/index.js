import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSubItems, deleteSubItem } from '../../store/itemsSlice';
import { Button, Card } from 'react-bootstrap';

function SubItems() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { subItems } = useSelector((state) => state.items)

    const columns = [
        {
          dataField: "id",
          text: "Sub Item ID",
        },
        {
          dataField: "name",
          text: "Sub Item Name",
        },
        {
          dataField: "isVeg",
          text: "Is Veg"
        },
        {
          dataField: "description",
          text: "Description"
        },
        {
          dataField: "quantity",
          text: "Quantity"
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
                  navigate('/sub-items/edit/'+row.id)
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

    const getSubItemsData = async () => {
        await dispatch(getSubItems())
    }
    useEffect(() => {
        getSubItemsData()
    }, [])
    const deleteItemFun = async (id) => {
      await dispatch(deleteSubItem({id}))
      getSubItemsData()
    }
  return (
    <div className='container-fluid'>
        
        <div className='row'>
          <Card>
          <div class="card-header  ">
                <div class="card-title my-0 h5">Sub Items</div>
                <div  className='d-block d-sm-flex justify-content-between align-items-center flex-wrap' >
            <div className='search-bar mr-2' style={{minWidth:'250px'}}>
              <form className="search-form d-flex align-items-center" method="POST" action="#">
                  <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                  <button type="submit" title="Search"><i className="bi bi-search"></i></button>
              </form>
            </div>
                    <div className='card widget-stat mb-0'>
                    <Button onClick={() => navigate('/sub-items/add')}> Add Sub Item</Button>
                    </div>
                </div>
              </div>
            <Card.Body>
            
                {
                    (subItems && subItems.length) ?
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={subItems}
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

export default SubItems;
