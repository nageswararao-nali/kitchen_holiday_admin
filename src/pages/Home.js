import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCustomers, getTotalDrivers, getTotalUsers } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { todayOrderDetails } from '../store/orderSlice';
import * as moment from 'moment'
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalUsers, totalCustomers, totalDrivers } = useSelector((state) => state.users)
  const { user } = useSelector((state) => state.auth)
  const [todayOrderDetailsData, setTodayOrderDetailsData] = useState({})
  const loadDashboardData = async () => {
    await dispatch(getTotalUsers())
    await dispatch(getTotalCustomers())
    await dispatch(getTotalDrivers())
    let todayOrderDetailsRes = await dispatch(todayOrderDetails({orderDate: moment().format('YYYY-MM-DD')}))
    if(todayOrderDetailsRes.payload.success) {
      setTodayOrderDetailsData(todayOrderDetailsRes.payload.data)
    }
  }
  useEffect(() => {
    console.log("user.user_type")
    console.log(user.user_type)
    if(user.user_type == 'kitchen') {
        navigate('/kitchen-orders')
    } else if(user.user_type == 'delivery boy') {
      console.log("navigating to orders")
        navigate('/delivery-orders')
    } else {
      loadDashboardData()
    }
  }, [])
  return (
        <div className='container dashboard'>
          {
            user.user_type == 'admin' ?
          
          <div className='row'>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card widget-stat bg-danger">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary "><i class="bi bi-people-fill"></i></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>All Users</b></p>
                      <h4 class="mb-0 ">{totalUsers}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-success">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/customer.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Customers</b></p>
                      <h4 class="mb-0 ">{totalCustomers}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-info">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-danger text-danger"><img src='assets/img/delivery-boy.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Delivery Boys</b></p>
                      <h4 class="mb-0 ">{totalDrivers}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-primary1">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-success"><img src='assets/img/booking.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>All Orders</b></p>
                      <h4 class="mb-0 ">145</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-warning">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary text-primary"><img src='assets/img/location.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Orders Pickedup</b></p>
                      <h4 class="mb-0 ">145</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-secondary">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary text-primary"><img src='assets/img/delivered.png' width={36}></img></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Orders Deliverd</b></p>
                      <h4 class="mb-0">145</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
             
          </div>
          : null
          }
          <div class="card-title h5 text-left mt-5 mb-3 title_above">Today’s Status:<small className='mx-3'> 10th Aug 2024</small></div>
          <div className='d-flex mb-3'>
            <div class="card-title h5 text-left mt-2 mb-3 mr-2 card_sub_title_bg">Normal Orders : {todayOrderDetailsData.noNormalOrders}</div>          
            <div class="card-title h5 text-left mt-2 mb-3 ml-2 card_sub_title_bg">Subscription Orders : {todayOrderDetailsData.noSubOrders}</div>   
          </div>       
          <div className='row'>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card widget-stat bg-danger">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary "><img src='assets/img/booking.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Today’s Total Orders</b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noOrders}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-success">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/booking.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Confirmed  </b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noConfirmed}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-info">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/location.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Ready to Pickup </b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noReadyPick}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-primary1">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/delivered.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Delivered </b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noDelivered}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-warning">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/cancel.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Cancelled    </b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noCancelled}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          <div class="card-title h5 text-left mt-5 mb-3 title_above">Today’s Order Menu</div>          
          <div className='row'>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card widget-stat bg-info">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary "><img src='assets/img/booking.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Total Meals</b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noOrders}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-primary1">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/meals.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Veg Meals</b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noVegOrders}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-danger">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/meals.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Non Veg Meals </b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noOFNonVegOrders}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-success">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/meals.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Sub Items </b></p>
                      <h4 class="mb-0 ">{todayOrderDetailsData.noSubItems}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-12 col-md-12">
                {
                  (todayOrderDetailsData.subData && Object.keys(todayOrderDetailsData.subData) && Object.keys(todayOrderDetailsData.subData).length) ?
                  <div className='row'>
                    {
                      Object.keys(todayOrderDetailsData.subData).map((itemId) => {
                        return (
                          <div className='col-md-3'>
                            <div className="card sales-card widget-stat bg-warning">
                              <div className="card-body p-4">
                                <div className='media ai-icon justify-content-center'>
                                  <div class="media-body">
                                    <h5 class="mb-0 ">{todayOrderDetailsData.subData[itemId].name} : {todayOrderDetailsData.subData[itemId].quantity}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  : null
                }
            </div>
          </div>
        </div>
    
  );
}

export default Home;
