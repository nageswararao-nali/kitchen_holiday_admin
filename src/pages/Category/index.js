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
        <Card className='card_new'>
          <div class="card-header ">
            <div class="card-title h5">Category</div>
            
          </div>
          <CardBody>
          <div className='mb-4 d-flex justify-content-between align-items-center flex-wrap' >
            <div class="customer-search sm-mb-0 mb-3">
              <div class="input-group search-area">
                <input type="text" class="form-control" placeholder="Search Name / Mobile / Email"/>
                <span class="input-group-text"><a href="/react/demo/order-list"><i class="bi bi-search"></i></a>
                </span>
              </div>
            </div>
                <div className='card widget-stat mb-0'>
                <Button onClick={() => navigate('/category/add')}> Add Category</Button>
                </div>
            </div>
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
