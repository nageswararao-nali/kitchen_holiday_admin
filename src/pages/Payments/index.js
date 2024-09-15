import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPayments } from '../../store/paymentSlice';
import { Button, Card } from 'react-bootstrap';

function Payments() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { payments } = useSelector((state) => state.payments)

    const columns = [
        {
          dataField: "id",
          text: "Payment ID",
        },
        {
          dataField: "customerName",
          text: "Customer Name",
        },
        {
          dataField: "amount",
          text: "Amount"
        },
        {
          dataField: "paymentDate",
          text: "Payment Date"
        },
        {
          dataField: "orderId",
          text: "Order Ids"
        }
      
      ];

    const getSubItemsData = async () => {
        await dispatch(getPayments({}))
    }
    useEffect(() => {
        getSubItemsData()
    }, [])
   
  return (
    <div className='container-fluid'>
        
        <div className='row'>
          <Card className='card_new'>
          <div class="card-header  ">
                <div class="card-title h5">Payments</div>
                
              </div>
            <Card.Body>
            <div  className='mb-4 d-flex justify-content-between align-items-center flex-wrap' >
            <div class="customer-search sm-mb-0 mb-3">
              <div class="input-group search-area">
                <input type="text" class="form-control" placeholder="Search Name / Mobile / Email"/>
                <span class="input-group-text"><a href="/react/demo/order-list"><i class="bi bi-search"></i></a>
                </span>
              </div>
            </div>
                </div>
                {
                    (payments && payments.length) ?
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={payments}
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

export default Payments;
