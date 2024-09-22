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
          <Card>
          <div class="card-header ">
                <div class="card-title my-0 h5">Items</div>
                <div className='d-block d-sm-flex justify-content-between align-items-center flex-wrap' >
            <div className='search-bar mr-2' style={{minWidth:'250px'}}>
              <form className="search-form d-flex align-items-center" method="POST" action="#">
                  <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                  <button type="submit" title="Search"><i className="bi bi-search"></i></button>
              </form>
            </div>
                    <div className='card widget-stat mb-0'>
                    <Button onClick={() => navigate('/items/add')}> Add Item</Button>
                    </div>
                </div>
              </div>
            <Card.Body>
           
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
