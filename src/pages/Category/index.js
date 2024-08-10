import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { getCategories } from '../../store/itemsSlice';
import { useDispatch, useSelector } from 'react-redux';

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
    <div className='container'>
        <div className='row'>
            <div className='col-sm-12'>
                <Button onClick={() => navigate('/category/add')}> Add Category</Button>
            </div>
        </div>
        <br />
        <br />
        <div className='row'>
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
                
            
        </div>
    </div>
  );
}

export default Category;
