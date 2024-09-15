import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPayments, getRefunds, updateRefund } from '../../store/paymentSlice';
import { Button, Card } from 'react-bootstrap';

function Refunds() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { refunds } = useSelector((state) => state.payments)

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
          dataField: "refundRaisedDate",
          text: "Raised Date"
        },
        {
            dataField: "refundIssuedDate",
            text: "Issued Date"
        },
        {
          dataField: "orderIds",
          text: "Order Ids"
        },
        {
            isDummyField: true,
            text: 'Actions',
            formatter: (cell, row, rowIndex) => {
              return (
                <div key={row.id} className='d-flex justify-content-center'>
                    {
                        !row.approved ? 
                        <span className='btn btn-secondry shadow btn-xs sharp me-1 d-flex justify-content-center m-0 p-0'>
                            <i style={{color: '#fff'}} className="bi bi-check" onClick={() => {
                                console.log (row);
                                console.log(cell)
                                updateRefundFun(row.id)
                            } } />
                        </span>
                        : null
                    }
                
              </div>
              )
            }
          }
      
      ];

    const getSubItemsData = async () => {
        await dispatch(getRefunds({}))
    }
    useEffect(() => {
        getSubItemsData()
    }, [])
   const updateRefundFun = async (id) => {
    await dispatch(updateRefund({id: id}))
    getSubItemsData()
   }
  return (
    <div className='container-fluid'>
        
        <div className='row'>
          <Card className='card_new'>
          <div class="card-header  ">
                <div class="card-title h5">Refunds</div>
                
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
                    (refunds && refunds.length) ?
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={refunds}
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

export default Refunds;
