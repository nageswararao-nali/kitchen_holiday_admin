import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getCategories } from '../../store/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  Card, CardBody } from 'react-bootstrap';

export const productsGenerator = quantity => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({ id: i, name: `Item name ${i}`, price: 2100 + i });
  }
  return items;
};

const products = productsGenerator(100);

const columns = [
  {
    dataField: "id",
    text: "Category ID",
  },
  {
    dataField: "name",
    text: "Category Name",
  },
  {
    dataField: "description",
    text: "Description"
  }
];

function Category() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.items)

    const getCategoriesData = async () => {
        await dispatch(getCategories())
    }
    useEffect(() => {
        getCategoriesData()
    }, [])
    
  return (
    <div className='container-fluid'>
       
        <div className='row'>
        <Card>
          <div class="card-header ">
            <div class="card-title my-0 h5">Category</div>
            <div className='d-block d-sm-flex justify-content-between align-items-center flex-wrap' >
          <div className='search-bar mr-2' style={{minWidth:'250px'}}>
              <form className="search-form d-flex align-items-center" method="POST" action="#">
                  <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                  <button type="submit" title="Search"><i className="bi bi-search"></i></button>
              </form>
            </div>
                <div className='card widget-stat mb-0'>
                <Button onClick={() => navigate('/category/add')}> Add Category</Button>
                </div>
            </div>
          </div>
          <CardBody >
          
            {
                (categories && categories.length) ?
                <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={categories}
                    columns={columns}
                    pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true, onPageChange:(page)=>console.log("DB CALL with page" + page) })}
                
                />
                : null
            }     
            </CardBody>           
            </Card>
        </div>
    </div>
  );
}

export default Category;
