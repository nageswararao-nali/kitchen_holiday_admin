import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';



function orderDetails() {
  const navigate = useNavigate();
    const [status , setStatus] = useState(null)
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.orders)

    const getOrdersData = async () => {
      await dispatch(getOrders({}))
    }
    useEffect(() => {
        if(!orders.length && !status) {
          getOrdersData()
        }
    }, [orders])

    const updateOrder = async(orderId, statusD) => {
      console.log(orderId, status)
      await dispatch(updateOrderStatus({orderId, status: statusD}))
      filterOrders(status)

    }

    const filterOrders = async (statusValue) => {
      if(statusValue) {
        await dispatch(getOrders({status: statusValue}))
      } else {
        await dispatch(getOrders({}))
      }
      
    }
    const columns = [
      {
        dataField: "id",
        text: "Order ID",
      },
      {
        dataField: "orderDateTime",
        text: "Order Date",
        formatter: (cell, row, rowIndex) => {
          return (
            row.orderDateTime
          )
        }
      },
      {
        dataField: "customerName",
        text: "Customer Name",
      },
      {
        dataField: "address",
        text: "Address",
      },
      {
        dataField: "totalAmount",
        text: "Amount"
      },
      {
        dataField: "status",
        text: "Status"
      },
      {
        isDummyField: true,
        text: 'Actions',
        formatter: (cell, row, rowIndex) => {
          return (
            <div key={row.id} style={{display: "flex", justifyContent: 'space-evenly'}}>
                {/* <i style={{color: 'green'}} className="bi bi-pencil-fill"
                onClick={() => {
                    navigate('/items/edit/'+row.id)
                  } } /> */}
                  
                  <Dropdown drop={"start"}> 
                    <Dropdown.Toggle variant="success"> 
                    <i style={{color: 'green'}} className="bi bi-pencil-fill" />
                    </Dropdown.Toggle> 
                    <Dropdown.Menu> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'confirmed')}}> 
                        Confirm
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'preparing')}}> 
                        Preparing 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'ready')}}> 
                        Ready to Pickup 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'completed')}}> 
                        Completed 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(row.id, 'cancelled')}}> 
                        Cancelled
                      </Dropdown.Item> 
                    </Dropdown.Menu> 
                  </Dropdown>
														
            </div>
          )
        }
      }
    ];
  return (
    <div class="container-fluid">
    <div class="mb-sm-4 d-flex flex-wrap align-items-center text-head">
        <h2 class="mb-3 me-auto">Order ID #001234124</h2>
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item active"><a href="/react/demo/order-details">Order</a></li>
                <li class="breadcrumb-item"><a href="/react/demo/order-details">Order Details</a></li>
            </ol>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-body">
                    <div class="steps">
                        <ul class="orders">
                            <li class="active">
                                <a href="/react/demo/order-details">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M32.764 37.0455C33.0967 37.0339 33.409 37.1955 33.5079 37.5633C33.9617 39.2583 35.9523 39.7855 37.6573 38.6972L37.324 38.1189C37.104 37.7044 37.4195 37.0044 38.0301 37.1261L40.4956 37.6211C41.2823 37.7772 41.5951 38.3439 41.3462 39.0883L40.5417 41.4755C40.4401 41.7728 40.1801 41.9616 39.9079 41.965C39.6967 41.965 39.4823 41.8522 39.3323 41.5939L38.9295 40.8972C38.2384 41.3628 37.4945 41.6494 36.754 41.75C34.4217 42.0689 32.4601 40.795 31.8234 38.4133C31.6006 37.5705 32.2106 37.065 32.764 37.0455ZM33.2962 31.235C33.5079 31.235 33.7245 31.3444 33.8723 31.605L34.2773 32.3016C34.969 31.8361 35.7129 31.5478 36.4506 31.4489C38.7823 31.1311 40.7445 32.4039 41.384 34.7855C41.7401 36.1333 39.9629 36.6194 39.7001 35.635C39.2462 33.94 37.2523 33.4128 35.5479 34.5011L35.8834 35.0794C36.1034 35.4939 35.7851 36.1939 35.1751 36.07L32.7095 35.5772C31.9251 35.4178 31.6101 34.8533 31.859 34.1111L32.6629 31.7228C32.764 31.4255 33.024 31.2372 33.2962 31.235ZM36.6034 28.2194C31.974 28.2194 28.224 31.9694 28.2212 36.5994C28.224 41.2261 31.974 44.9783 36.6034 44.9783C41.2301 44.9783 44.9834 41.2261 44.9834 36.5994C44.9834 31.9694 41.2301 28.2194 36.6034 28.2194Z"
                                            fill="white"
                                        ></path>
                                        <path
                                            d="M17.9202 19.4605H27.0263C27.8424 19.4605 28.5019 20.1177 28.5019 20.9339V21.7266C28.5019 22.5422 27.8419 23.1989 27.0263 23.1989H17.9202C17.1013 23.1989 16.4446 22.5422 16.4446 21.7266V20.9339C16.4446 20.1177 17.1013 19.4605 17.9202 19.4605ZM6.79686 15.5139C5.81297 15.5139 5.02075 16.365 5.02075 17.4233V42.0472C5.02075 43.1061 5.81353 43.9572 6.79686 43.9572H28.513C26.7452 42.0128 25.6541 39.4344 25.6541 36.5994C25.6541 30.5544 30.5558 25.6533 36.603 25.6533C37.5958 25.6533 38.5508 25.7977 39.4646 26.0439V17.4233C39.4646 16.365 38.6719 15.5139 37.688 15.5139H6.79686Z"
                                            fill="white"
                                        ></path>
                                        <path
                                            d="M23.9647 5.92219L25.0531 13.315H37.6453C38.3486 13.315 38.7914 12.5283 38.4414 11.8944L35.2297 7.34052C34.7436 6.4633 33.8381 5.92274 32.8597 5.92274H23.9647V5.92219ZM11.627 5.92219C10.6486 5.92219 9.74306 6.46274 9.25695 7.33996L6.04528 11.8938C5.69473 12.5277 6.13751 13.3144 6.84084 13.3144H19.4336L20.5219 5.92163H11.627V5.92219Z"
                                            fill="white"
                                        ></path>
                                    </svg>
                                </a>
                                <h4>Order Created</h4>
                                <span>Thu, 21 Jul 2020, 11:49 AM</span>
                            </li>
                            <li class="active">
                                <a href="/react/demo/order-details">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M31.25 4.6875H18.75C17.0241 4.6875 15.625 6.08661 15.625 7.8125V10.9375C15.625 12.6634 17.0241 14.0625 18.75 14.0625H31.25C32.9759 14.0625 34.375 12.6634 34.375 10.9375V7.8125C34.375 6.08661 32.9759 4.6875 31.25 4.6875Z"
                                            fill="#FD683E"
                                        ></path>
                                        <path
                                            d="M33.8218 18.75H16.1783C14.2616 18.75 12.5379 19.917 11.8261 21.6966L6.36183 35.3572C5.9513 36.3836 6.70717 37.5 7.81258 37.5H42.1876C43.293 37.5 44.0488 36.3836 43.6383 35.3572L38.1741 21.6966C37.4622 19.917 35.7387 18.75 33.8218 18.75Z"
                                            fill="#FD683E"
                                        ></path>
                                        <path
                                            d="M15.625 25C15.625 25.863 16.3245 26.5625 17.1875 26.5625H26.5625C27.4255 26.5625 28.125 25.863 28.125 25C28.125 24.137 27.4255 23.4375 26.5625 23.4375H17.1875C16.3245 23.4375 15.625 24.137 15.625 25Z"
                                            fill="white"
                                        ></path>
                                        <path
                                            d="M31.25 26.5625C30.387 26.5625 29.6875 25.863 29.6875 25C29.6875 24.137 30.387 23.4375 31.25 23.4375H32.8125C33.6755 23.4375 34.375 24.137 34.375 25C34.375 25.863 33.6755 26.5625 32.8125 26.5625H31.25Z"
                                            fill="white"
                                        ></path>
                                        <path
                                            d="M20.3125 40.625C20.3125 41.488 21.012 42.1875 21.875 42.1875H28.125C28.988 42.1875 29.6875 41.488 29.6875 40.625C29.6875 39.762 28.988 39.0625 28.125 39.0625H21.875C21.012 39.0625 20.3125 39.762 20.3125 40.625Z"
                                            fill="white"
                                        ></path>
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M31.2501 4.6875H18.7501C17.0241 4.6875 15.6251 6.08661 15.6251 7.8125V10.9375C15.6251 12.6634 17.0241 14.0625 18.7501 14.0625H23.4376V18.75H16.1783C14.2616 18.75 12.5379 19.917 11.8261 21.6966L6.3752 35.3238C6.34583 35.3925 6.32123 35.4638 6.30184 35.537C6.25947 35.6948 6.24317 35.853 6.25006 36.0073V42.1875C6.25006 44.7764 8.34873 46.875 10.9376 46.875H39.0626C41.6515 46.875 43.7501 44.7764 43.7501 42.1875V36.008C43.7571 35.8512 43.7402 35.6906 43.6965 35.5305C43.6776 35.4598 43.6537 35.3913 43.6254 35.3248L38.1741 21.6966C37.4622 19.917 35.7387 18.75 33.8218 18.75H26.5626V14.0625H31.2501C32.976 14.0625 34.3751 12.6634 34.3751 10.9375V7.8125C34.3751 6.08661 32.976 4.6875 31.2501 4.6875ZM18.7501 10.9375V7.8125H31.2501V10.9375H18.7501ZM39.8797 34.375H10.1204L14.7276 22.8572C14.9648 22.2641 15.5394 21.875 16.1783 21.875H33.8218C34.4607 21.875 35.0354 22.2641 35.2726 22.8572L39.8797 34.375ZM9.37506 42.1875V37.5H40.6251V42.1875C40.6251 43.0505 39.9255 43.75 39.0626 43.75H10.9376C10.0746 43.75 9.37506 43.0505 9.37506 42.1875Z"
                                            fill="white"
                                        ></path>
                                    </svg>
                                </a>
                                <h4>Payment Success</h4>
                                <span>Fri, 22 Jul 2020, 10:44 AM</span>
                            </li>
                            <li class="process">
                                <a href="/react/demo/order-details">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M35.2718 22.9973H38.7934C39.2218 23.0006 39.2595 23.0084 39.3662 23.4106L40.3468 27.3084C40.5379 28.1328 40.5701 28.1645 39.7512 28.1645H35.3707C34.8007 28.1645 34.6584 28.1828 34.6584 27.3867V23.6662C34.6584 23.0317 34.7862 22.9973 35.2718 22.9973ZM21.4351 14.1917C21.4501 14.4317 21.4701 14.6723 21.4701 14.9156C21.4701 20.6795 16.7973 25.3517 11.0329 25.3517C9.88677 25.3517 8.78788 25.1584 7.75732 24.8167V37.6012C7.75732 38.8706 8.62843 39.895 9.71343 39.895H13.1045L13.0984 39.7562C13.0984 36.5423 15.7029 33.9378 18.9179 33.9378C22.1301 33.9378 24.7368 36.5423 24.7368 39.7562C24.734 39.8028 24.7307 39.8495 24.7284 39.895H29.9945L29.989 39.7562C29.989 36.5423 32.5934 33.9378 35.8084 33.9378C39.0201 33.9378 41.624 36.5423 41.624 39.7562C41.624 39.8028 41.6212 39.8495 41.6179 39.895H45.2701C46.2107 39.895 46.9657 39.0073 46.9657 37.9073V34.6323C46.9657 32.9362 46.4218 31.7245 45.5418 30.7367L43.2795 28.2017L41.8907 22.2589C41.6012 20.7889 40.8951 20.2767 39.324 20.2767H33.3218V15.9973C33.3218 14.7278 32.4473 14.1917 31.3634 14.1917H21.4351Z"
                                            fill="#FD683E"
                                        ></path>
                                        <path
                                            d="M18.9176 41.4228C19.8376 41.4228 20.5843 40.6761 20.5843 39.7561C20.5843 38.8361 19.8376 38.0895 18.9176 38.0895C17.9976 38.0895 17.2509 38.8361 17.2509 39.7561C17.2509 40.6761 17.9981 41.4228 18.9176 41.4228ZM18.9176 44.2006C16.4637 44.2006 14.4731 42.2106 14.4731 39.7561C14.4731 37.3028 16.4637 35.3117 18.9176 35.3117C20.0959 35.3117 21.2265 35.7806 22.0598 36.6139C22.8931 37.4473 23.362 38.5789 23.362 39.7561C23.362 42.2106 21.3709 44.2006 18.9176 44.2006Z"
                                            fill="#FD683E"
                                        ></path>
                                        <path
                                            d="M35.8077 38.0895C36.7277 38.0895 37.4744 38.8361 37.4744 39.7561C37.4744 40.6761 36.7277 41.4228 35.8077 41.4228C34.8866 41.4228 34.1411 40.6761 34.1411 39.7561C34.1411 38.8361 34.8866 38.0895 35.8077 38.0895ZM35.8077 35.3117C33.3538 35.3117 31.3655 37.3028 31.3633 39.7561C31.3633 40.9345 31.8311 42.065 32.6644 42.8984C33.4977 43.7317 34.63 44.2006 35.8077 44.2006C36.9877 44.2006 38.1166 43.7317 38.9499 42.8984C39.7866 42.065 40.2522 40.9345 40.2522 39.7561C40.2522 37.3028 38.2644 35.3117 35.8077 35.3117Z"
                                            fill="#FD683E"
                                        ></path>
                                        <path
                                            d="M7.54278 15.8261C7.87555 15.8144 8.18778 15.9761 8.28667 16.3439C8.74056 18.0389 10.7311 18.5661 12.4361 17.4778L12.1028 16.8994C11.8828 16.485 12.1983 15.785 12.8089 15.9067L15.2744 16.4017C16.0611 16.5578 16.3739 17.1244 16.125 17.8689L15.3206 20.2561C15.2189 20.5533 14.9589 20.7422 14.6867 20.7456C14.4756 20.7456 14.2611 20.6328 14.1111 20.3744L13.7083 19.6778C13.0172 20.1433 12.2733 20.43 11.5328 20.5306C9.20055 20.8494 7.23889 19.5756 6.60222 17.1939C6.37945 16.3511 6.98944 15.8456 7.54278 15.8261ZM8.075 10.0156C8.28667 10.0156 8.50333 10.125 8.65111 10.3856L9.05611 11.0822C9.74778 10.6167 10.4917 10.3283 11.2294 10.2294C13.5611 9.91167 15.5233 11.1844 16.1628 13.5661C16.5189 14.9139 14.7417 15.4 14.4789 14.4156C14.025 12.7206 12.0311 12.1933 10.3267 13.2817L10.6622 13.86C10.8822 14.2744 10.5639 14.9744 9.95389 14.8506L7.48833 14.3578C6.70389 14.1983 6.38889 13.6339 6.63778 12.8917L7.44167 10.5033C7.54278 10.2061 7.80278 10.0178 8.075 10.0156ZM11.3822 7C6.75278 7 3.00278 10.75 3 15.38C3.00278 20.0067 6.75278 23.7589 11.3822 23.7589C16.0089 23.7589 19.7622 20.0067 19.7622 15.38C19.7622 10.75 16.0089 7 11.3822 7Z"
                                            fill="#624FD1"
                                        ></path>
                                    </svg>
                                </a>
                                <h4>On Delivery</h4>
                                <span>Sat, 23 Jul 2020, 01:24 PM</span>
                            </li>
                            <li>
                                <a href="/react/demo/order-details">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.42733 32.6639C6.519 32.6639 5.78955 33.1361 5.78955 33.7205V44.5572C5.78955 45.1411 6.519 45.61 7.42733 45.61H9.64677C10.5557 45.61 11.2846 45.1411 11.2846 44.5572V33.7205C11.2846 33.1355 10.5557 32.6639 9.64677 32.6639H7.42733ZM18.2834 31.5189C16.4607 31.6233 15.1096 32.3522 14.1896 33.3333C13.7034 33.8511 13.4229 34.9467 13.4229 35.6589V43.0267C13.4229 44.4533 14.5801 45.61 16.0068 45.61H32.7718C33.2984 45.61 33.8162 45.445 34.2446 45.1389L43.7323 36.6778C45.3096 35.37 42.7779 32.9655 39.2329 35.0111L32.9946 38.7144C32.1296 39.2122 31.5907 39.3078 30.6418 39.3078H23.8162C21.799 39.3078 22.0918 37.245 23.8707 37.245H29.9357C32.4646 37.245 32.4618 33.6133 29.9357 33.2033L20.2623 31.6344C19.5834 31.5472 18.8796 31.4844 18.2834 31.5189Z"
                                            fill="#624FD1"
                                        ></path>
                                        <path d="M35.2716 5.50891C36.2205 5.50891 37.0944 6.0328 37.5666 6.88391L40.6738 11.2906C41.0122 11.9017 40.5811 12.5722 39.9044 12.6645H27.0544L26.0005 5.50891H35.2716Z" fill="#9B9B9B"></path>
                                        <path
                                            d="M10.0541 14.2817C9.10245 14.2817 8.33301 15.1061 8.33301 16.1306V30.6822H9.64634C10.4625 30.6822 11.2869 30.7983 11.9408 31.3278C12.6208 31.8767 12.3491 32.12 13.278 31.4311C15.633 29.6789 17.9797 29.2622 20.5952 29.6872L30.2686 31.2517C30.963 31.3644 31.5558 31.6683 32.0941 32.0222C32.5313 32.3111 32.6613 33.0333 33.1619 33.0333H39.9469C40.8997 33.0333 41.6663 32.21 41.6663 31.1856V16.13C41.6663 15.1056 40.8997 14.2811 39.9469 14.2811H10.0541V14.2817Z"
                                            fill="#9B9B9B"
                                        ></path>
                                        <path d="M14.7278 5.50891C13.7811 5.50891 12.905 6.0328 12.4328 6.88391L9.32559 11.2906C8.98726 11.9017 9.42059 12.5722 10.0956 12.6645H22.945L23.9984 5.50947H14.7278V5.50891Z" fill="#9B9B9B"></path>
                                    </svg>
                                </a>
                                <h4>Order Delivered</h4>
                                <span>-</span>
                            </li>
                            <li>
                                <a href="/react/demo/order-details">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.8095 19.4606H26.9156C27.7312 19.4606 28.3912 20.1178 28.3912 20.9339V21.7267C28.3912 22.5423 27.7312 23.1989 26.9156 23.1989H17.8095C16.9901 23.1989 16.334 22.5423 16.334 21.7267V20.9339C16.334 20.1178 16.9906 19.4606 17.8095 19.4606ZM6.68676 15.5139C5.70287 15.5139 4.91064 16.365 4.91064 17.4234V42.0472C4.91064 43.1061 5.70287 43.9573 6.68676 43.9573H28.4023C26.6351 42.0128 25.544 39.4345 25.544 36.5995C25.544 30.5545 30.4451 25.6534 36.4929 25.6534C37.4856 25.6534 38.4406 25.7978 39.3551 26.0439V17.4234C39.3551 16.365 38.5618 15.5139 37.5784 15.5139H6.68676Z"
                                            fill="#9B9B9B"
                                        ></path>
                                        <path
                                            d="M23.8541 5.92219L24.9425 13.315H37.5353C38.2414 13.315 38.6803 12.5283 38.3308 11.8944L35.1191 7.34052C34.633 6.4633 33.7275 5.92274 32.7497 5.92274H23.8541V5.92219ZM11.5164 5.92219C10.5375 5.92219 9.63247 6.46274 9.14581 7.33996L5.93414 11.8938C5.58469 12.5277 6.02692 13.3144 6.73081 13.3144H19.3236L20.4108 5.92163H11.5164V5.92219Z"
                                            fill="#9B9B9B"
                                        ></path>
                                        <path
                                            d="M40.2022 32.5683C40.3906 32.5739 40.5667 32.64 40.7028 32.7766L41.36 33.4344C41.67 33.7428 41.6289 34.2789 41.2728 34.6344L35.495 40.4122C35.2172 40.69 34.6845 40.7139 34.3839 40.4122L31.7095 37.7383C31.3539 37.3833 31.3133 36.8472 31.6233 36.5383L32.28 35.8805C32.5895 35.5744 33.1245 35.6116 33.4811 35.9672L34.9395 37.4255L39.505 32.8628C39.7039 32.6639 39.9622 32.5628 40.2022 32.5683ZM36.4922 28.2194C31.8628 28.2194 28.1128 31.9694 28.1128 36.5994C28.1128 41.2261 31.8628 44.9783 36.4922 44.9783C41.1189 44.9783 44.8722 41.2261 44.8722 36.5994C44.8722 31.9694 41.1189 28.2194 36.4922 28.2194Z"
                                            fill="#624FD1"
                                        ></path>
                                    </svg>
                                </a>
                                <h4>Give Review</h4>
                                <span>-</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-9 col-xxl-8">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body"><img src="/react/demo/static/media/map.2ba8a26afad9d411120f.jpg" alt="" style="width: 100%;" /></div>
                    </div>
                </div>
                <div class="col-xl-8 col-md-7">
                    <div class="card">
                        <div class="card-body d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center delivery-guy">
                                <div class="me-3"><img src="/react/demo/static/media/pic1.f55c1897497b0a2affe8.jpg" alt="" /></div>
                                <div>
                                    <span>Delivery guy</span>
                                    <h4 class="mb-0">Louis Simatupang</h4>
                                    <span class="text-primary">ID 412455</span>
                                </div>
                            </div>
                            <div>
                                <ul class="delivery-contact">
                                    <li>
                                        <a class="me-3" href="/react/demo/order-details"><i class="fas fa-comment-dots"></i></a>
                                    </li>
                                    <li>
                                        <a href="/react/demo/order-details"><i class="fas fa-phone-alt"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex">
                                <svg class="me-2 vert-move" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M44.0137 6.54388C42.2281 4.7611 39.4593 4.65722 36.8259 7.28777L28.7931 15.32C27.902 14.9411 26.9876 14.7305 26.2148 14.5211L10.4654 11.0694C7.87258 10.5022 5.30925 13.9917 9.24425 16.2661L21.0359 23.0772L13.5298 32.3533L8.5037 31.9028C6.79647 31.7522 5.41036 33.5628 7.28536 35.4389L15.1209 43.2711C16.9959 45.1461 18.8076 43.7628 18.6537 42.0555L18.2054 37.0294L27.4815 29.5206L34.2931 41.3144C36.5676 45.25 40.057 42.6839 39.4898 40.0939L36.0348 24.3439C35.8293 23.5711 35.6181 22.6572 35.2387 21.7639L43.2681 13.7339C45.9026 11.1011 45.7987 8.32944 44.0137 6.54388Z"
                                        fill="#624FD1"
                                    ></path>
                                    <path
                                        d="M8.3045 18.5694C7.97728 18.5811 7.66784 18.7167 7.43895 18.9517L4.86339 21.5266C4.37228 22.0183 4.37228 22.8172 4.86117 23.3094C5.35339 23.8011 6.15173 23.8044 6.64339 23.3116L9.21895 20.7372C10.0495 19.9355 9.45617 18.5344 8.3045 18.5694Z"
                                        fill="#FD683E"
                                    ></path>
                                    <path
                                        d="M13.8341 21.4261C13.5069 21.4339 13.1975 21.5733 12.9686 21.8072L7.5347 27.2416C7.04248 27.7333 7.0397 28.5283 7.53192 29.0233C8.02359 29.515 8.82192 29.515 9.31414 29.0233L14.748 23.5894C15.5764 22.7911 14.9864 21.3905 13.8341 21.4261Z"
                                        fill="#FD683E"
                                    ></path>
                                    <path
                                        d="M27.8357 35.4295C27.5085 35.4411 27.1963 35.5772 26.9702 35.8117L21.5363 41.2456C21.0041 41.7295 20.9841 42.5595 21.493 43.0684C21.9996 43.5784 22.833 43.5578 23.3157 43.025L28.753 37.5911C29.5746 36.7906 28.9846 35.395 27.8357 35.4295Z"
                                        fill="#FD683E"
                                    ></path>
                                    <path
                                        d="M30.6888 40.9594C30.3616 40.9683 30.0521 41.105 29.8233 41.3383L27.2477 43.9178C26.756 44.4094 26.756 45.2078 27.251 45.6961C27.7427 46.1889 28.541 46.1889 29.0333 45.6961L31.6088 43.1211C32.4305 42.3166 31.8377 40.9222 30.6888 40.9594Z"
                                        fill="#FD683E"
                                    ></path>
                                </svg>
                                <div>
                                    <span>Estimated Time</span>
                                    <h4 class="fs-22 font-w600 mb-0">10-14 Min</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body p-0">
                            <div class="table-responsive order-list card-table">
                                <table class="table items-table table-responsive-md">
                                    <tbody>
                                        <tr>
                                            <th class="text-black font-w700 fs-20">Items</th>
                                            <th class="text-black font-w700 fs-20" style="width: 10%;">Qty</th>
                                            <th class="text-black font-w700 fs-20" style="width: 10%;">Price</th>
                                            <th class="my-0 text-black font-w700 fs-20 wspace-no d-md-none d-lg-table-cell">Total Price</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="media">
                                                    <a href="/react/demo/order-details">
                                                        <img
                                                            class="me-3 img-fluid"
                                                            src="data:image/jpeg;base64,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"
                                                            alt="DexignZone"
                                                        />
                                                    </a>
                                                    <div class="media-body">
                                                        <small class="mt-0 mb-1 font-w600"><a class="text-primary" href="/react/demo/order-details">MAIN COURSE</a></small>
                                                        <h5 class="mt-0 mb-2 mb-sm-3"><a class="text-black" href="/react/demo/ecom-product-grid">Chicken curry special with cucumber</a></h5>
                                                        <div class="star-review d-flex align-items-center fs-14">
                                                            <i class="fa fa-star text-orange"></i><i class="fa fa-star text-orange"></i><i class="fa fa-star text-orange"></i><i class="fa fa-star text-gray"></i>
                                                            <i class="fa fa-star text-gray"></i><span class="ms-3 text-dark">(454 revies)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><h4 class="my-0 font-w600">1x</h4></td>
                                            <td><h4 class="my-0 font-w600">$4.12</h4></td>
                                            <td class="d-md-none d-lg-table-cell"><h4 class="my-0 font-w600">$4.12</h4></td>
                                            <td><a class="ti-close fs-28 text-danger las la-times-circle" href="/react/demo/order-details"></a></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="media">
                                                    <a href="/react/demo/order-details">
                                                        <img
                                                            class="me-3 img-fluid"
                                                            src="data:image/jpeg;base64,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"
                                                            alt="DexignZone"
                                                        />
                                                    </a>
                                                    <div class="media-body">
                                                        <small class="mt-0 mb-1 font-w600"><a class="text-primary" href="/react/demo/order-details">MAIN COURSE</a></small>
                                                        <h5 class="mt-0 mb-2 mb-sm-3"><a class="text-black" href="/react/demo/ecom-product-grid">Watermelon juice with ice</a></h5>
                                                        <div class="star-review d-flex align-items-center fs-14">
                                                            <i class="fa fa-star text-orange"></i><i class="fa fa-star text-orange"></i><i class="fa fa-star text-orange"></i><i class="fa fa-star text-gray"></i>
                                                            <i class="fa fa-star text-gray"></i><span class="ms-3 text-dark">(454 revies)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><h4 class="my-0 font-w600">2x</h4></td>
                                            <td><h4 class="my-0 font-w600">$14.99</h4></td>
                                            <td class="d-md-none d-lg-table-cell"><h4 class="my-0 font-w600">$44.97</h4></td>
                                            <td><a class="ti-close fs-28 text-danger las la-times-circle" href="/react/demo/order-details"></a></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="media">
                                                    <a href="/react/demo/order-details">
                                                        <img
                                                            class="me-3 img-fluid"
                                                            src="data:image/jpeg;base64,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"
                                                            alt="DexignZone"
                                                        />
                                                    </a>
                                                    <div class="media-body">
                                                        <small class="mt-0 mb-1 font-w600"><a class="text-primary" href="/react/demo/order-details">MAIN COURSE</a></small>
                                                        <h5 class="mt-0 mb-2 mb-sm-3"><a class="text-black" href="/react/demo/ecom-product-grid">Italiano pizza with garlic</a></h5>
                                                        <div class="star-review d-flex align-items-center fs-14">
                                                            <i class="fa fa-star text-orange"></i><i class="fa fa-star text-orange"></i><i class="fa fa-star text-orange"></i><i class="fa fa-star text-gray"></i>
                                                            <i class="fa fa-star text-gray"></i><span class="ms-3 text-dark">(454 revies)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><h4 class="my-0 font-w600">3x</h4></td>
                                            <td><h4 class="my-0 font-w600">$15.44</h4></td>
                                            <td class="d-md-none d-lg-table-cell"><h4 class="my-0 font-w600">$15.44</h4></td>
                                            <td><a class="ti-close fs-28 text-danger las la-times-circle" href="/react/demo/order-details"></a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-xxl-4">
            <div class="row">
                <div class="col-xl-12 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="text-center order-media mb-4">
                                <img
                                    src="data:image/jpeg;base64,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"
                                    alt=""
                                />
                                <div>
                                    <h4 class="text-black mb-3 font-w600">Soleh Anderson</h4>
                                    <a class="btn btn-primary btn-sm" href="/react/demo/order-details">Customer</a>
                                </div>
                            </div>
                            <div class="imfo align-items-center mb-4">
                                <i class="fas fa-phone-alt"></i>
                                <h5 class="mb-0 text-black ms-3">+51 5125 626 77</h5>
                            </div>
                            <div class="imfo align-items-center mb-4">
                                <i class="fas fa-map-marker-alt"></i>
                                <h5 class="mb-0 text-black ms-3">
                                    Franklin Avenue St.<br />
                                    London, ABC 12345<br />
                                    United Kingdom
                                </h5>
                            </div>
                        </div>
                        <div class="card-footer">
                            <h4>Note Order</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12 col-sm-6">
                    <div class="card">
                        <div class="card-header border-0"><h4 class="fs-18">Customer Favourite</h4></div>
                        <div class="card-body">
                            <div id="pieChart2">
                                <div id="chart">
                                    <div style="min-height: 232.8px;">
                                        <div id="apexcharts9i0dqad1" class="apexcharts-canvas apexcharts9i0dqad1 apexcharts-theme-light" style="width: 349px; height: 232.8px;">
                                            <svg
                                                id="SvgjsSvg3015"
                                                width="349"
                                                height="232.79999999999998"
                                            
                                                transform="translate(0, 0)"
                                                style="background: transparent;"
                                            >
                                                <g id="SvgjsG3017" class="apexcharts-inner apexcharts-graphical" transform="translate(62.5, 0)">
                                                    <defs id="SvgjsDefs3016">
                                                        <clipPath id="gridRectMask9i0dqad1">
                                                            <rect id="SvgjsRect3019" width="230" height="248" x="-2" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect>
                                                        </clipPath>
                                                        <clipPath id="forecastMask9i0dqad1"></clipPath>
                                                        <clipPath id="nonForecastMask9i0dqad1"></clipPath>
                                                        <clipPath id="gridRectMarkerMask9i0dqad1">
                                                            <rect id="SvgjsRect3020" width="230" height="252" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect>
                                                        </clipPath>
                                                    </defs>
                                                    <g id="SvgjsG3021" class="apexcharts-pie">
                                                        <g id="SvgjsG3022" transform="translate(0, 0) scale(1)">
                                                            <circle id="SvgjsCircle3023" r="69.05853658536586" cx="113" cy="113" fill="transparent"></circle>
                                                            <g id="SvgjsG3024" class="apexcharts-slices">
                                                                <g id="SvgjsG3025" class="apexcharts-series apexcharts-pie-series" seriesName="series-1" rel="1" data:realIndex="0">
                                                                    <path
                                                                        id="SvgjsPath3026"
                                                                        d="M 113 6.756097560975604 A 106.2439024390244 106.2439024390244 0 0 1 180.30769871167823 195.20365259287985 L 156.75000416259084 166.4323741853719 A 69.05853658536586 69.05853658536586 0 0 0 113 43.94146341463414 L 113 6.756097560975604 z"
                                                                        fill="rgba(98,79,209,1)"
                                                                        fill-opacity="1"
                                                                        stroke-opacity="1"
                                                                        stroke-linecap="butt"
                                                                        stroke-width="0"
                                                                        stroke-dasharray="0"
                                                                        class="apexcharts-pie-area apexcharts-donut-slice-0"
                                                                        index="0"
                                                                        j="0"
                                                                        data:angle="140.68965517241378"
                                                                        data:startAngle="0"
                                                                        data:strokeWidth="0"
                                                                        data:value="34"
                                                                        data:pathOrig="M 113 6.756097560975604 A 106.2439024390244 106.2439024390244 0 0 1 180.30769871167823 195.20365259287985 L 156.75000416259084 166.4323741853719 A 69.05853658536586 69.05853658536586 0 0 0 113 43.94146341463414 L 113 6.756097560975604 z"
                                                                    ></path>
                                                                </g>
                                                                <g id="SvgjsG3027" class="apexcharts-series apexcharts-pie-series" seriesName="series-2" rel="2" data:realIndex="1">
                                                                    <path
                                                                        id="SvgjsPath3028"
                                                                        d="M 180.30769871167823 195.20365259287985 A 106.2439024390244 106.2439024390244 0 0 1 93.9215762069804 217.516891223605 L 100.59902453453726 180.93597929534326 A 69.05853658536586 69.05853658536586 0 0 0 156.75000416259084 166.4323741853719 L 180.30769871167823 195.20365259287985 z"
                                                                        fill="rgba(114,193,226,1)"
                                                                        fill-opacity="1"
                                                                        stroke-opacity="1"
                                                                        stroke-linecap="butt"
                                                                        stroke-width="0"
                                                                        stroke-dasharray="0"
                                                                        class="apexcharts-pie-area apexcharts-donut-slice-1"
                                                                        index="0"
                                                                        j="1"
                                                                        data:angle="49.65517241379311"
                                                                        data:startAngle="140.68965517241378"
                                                                        data:strokeWidth="0"
                                                                        data:value="12"
                                                                        data:pathOrig="M 180.30769871167823 195.20365259287985 A 106.2439024390244 106.2439024390244 0 0 1 93.9215762069804 217.516891223605 L 100.59902453453726 180.93597929534326 A 69.05853658536586 69.05853658536586 0 0 0 156.75000416259084 166.4323741853719 L 180.30769871167823 195.20365259287985 z"
                                                                    ></path>
                                                                </g>
                                                                <g id="SvgjsG3029" class="apexcharts-series apexcharts-pie-series" seriesName="series-3" rel="3" data:realIndex="2">
                                                                    <path
                                                                        id="SvgjsPath3030"
                                                                        d="M 93.9215762069804 217.516891223605 A 106.2439024390244 106.2439024390244 0 0 1 112.98145694101684 6.75609917916276 L 112.98794701166095 43.9414644664558 A 69.05853658536586 69.05853658536586 0 0 0 100.59902453453726 180.93597929534326 L 93.9215762069804 217.516891223605 z"
                                                                        fill="rgba(255,164,29,1)"
                                                                        fill-opacity="1"
                                                                        stroke-opacity="1"
                                                                        stroke-linecap="butt"
                                                                        stroke-width="0"
                                                                        stroke-dasharray="0"
                                                                        class="apexcharts-pie-area apexcharts-donut-slice-2"
                                                                        index="0"
                                                                        j="2"
                                                                        data:angle="169.6551724137931"
                                                                        data:startAngle="190.3448275862069"
                                                                        data:strokeWidth="0"
                                                                        data:value="41"
                                                                        data:pathOrig="M 93.9215762069804 217.516891223605 A 106.2439024390244 106.2439024390244 0 0 1 112.98145694101684 6.75609917916276 L 112.98794701166095 43.9414644664558 A 69.05853658536586 69.05853658536586 0 0 0 100.59902453453726 180.93597929534326 L 93.9215762069804 217.516891223605 z"
                                                                    ></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                    <line id="SvgjsLine3031" x1="0" y1="0" x2="226" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line>
                                                    <line id="SvgjsLine3032" x1="0" y1="0" x2="226" y2="0" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line>
                                                </g>
                                                <g id="SvgjsG3018" class="apexcharts-annotations"></g>
                                            </svg>
                                            <div class="apexcharts-legend" style="max-height: 125px;"></div>
                                            <div class="apexcharts-tooltip apexcharts-theme-dark">
                                                <div class="apexcharts-tooltip-series-group" style="order: 1;">
                                                    <span class="apexcharts-tooltip-marker" style="background-color: rgb(98, 79, 209);"></span>
                                                    <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                        <div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label"></span><span class="apexcharts-tooltip-text-y-value"></span></div>
                                                        <div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div>
                                                        <div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div>
                                                    </div>
                                                </div>
                                                <div class="apexcharts-tooltip-series-group" style="order: 2;">
                                                    <span class="apexcharts-tooltip-marker" style="background-color: rgb(114, 193, 226);"></span>
                                                    <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                        <div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label"></span><span class="apexcharts-tooltip-text-y-value"></span></div>
                                                        <div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div>
                                                        <div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div>
                                                    </div>
                                                </div>
                                                <div class="apexcharts-tooltip-series-group" style="order: 3;">
                                                    <span class="apexcharts-tooltip-marker" style="background-color: rgb(255, 164, 29);"></span>
                                                    <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                                                        <div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label"></span><span class="apexcharts-tooltip-text-y-value"></span></div>
                                                        <div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div>
                                                        <div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="chart-items1">
                                <div class="d-flex align-items-end mt-2 py-3 justify-content-between">
                                    <span class="fs-14 font-w500">Pizza (40%)</span><span class="fs-14"><span class="pe-2"></span>25</span>
                                </div>
                                <div class="progress default-progress">
                                    <div class="progress-bar progress-animated" role="progressbar" style="width: 40%; height: 11px;"><span class="sr-only">40% Complete</span></div>
                                </div>
                            </div>
                            <div class="chart-items2">
                                <div class="d-flex align-items-end mt-2 py-3 justify-content-between">
                                    <span class="fs-14 font-w500">Juice (53%)</span><span class="fs-14"><span class="pe-2"></span>60</span>
                                </div>
                                <div class="progress default-progress">
                                    <div class="progress-bar progress-animated" role="progressbar" style="width: 53%; height: 11px;"><span class="sr-only">53% Complete</span></div>
                                </div>
                            </div>
                            <div class="chart-items3">
                                <div class="d-flex align-items-end mt-2 py-3 justify-content-between">
                                    <span class="fs-14 font-w500">Dessert (25%)</span><span class="fs-14"><span class="pe-2"></span>7</span>
                                </div>
                                <div class="progress default-progress">
                                    <div class="progress-bar progress-animated" role="progressbar" style="width: 25%; height: 11px;"><span class="sr-only">25% Complete</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

);
}

export default orderDetails;
