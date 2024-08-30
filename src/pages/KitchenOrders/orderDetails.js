import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Dropdown, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getOrders, updateOrderStatus, updateOrder } from '../../store/orderSlice';
import { getSubItem, getSubItems } from '../../store/itemsSlice';
import { getUsers } from '../../store/usersSlice';
import Map from './map';



function KitchenOrderDetails() {
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const [subItemsData, setSubItemsData] = useState(null);
    const [deliveryBoy, setDeliveryBoy] = useState(0);
    // const [subItems, setSubItems] = useState([]);
    const {order} = useSelector((state) => state.orders)
    const {subItems} = useSelector((state) => state.items)
    const {users} = useSelector((state) => state.users)
    const getOrderData = async() => {
        
       let orderDataRes = await dispatch(getOrder({id: orderId}))
       if(orderDataRes.payload.success) {
        console.log("orderDataRes.payload.data")
        console.log(orderDataRes.payload.data)
        let subItemsData = JSON.parse(orderDataRes.payload.data.subItems)
        console.log("subItemsData")
        console.log(subItemsData)
        setSubItemsData(subItemsData)
        await dispatch(getSubItems())
        if(!orderDataRes.payload.data.deliveryParterId) {
            await dispatch(getUsers({user_type: 'delivery boy'}) )
        }
       }
    }
    useEffect(() => {
        getOrderData()
    }, [orderId])
    const assignDriver = async () => {
        await dispatch(updateOrder({orderId: orderId, updateData: {deliveryParterId: deliveryBoy}}))
        getOrderData()
    }
    const updateOrder = async(orderId, statusD) => {
        console.log(orderId, statusD)
        await dispatch(updateOrderStatus({orderId, status: statusD}))
  
      }
  return (
    <div className="container-fluid order_details_page">
    <div className="mb-sm-4 d-flex flex-wrap align-items-center text-head">
        <h2 className="mb-3 me-auto">Order ID #{order.id}</h2>
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active"><a href="/react/demo/orderDetails">Order</a></li>
                <li className="breadcrumb-item"><a href="/react/demo/orderDetails">Order Details</a></li>
            </ol>
        </div>
    </div>
    <div className="row">
        <div className="col-xl-12">
            <div className="card">
                <div className="card-body">
                    <div className="steps">
                        <ul className="orders">
                            <li className="active">
                                <a href="/orderDetails">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.764 37.0455C33.0967 37.0339 33.409 37.1955 33.5079 37.5633C33.9617 39.2583 35.9523 39.7855 37.6573 38.6972L37.324 38.1189C37.104 37.7044 37.4195 37.0044 38.0301 37.1261L40.4956 37.6211C41.2823 37.7772 41.5951 38.3439 41.3462 39.0883L40.5417 41.4755C40.4401 41.7728 40.1801 41.9616 39.9079 41.965C39.6967 41.965 39.4823 41.8522 39.3323 41.5939L38.9295 40.8972C38.2384 41.3628 37.4945 41.6494 36.754 41.75C34.4217 42.0689 32.4601 40.795 31.8234 38.4133C31.6006 37.5705 32.2106 37.065 32.764 37.0455ZM33.2962 31.235C33.5079 31.235 33.7245 31.3444 33.8723 31.605L34.2773 32.3016C34.969 31.8361 35.7129 31.5478 36.4506 31.4489C38.7823 31.1311 40.7445 32.4039 41.384 34.7855C41.7401 36.1333 39.9629 36.6194 39.7001 35.635C39.2462 33.94 37.2523 33.4128 35.5479 34.5011L35.8834 35.0794C36.1034 35.4939 35.7851 36.1939 35.1751 36.07L32.7095 35.5772C31.9251 35.4178 31.6101 34.8533 31.859 34.1111L32.6629 31.7228C32.764 31.4255 33.024 31.2372 33.2962 31.235ZM36.6034 28.2194C31.974 28.2194 28.224 31.9694 28.2212 36.5994C28.224 41.2261 31.974 44.9783 36.6034 44.9783C41.2301 44.9783 44.9834 41.2261 44.9834 36.5994C44.9834 31.9694 41.2301 28.2194 36.6034 28.2194Z" fill="white"></path><path d="M17.9202 19.4605H27.0263C27.8424 19.4605 28.5019 20.1177 28.5019 20.9339V21.7266C28.5019 22.5422 27.8419 23.1989 27.0263 23.1989H17.9202C17.1013 23.1989 16.4446 22.5422 16.4446 21.7266V20.9339C16.4446 20.1177 17.1013 19.4605 17.9202 19.4605ZM6.79686 15.5139C5.81297 15.5139 5.02075 16.365 5.02075 17.4233V42.0472C5.02075 43.1061 5.81353 43.9572 6.79686 43.9572H28.513C26.7452 42.0128 25.6541 39.4344 25.6541 36.5994C25.6541 30.5544 30.5558 25.6533 36.603 25.6533C37.5958 25.6533 38.5508 25.7977 39.4646 26.0439V17.4233C39.4646 16.365 38.6719 15.5139 37.688 15.5139H6.79686Z" fill="white"></path><path d="M23.9647 5.92219L25.0531 13.315H37.6453C38.3486 13.315 38.7914 12.5283 38.4414 11.8944L35.2297 7.34052C34.7436 6.4633 33.8381 5.92274 32.8597 5.92274H23.9647V5.92219ZM11.627 5.92219C10.6486 5.92219 9.74306 6.46274 9.25695 7.33996L6.04528 11.8938C5.69473 12.5277 6.13751 13.3144 6.84084 13.3144H19.4336L20.5219 5.92163H11.627V5.92219Z" fill="white"></path></svg>
                                </a>
                                <h5>Order Created</h5>
                                <span>{order.orderDateTime}</span>
                            </li>
                            <li className="active">
                                <a href="/orderDetails">
                                   <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.25 4.6875H18.75C17.0241 4.6875 15.625 6.08661 15.625 7.8125V10.9375C15.625 12.6634 17.0241 14.0625 18.75 14.0625H31.25C32.9759 14.0625 34.375 12.6634 34.375 10.9375V7.8125C34.375 6.08661 32.9759 4.6875 31.25 4.6875Z" fill="#ffffff"></path><path d="M33.8218 18.75H16.1783C14.2616 18.75 12.5379 19.917 11.8261 21.6966L6.36183 35.3572C5.9513 36.3836 6.70717 37.5 7.81258 37.5H42.1876C43.293 37.5 44.0488 36.3836 43.6383 35.3572L38.1741 21.6966C37.4622 19.917 35.7387 18.75 33.8218 18.75Z" fill="#ffffff"></path><path d="M15.625 25C15.625 25.863 16.3245 26.5625 17.1875 26.5625H26.5625C27.4255 26.5625 28.125 25.863 28.125 25C28.125 24.137 27.4255 23.4375 26.5625 23.4375H17.1875C16.3245 23.4375 15.625 24.137 15.625 25Z" fill="white"></path><path d="M31.25 26.5625C30.387 26.5625 29.6875 25.863 29.6875 25C29.6875 24.137 30.387 23.4375 31.25 23.4375H32.8125C33.6755 23.4375 34.375 24.137 34.375 25C34.375 25.863 33.6755 26.5625 32.8125 26.5625H31.25Z" fill="white"></path><path d="M20.3125 40.625C20.3125 41.488 21.012 42.1875 21.875 42.1875H28.125C28.988 42.1875 29.6875 41.488 29.6875 40.625C29.6875 39.762 28.988 39.0625 28.125 39.0625H21.875C21.012 39.0625 20.3125 39.762 20.3125 40.625Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M31.2501 4.6875H18.7501C17.0241 4.6875 15.6251 6.08661 15.6251 7.8125V10.9375C15.6251 12.6634 17.0241 14.0625 18.7501 14.0625H23.4376V18.75H16.1783C14.2616 18.75 12.5379 19.917 11.8261 21.6966L6.3752 35.3238C6.34583 35.3925 6.32123 35.4638 6.30184 35.537C6.25947 35.6948 6.24317 35.853 6.25006 36.0073V42.1875C6.25006 44.7764 8.34873 46.875 10.9376 46.875H39.0626C41.6515 46.875 43.7501 44.7764 43.7501 42.1875V36.008C43.7571 35.8512 43.7402 35.6906 43.6965 35.5305C43.6776 35.4598 43.6537 35.3913 43.6254 35.3248L38.1741 21.6966C37.4622 19.917 35.7387 18.75 33.8218 18.75H26.5626V14.0625H31.2501C32.976 14.0625 34.3751 12.6634 34.3751 10.9375V7.8125C34.3751 6.08661 32.976 4.6875 31.2501 4.6875ZM18.7501 10.9375V7.8125H31.2501V10.9375H18.7501ZM39.8797 34.375H10.1204L14.7276 22.8572C14.9648 22.2641 15.5394 21.875 16.1783 21.875H33.8218C34.4607 21.875 35.0354 22.2641 35.2726 22.8572L39.8797 34.375ZM9.37506 42.1875V37.5H40.6251V42.1875C40.6251 43.0505 39.9255 43.75 39.0626 43.75H10.9376C10.0746 43.75 9.37506 43.0505 9.37506 42.1875Z" fill="white"></path></svg>
                                </a>
                                <h5>Payment Success</h5>
                                <span>{order.orderDateTime}</span>
                            </li>
                            <li className="process">
                                <a href="/orderDetails">
                                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.2718 22.9973H38.7934C39.2218 23.0006 39.2595 23.0084 39.3662 23.4106L40.3468 27.3084C40.5379 28.1328 40.5701 28.1645 39.7512 28.1645H35.3707C34.8007 28.1645 34.6584 28.1828 34.6584 27.3867V23.6662C34.6584 23.0317 34.7862 22.9973 35.2718 22.9973ZM21.4351 14.1917C21.4501 14.4317 21.4701 14.6723 21.4701 14.9156C21.4701 20.6795 16.7973 25.3517 11.0329 25.3517C9.88677 25.3517 8.78788 25.1584 7.75732 24.8167V37.6012C7.75732 38.8706 8.62843 39.895 9.71343 39.895H13.1045L13.0984 39.7562C13.0984 36.5423 15.7029 33.9378 18.9179 33.9378C22.1301 33.9378 24.7368 36.5423 24.7368 39.7562C24.734 39.8028 24.7307 39.8495 24.7284 39.895H29.9945L29.989 39.7562C29.989 36.5423 32.5934 33.9378 35.8084 33.9378C39.0201 33.9378 41.624 36.5423 41.624 39.7562C41.624 39.8028 41.6212 39.8495 41.6179 39.895H45.2701C46.2107 39.895 46.9657 39.0073 46.9657 37.9073V34.6323C46.9657 32.9362 46.4218 31.7245 45.5418 30.7367L43.2795 28.2017L41.8907 22.2589C41.6012 20.7889 40.8951 20.2767 39.324 20.2767H33.3218V15.9973C33.3218 14.7278 32.4473 14.1917 31.3634 14.1917H21.4351Z" fill="#ec1d25"></path><path d="M18.9176 41.4228C19.8376 41.4228 20.5843 40.6761 20.5843 39.7561C20.5843 38.8361 19.8376 38.0895 18.9176 38.0895C17.9976 38.0895 17.2509 38.8361 17.2509 39.7561C17.2509 40.6761 17.9981 41.4228 18.9176 41.4228ZM18.9176 44.2006C16.4637 44.2006 14.4731 42.2106 14.4731 39.7561C14.4731 37.3028 16.4637 35.3117 18.9176 35.3117C20.0959 35.3117 21.2265 35.7806 22.0598 36.6139C22.8931 37.4473 23.362 38.5789 23.362 39.7561C23.362 42.2106 21.3709 44.2006 18.9176 44.2006Z" fill="#ec1d25"></path><path d="M35.8077 38.0895C36.7277 38.0895 37.4744 38.8361 37.4744 39.7561C37.4744 40.6761 36.7277 41.4228 35.8077 41.4228C34.8866 41.4228 34.1411 40.6761 34.1411 39.7561C34.1411 38.8361 34.8866 38.0895 35.8077 38.0895ZM35.8077 35.3117C33.3538 35.3117 31.3655 37.3028 31.3633 39.7561C31.3633 40.9345 31.8311 42.065 32.6644 42.8984C33.4977 43.7317 34.63 44.2006 35.8077 44.2006C36.9877 44.2006 38.1166 43.7317 38.9499 42.8984C39.7866 42.065 40.2522 40.9345 40.2522 39.7561C40.2522 37.3028 38.2644 35.3117 35.8077 35.3117Z" fill="#ec1d25"></path><path d="M7.54278 15.8261C7.87555 15.8144 8.18778 15.9761 8.28667 16.3439C8.74056 18.0389 10.7311 18.5661 12.4361 17.4778L12.1028 16.8994C11.8828 16.485 12.1983 15.785 12.8089 15.9067L15.2744 16.4017C16.0611 16.5578 16.3739 17.1244 16.125 17.8689L15.3206 20.2561C15.2189 20.5533 14.9589 20.7422 14.6867 20.7456C14.4756 20.7456 14.2611 20.6328 14.1111 20.3744L13.7083 19.6778C13.0172 20.1433 12.2733 20.43 11.5328 20.5306C9.20055 20.8494 7.23889 19.5756 6.60222 17.1939C6.37945 16.3511 6.98944 15.8456 7.54278 15.8261ZM8.075 10.0156C8.28667 10.0156 8.50333 10.125 8.65111 10.3856L9.05611 11.0822C9.74778 10.6167 10.4917 10.3283 11.2294 10.2294C13.5611 9.91167 15.5233 11.1844 16.1628 13.5661C16.5189 14.9139 14.7417 15.4 14.4789 14.4156C14.025 12.7206 12.0311 12.1933 10.3267 13.2817L10.6622 13.86C10.8822 14.2744 10.5639 14.9744 9.95389 14.8506L7.48833 14.3578C6.70389 14.1983 6.38889 13.6339 6.63778 12.8917L7.44167 10.5033C7.54278 10.2061 7.80278 10.0178 8.075 10.0156ZM11.3822 7C6.75278 7 3.00278 10.75 3 15.38C3.00278 20.0067 6.75278 23.7589 11.3822 23.7589C16.0089 23.7589 19.7622 20.0067 19.7622 15.38C19.7622 10.75 16.0089 7 11.3822 7Z" fill="#624FD1"></path></svg>
                                </a>
                                <h5>On Delivery</h5>
                                <span>Sat, 23 Jul 2024, 01:24 PM</span>
                            </li>
                            <li>
                                <a href="/orderDetails">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42733 32.6639C6.519 32.6639 5.78955 33.1361 5.78955 33.7205V44.5572C5.78955 45.1411 6.519 45.61 7.42733 45.61H9.64677C10.5557 45.61 11.2846 45.1411 11.2846 44.5572V33.7205C11.2846 33.1355 10.5557 32.6639 9.64677 32.6639H7.42733ZM18.2834 31.5189C16.4607 31.6233 15.1096 32.3522 14.1896 33.3333C13.7034 33.8511 13.4229 34.9467 13.4229 35.6589V43.0267C13.4229 44.4533 14.5801 45.61 16.0068 45.61H32.7718C33.2984 45.61 33.8162 45.445 34.2446 45.1389L43.7323 36.6778C45.3096 35.37 42.7779 32.9655 39.2329 35.0111L32.9946 38.7144C32.1296 39.2122 31.5907 39.3078 30.6418 39.3078H23.8162C21.799 39.3078 22.0918 37.245 23.8707 37.245H29.9357C32.4646 37.245 32.4618 33.6133 29.9357 33.2033L20.2623 31.6344C19.5834 31.5472 18.8796 31.4844 18.2834 31.5189Z" fill="#ec1d25"></path><path d="M35.2716 5.50891C36.2205 5.50891 37.0944 6.0328 37.5666 6.88391L40.6738 11.2906C41.0122 11.9017 40.5811 12.5722 39.9044 12.6645H27.0544L26.0005 5.50891H35.2716Z" fill="#9B9B9B"></path><path d="M10.0541 14.2817C9.10245 14.2817 8.33301 15.1061 8.33301 16.1306V30.6822H9.64634C10.4625 30.6822 11.2869 30.7983 11.9408 31.3278C12.6208 31.8767 12.3491 32.12 13.278 31.4311C15.633 29.6789 17.9797 29.2622 20.5952 29.6872L30.2686 31.2517C30.963 31.3644 31.5558 31.6683 32.0941 32.0222C32.5313 32.3111 32.6613 33.0333 33.1619 33.0333H39.9469C40.8997 33.0333 41.6663 32.21 41.6663 31.1856V16.13C41.6663 15.1056 40.8997 14.2811 39.9469 14.2811H10.0541V14.2817Z" fill="#9B9B9B"></path><path d="M14.7278 5.50891C13.7811 5.50891 12.905 6.0328 12.4328 6.88391L9.32559 11.2906C8.98726 11.9017 9.42059 12.5722 10.0956 12.6645H22.945L23.9984 5.50947H14.7278V5.50891Z" fill="#9B9B9B"></path></svg>
                                </a>
                                <h5>Order Delivered</h5>
                                <span>-</span>
                            </li>
                            <li>
                                <a href="/orderDetails">
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.8095 19.4606H26.9156C27.7312 19.4606 28.3912 20.1178 28.3912 20.9339V21.7267C28.3912 22.5423 27.7312 23.1989 26.9156 23.1989H17.8095C16.9901 23.1989 16.334 22.5423 16.334 21.7267V20.9339C16.334 20.1178 16.9906 19.4606 17.8095 19.4606ZM6.68676 15.5139C5.70287 15.5139 4.91064 16.365 4.91064 17.4234V42.0472C4.91064 43.1061 5.70287 43.9573 6.68676 43.9573H28.4023C26.6351 42.0128 25.544 39.4345 25.544 36.5995C25.544 30.5545 30.4451 25.6534 36.4929 25.6534C37.4856 25.6534 38.4406 25.7978 39.3551 26.0439V17.4234C39.3551 16.365 38.5618 15.5139 37.5784 15.5139H6.68676Z" fill="#9B9B9B"></path><path d="M23.8541 5.92219L24.9425 13.315H37.5353C38.2414 13.315 38.6803 12.5283 38.3308 11.8944L35.1191 7.34052C34.633 6.4633 33.7275 5.92274 32.7497 5.92274H23.8541V5.92219ZM11.5164 5.92219C10.5375 5.92219 9.63247 6.46274 9.14581 7.33996L5.93414 11.8938C5.58469 12.5277 6.02692 13.3144 6.73081 13.3144H19.3236L20.4108 5.92163H11.5164V5.92219Z" fill="#9B9B9B"></path><path d="M40.2022 32.5683C40.3906 32.5739 40.5667 32.64 40.7028 32.7766L41.36 33.4344C41.67 33.7428 41.6289 34.2789 41.2728 34.6344L35.495 40.4122C35.2172 40.69 34.6845 40.7139 34.3839 40.4122L31.7095 37.7383C31.3539 37.3833 31.3133 36.8472 31.6233 36.5383L32.28 35.8805C32.5895 35.5744 33.1245 35.6116 33.4811 35.9672L34.9395 37.4255L39.505 32.8628C39.7039 32.6639 39.9622 32.5628 40.2022 32.5683ZM36.4922 28.2194C31.8628 28.2194 28.1128 31.9694 28.1128 36.5994C28.1128 41.2261 31.8628 44.9783 36.4922 44.9783C41.1189 44.9783 44.8722 41.2261 44.8722 36.5994C44.8722 31.9694 41.1189 28.2194 36.4922 28.2194Z" fill="#ec1d25"></path></svg>
                                </a>
                                <h5>Give Review</h5>
                                <span>-</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-9 col-xxl-8">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <Map latitude={order.latitude} longitude={order.longitude}></Map>
                        {/* <div className="card-body"><img src="/assets/img/map_img.jpg" alt="" className='img-fluid' /></div> */}
                    </div>
                </div>
                <div className="col-xl-8 col-md-7">
                    <div className="card justify-content-center">
                        {
                            order.deliveryParterId ?
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center delivery-guy">
                                    <div className="me-3"><img src="/assets/img/logo_f.png" alt="" /></div>
                                    <div className='text-left'>
                                        <span>Delivery guy</span>
                                        <h5 className="mb-0 t_title">{order.deliveryBoy.fName + " " + order.deliveryBoy.lName}</h5>
                                        <span className="text-primary">ID {order.deliveryBoy.id}</span>
                                    </div>
                                </div>
                                <div>
                                    <ul className="delivery-contact d-flex">
                                        <li>
                                            <a className="me-3" href="/orderDetails"><i className="bi bi-chat-fill"></i></a>
                                        </li>
                                        <li>
                                            <a href="/orderDetails"><i className="bi bi-phone-fill"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <div className="mx-3"> 
                                
                                {
                                    (users && users.length) ?
                                    <div className="d-flex px-2 align-items-center">
                                        <div className="col-md-8">
                                        <Form.Select defaultValue={deliveryBoy} onChange={(e) => setDeliveryBoy(e.target.value)} required >
                                            <option value="">Select Delivery Boy</option>
                                            {
                                                users.map((user) => {
                                                    return (
                                                        <option value={user.id}>{user.fName + " " + user.lName}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        </div>
                                        <div className='col-md-4'>
                                            <button onClick={assignDriver} className="btn btn-primary btn-sm w-100 mx-2">Assign</button>
                                        </div>
                                        
                                    </div>
                                    
                                    : null
                                }
                            </div>
                        }
                        
                    </div>
                </div>
                <div className="col-xl-4 col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                            <svg className="me-2 vert-move" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.0137 6.54388C42.2281 4.7611 39.4593 4.65722 36.8259 7.28777L28.7931 15.32C27.902 14.9411 26.9876 14.7305 26.2148 14.5211L10.4654 11.0694C7.87258 10.5022 5.30925 13.9917 9.24425 16.2661L21.0359 23.0772L13.5298 32.3533L8.5037 31.9028C6.79647 31.7522 5.41036 33.5628 7.28536 35.4389L15.1209 43.2711C16.9959 45.1461 18.8076 43.7628 18.6537 42.0555L18.2054 37.0294L27.4815 29.5206L34.2931 41.3144C36.5676 45.25 40.057 42.6839 39.4898 40.0939L36.0348 24.3439C35.8293 23.5711 35.6181 22.6572 35.2387 21.7639L43.2681 13.7339C45.9026 11.1011 45.7987 8.32944 44.0137 6.54388Z" fill="#2e9a3f"></path><path d="M8.3045 18.5694C7.97728 18.5811 7.66784 18.7167 7.43895 18.9517L4.86339 21.5266C4.37228 22.0183 4.37228 22.8172 4.86117 23.3094C5.35339 23.8011 6.15173 23.8044 6.64339 23.3116L9.21895 20.7372C10.0495 19.9355 9.45617 18.5344 8.3045 18.5694Z" fill="#FD683E"></path><path d="M13.8341 21.4261C13.5069 21.4339 13.1975 21.5733 12.9686 21.8072L7.5347 27.2416C7.04248 27.7333 7.0397 28.5283 7.53192 29.0233C8.02359 29.515 8.82192 29.515 9.31414 29.0233L14.748 23.5894C15.5764 22.7911 14.9864 21.3905 13.8341 21.4261Z" fill="#FD683E"></path><path d="M27.8357 35.4295C27.5085 35.4411 27.1963 35.5772 26.9702 35.8117L21.5363 41.2456C21.0041 41.7295 20.9841 42.5595 21.493 43.0684C21.9996 43.5784 22.833 43.5578 23.3157 43.025L28.753 37.5911C29.5746 36.7906 28.9846 35.395 27.8357 35.4295Z" fill="#FD683E"></path><path d="M30.6888 40.9594C30.3616 40.9683 30.0521 41.105 29.8233 41.3383L27.2477 43.9178C26.756 44.4094 26.756 45.2078 27.251 45.6961C27.7427 46.1889 28.541 46.1889 29.0333 45.6961L31.6088 43.1211C32.4305 42.3166 31.8377 40.9222 30.6888 40.9594Z" fill="#FD683E"></path></svg>
                                <div>
                                    <span>Estimated Time</span>
                                    <h4 className="fs-22 font-w600 mb-0">10-14 Min</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className='card-title m-1'>{order.itemName + " - " + order.quantity}</div>
                            <div className="table-responsive order-list card-table">
                                <table className="table items-table table-responsive-md">
                                    <tbody>
                                        <tr>
                                            <th className="text-black font-w700 fs-20">Items</th>
                                            <th className="text-black font-w700 fs-20" >Qty</th>
                                            <th className="text-black font-w700 fs-20">Price</th>
                                            <th className="my-0 text-black font-w700 fs-20 wspace-no d-md-none d-lg-table-cell">Total Price</th>
                                        </tr>
                                        {
                                            (subItems && subItems.length) ? 
                                            subItems.map((subItem) => {
                                                if(subItemsData && subItemsData[subItem.id]) {
                                                    return (
                                                        <tr key={subItem.id}>
                                                            <td>
                                                                <div className="media d-flex align-items-start text-left">
                                                                    {/* <a href="/orderDetails"> */}
                                                                        <img
                                                                            style={{width: "100px"}}
                                                                            className="me-3 img-fluid"
                                                                        src={subItem?.image}
                                                                            alt="DexignZone"
                                                                        />
                                                                    {/* </a> */}
                                                                    <div className="media-body">
                                                                        <small className="mt-0 mb-1 font-w600"><a className="text-primary" href="/orderDetails">{subItem.name}</a></small>
                                                                        <h5 className="mt-0 mb-2 mb-sm-3"><a className="text-black" href="/ecom-product-grid">{subItem.description}</a></h5>
                                                                        <div className="star-review d-flex align-items-center fs-14">
                                                                            <i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i>
                                                                            <i className="bi bi-star-fill text-gray"></i><span className="ms-3 text-dark">(454 revies)</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><h5 className="my-0 font-w600">{subItemsData[subItem.id]}x</h5></td>
                                                            <td><h5 className="my-0 font-w600">${subItem.price}</h5></td>
                                                            <td className="d-md-none d-lg-table-cell"><h5 className="my-0 font-w600">${subItemsData[subItem.id] * subItem.price}</h5></td>
                                                        </tr>
                                                    )
                                                }
                                                
                                            })
                                            : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='card_total_price'>
                                Total Price: ${order.totalAmount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-3 col-xxl-4">
            <div className="row">
                <div className="col-xl-12 col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center order-media mb-4">
                                <img src="../../assets/img/messages-3.jpg"
                                    alt=""
                                />
                                <div>
                                    <h4 className="text-black mb-1 mt-1 font-w600">{order.customerName}</h4>
                                    <a className="btn btn-primary btn-sm" href="/react/demo/orderDetails">Customer</a>
                                </div>
                            </div>
                            <div className="imfo align-items-center mb-4 d-flex">
                                <i className="bi bi-phone-fill"></i>
                                <h5 className="mb-0 text-black ms-3 flex-grow-1">{order.customerMobile}</h5>
                            </div>
                            <div className="imfo align-items-center mb-4 d-flex">
                                <i className="bo bi-map-fill"></i>
                                <h5 className="mb-0 text-black ms-3  flex-1">
                                {order.address}
                                </h5>
                            </div>
                        </div>
                        <div className="card-footer">
                            <h4 className='text-black'>Note Order</h4>
                            <p className='text-small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                <Dropdown drop={"down"}> 
                    <Dropdown.Toggle variant="success"> 
                    Update Order
                    </Dropdown.Toggle> 
                    <Dropdown.Menu> 
                      <Dropdown.Item onClick={() => {updateOrder(orderId, 'confirmed')}}> 
                        Confirm
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(orderId, 'preparing')}}> 
                        Preparing 
                      </Dropdown.Item> 
                      <Dropdown.Item onClick={() => {updateOrder(orderId, 'ready')}}> 
                        Ready to Pickup 
                      </Dropdown.Item> 
                    </Dropdown.Menu> 
                  </Dropdown>
                </div>
                {/* <div className="col-xl-12 col-sm-6">
                    <div className="card">
                        <div className="card-header border-0"><h4 className="fs-18">Customer Favourite</h4></div>
                        <div className="card-body">
                            <div id="pieChart2">
                                <div id="chart">
                                    <div>
                                        <div id="apexcharts9i0dqad1" className="apexcharts-canvas apexcharts9i0dqad1 apexcharts-theme-light">
                                           
                                            <div className="apexcharts-legend"></div>
                                            <div className="apexcharts-tooltip apexcharts-theme-dark">
                                                <div className="apexcharts-tooltip-series-group">
                                                    <span className="apexcharts-tooltip-marker" ></span>
                                                    <div className="apexcharts-tooltip-text" >
                                                        <div className="apexcharts-tooltip-y-group"><span className="apexcharts-tooltip-text-y-label"></span><span className="apexcharts-tooltip-text-y-value"></span></div>
                                                        <div className="apexcharts-tooltip-goals-group"><span className="apexcharts-tooltip-text-goals-label"></span><span className="apexcharts-tooltip-text-goals-value"></span></div>
                                                        <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span className="apexcharts-tooltip-text-z-value"></span></div>
                                                    </div>
                                                </div>
                                                <div className="apexcharts-tooltip-series-group">
                                                    <span className="apexcharts-tooltip-marker" ></span>
                                                    <div className="apexcharts-tooltip-text" >
                                                        <div className="apexcharts-tooltip-y-group"><span className="apexcharts-tooltip-text-y-label"></span><span className="apexcharts-tooltip-text-y-value"></span></div>
                                                        <div className="apexcharts-tooltip-goals-group"><span className="apexcharts-tooltip-text-goals-label"></span><span className="apexcharts-tooltip-text-goals-value"></span></div>
                                                        <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span className="apexcharts-tooltip-text-z-value"></span></div>
                                                    </div>
                                                </div>
                                                <div className="apexcharts-tooltip-series-group" >
                                                    <span className="apexcharts-tooltip-marker" ></span>
                                                    <div className="apexcharts-tooltip-text">
                                                        <div className="apexcharts-tooltip-y-group"><span className="apexcharts-tooltip-text-y-label"></span><span className="apexcharts-tooltip-text-y-value"></span></div>
                                                        <div className="apexcharts-tooltip-goals-group"><span className="apexcharts-tooltip-text-goals-label"></span><span className="apexcharts-tooltip-text-goals-value"></span></div>
                                                        <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span className="apexcharts-tooltip-text-z-value"></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chart-items1">
                                <div className="d-flex align-items-end mt-2 py-3 justify-content-between">
                                    <span className="fs-14 font-w500">Pizza (40%)</span><span className="fs-14"><span className="pe-2"></span>25</span>
                                </div>
                                <div className="progress default-progress">
                                    <div className="progress-bar progress-animated" role="progressbar" ><span className="sr-only">40% Complete</span></div>
                                </div>
                            </div>
                            <div className="chart-items2">
                                <div className="d-flex align-items-end mt-2 py-3 justify-content-between">
                                    <span className="fs-14 font-w500">Juice (53%)</span><span className="fs-14"><span className="pe-2"></span>60</span>
                                </div>
                                <div className="progress default-progress">
                                    <div className="progress-bar progress-animated" role="progressbar" ><span className="sr-only">53% Complete</span></div>
                                </div>
                            </div>
                            <div className="chart-items3">
                                <div className="d-flex align-items-end mt-2 py-3 justify-content-between">
                                    <span className="fs-14 font-w500">Dessert (25%)</span><span className="fs-14"><span className="pe-2"></span>7</span>
                                </div>
                                <div className="progress default-progress">
                                    <div className="progress-bar progress-animated" role="progressbar" ><span className="sr-only">25% Complete</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        <div className='row'>
            <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body p-0">
                        <div className='card-title m-1'>{order.itemName + " - " + order.quantity}</div>
                            <div className="table-responsive order-list card-table">
                                <table className="table items-table table-responsive-md">
                                    <tbody>
                                        <tr>
                                            <th className="text-black font-w700 ">Items</th>
                                            <th className="text-black font-w700" >Qty</th>
                                            <th className="text-black font-w700 ">Price</th>
                                            <th className="my-0 text-black font-w700 wspace-no d-md-none d-lg-table-cell">Total Price</th>
                                        </tr>
                                        {
                                            (subItems && subItems.length) ? 
                                            subItems.map((subItem) => {
                                                if(subItemsData && subItemsData[subItem.id]) {
                                                    return (
                                                        <tr key={subItem.id}>
                                                            <td>
                                                                <div className="media table_flex d-flex align-items-start text-left">
                                                                    {/* <a href="/orderDetails"> */}
                                                                        <img
                                                                            style={{width: "100px"}}
                                                                            className="me-3 img-fluid"
                                                                        src={subItem?.image}
                                                                            alt="DexignZone"
                                                                        />
                                                                    {/* </a> */}
                                                                    <div className="media-body">
                                                                        <small className="mt-0 mb-1 font-w600"><a className="text-primary" href="/orderDetails">{subItem.name}</a></small>
                                                                        <h5 className="mt-0 mb-2 mb-sm-3"><a className="text-black" href="/ecom-product-grid">{subItem.description}</a></h5>
                                                                        <div className="star-review d-flex align-items-center fs-14">
                                                                            <i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i>
                                                                            <i className="bi bi-star-fill text-gray"></i><span className="ms-3 text-dark">(454 revies)</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><h5 className="my-0 font-w600">{subItemsData[subItem.id]}x</h5></td>
                                                            <td><h5 className="my-0 font-w600">${subItem.price}</h5></td>
                                                            <td className="d-md-none d-lg-table-cell"><h5 className="my-0 font-w600">${subItemsData[subItem.id] * subItem.price}</h5></td>
                                                        </tr>
                                                    )
                                                }
                                                
                                            })
                                            : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div  className='card_total_price'>
                                Total Price: ${order.totalAmount}
                            </div>
                        </div>
                    </div>
            </div>
            <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body p-0">
                        <div className='card-title m-1'>{order.itemName + " - " + order.quantity}</div>
                            <div className="table-responsive order-list card-table">
                                <table className="table items-table table-responsive-md">
                                    <tbody>
                                        <tr>
                                            <th className="text-black font-w700 ">Items</th>
                                            <th className="text-black font-w700 " >Qty</th>
                                            <th className="text-black font-w700 ">Price</th>
                                            <th className="my-0 text-black font-w700 wspace-no d-md-none d-lg-table-cell">Total Price</th>
                                        </tr>
                                        {
                                            (subItems && subItems.length) ? 
                                            subItems.map((subItem) => {
                                                if(subItemsData && subItemsData[subItem.id]) {
                                                    return (
                                                        <tr key={subItem.id}>
                                                            <td>
                                                                <div className="media table_flex d-flex align-items-start text-left">
                                                                    {/* <a href="/orderDetails"> */}
                                                                        <img
                                                                            style={{width: "100px"}}
                                                                            className="me-3 img-fluid"
                                                                        src={subItem?.image}
                                                                            alt="DexignZone"
                                                                        />
                                                                    {/* </a> */}
                                                                    <div className="media-body">
                                                                        <small className="mt-0 mb-1 font-w600"><a className="text-primary" href="/orderDetails">{subItem.name}</a></small>
                                                                        <h5 className="mt-0 mb-2 mb-sm-3"><a className="text-black" href="/ecom-product-grid">{subItem.description}</a></h5>
                                                                        <div className="star-review d-flex align-items-center fs-14">
                                                                            <i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i><i className="bi bi-star-fill text-danger"></i>
                                                                            <i className="bi bi-star-fill text-gray"></i><span className="ms-3 text-dark">(454 revies)</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><h5 className="my-0 font-w600">{subItemsData[subItem.id]}x</h5></td>
                                                            <td><h5 className="my-0 font-w600">${subItem.price}</h5></td>
                                                            <td className="d-md-none d-lg-table-cell"><h5 className="my-0 font-w600">${subItemsData[subItem.id] * subItem.price}</h5></td>
                                                        </tr>
                                                    )
                                                }
                                                
                                            })
                                            : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div  className='card_total_price'>
                                Total Price: ${order.totalAmount}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>

);
}

export default KitchenOrderDetails;
