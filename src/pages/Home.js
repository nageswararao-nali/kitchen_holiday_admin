import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCustomers, getTotalDrivers, getTotalUsers } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalUsers, totalCustomers, totalDrivers } = useSelector((state) => state.users)
  const { user } = useSelector((state) => state.auth)
  const loadDashboardData = async () => {
    await dispatch(getTotalUsers())
    await dispatch(getTotalCustomers())
    await dispatch(getTotalDrivers())
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
          <div class="card-title h5 text-left mt-5 mb-3 title_above">Today’s Status:<small className='mx-3'> 10th Aug 2024</small></div>
          <div className='d-flex justify-content-between'>
            <div class="card-title h5 text-left mt-4 mb-3">Normal Orders : 20</div>          
            <div class="card-title h5 text-left mt-4 mb-3">Subscription Orders : 35</div>   
          </div>       
          <div className='row'>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card widget-stat bg-danger">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary "><img src='assets/img/booking.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Today’s Total Orders</b></p>
                      <h4 class="mb-0 ">25</h4>
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
                      <h4 class="mb-0 ">20</h4>
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
                      <h4 class="mb-0 ">3</h4>
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
                      <h4 class="mb-0 ">2</h4>
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
                      <h4 class="mb-0 ">0</h4>
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
                      <h4 class="mb-0 ">25</h4>
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
                      <h4 class="mb-0 ">20</h4>
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
                      <h4 class="mb-0 ">10</h4>
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
                      <p class="mb-1"><b>Extra Items </b></p>
                      <h4 class="mb-0 ">15</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat bg-warning">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><img src='assets/img/items.png' width={36} /></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Dal    </b></p>
                      <h4 class="mb-0 ">2</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            

          </div>
        </div>
    
  );
}

export default Home;
