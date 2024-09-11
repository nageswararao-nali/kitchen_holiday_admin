import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItems, deleteItem } from '../../store/itemsSlice';
import { Button, Card } from 'react-bootstrap';

function Items() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { items } = useSelector((state) => state.items)

    const columns = [
        {
          dataField: "id",
          text: "Item ID",
        },
        {
          dataField: "name",
          text: "Item Name",
        },
        {
          dataField: "price",
          text: "Price"
        },
        {
          dataField: "description",
          text: "Description"
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
                   <span className='btn btn-secondry shadow btn-xs sharp me-1 d-flex justify-content-center m-0 p-0'>
                  <i style={{color: '#fff'}} className="bi bi-pencil-fill"
                  onClick={() => {
                      navigate('/items/edit/'+row.id)
                    } } />
                    </span>
              </div>
            )
          }
        }
      
      ];

    const getItemsData = async () => {
        await dispatch(getItems())
    }
    useEffect(() => {
        getItemsData()
    }, [])
    
    const deleteItemFun = async (id) => {
      await dispatch(deleteItem({id}))
      getItemsData()
    }
  return (
    <div className='container-fluid'>
       
        <div className='row'>
          <Card className='card_new'>
          <div class="card-header ">
                <div class="card-title h5">Items</div>
               
              </div>
            <Card.Body>
            <div className='mb-4 d-flex justify-content-between align-items-center flex-wrap' >
            <div class="customer-search sm-mb-0 mb-3">
              <div class="input-group search-area">
                <input type="text" class="form-control" placeholder="Search Name / Mobile / Email"/>
                <span class="input-group-text"><a href="/react/demo/order-list"><i class="bi bi-search"></i></a>
                </span>
              </div>
            </div>
                    <div className='card widget-stat mb-0'>
                    <Button onClick={() => navigate('/items/add')}> Add Item</Button>
                    </div>
                </div>
                {
                    (items && items.length) ?
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={items}
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

export default Items;
