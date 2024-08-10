import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../../store/itemsSlice';
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
              <div key={row.id} style={{display: "flex", justifyContent: 'space-evenly'}}>
                  <i style={{color: 'red'}} className="bi bi-trash-fill" onClick={() => {
                     console.log (row);
                     console.log(cell)
                   } } />
                  <i style={{color: 'green'}} className="bi bi-pencil-fill"
                  onClick={() => {
                      navigate('/items/edit/'+row.id)
                    } } />
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
    
  return (
    <div className='container'>
        <div className='row mb-2' style={{justifyContent: 'end'}}>
            <div className='col-sm-2'>
                <Button onClick={() => navigate('/items/add')}> Add Item</Button>
            </div>
        </div>
        <div className='row'>
          <Card style={{ padding: '10px' }}>
            <Card.Title>Items</Card.Title>
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
