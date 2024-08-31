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
          <Card style={{ padding: '10px' }}>
          <div class="card-header  mb-3">
                <div class="card-title h5">Sub Items</div>
                <div className=' mb-2' style={{justifyContent: 'end'}}>
                    <div>
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
