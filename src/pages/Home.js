import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCustomers, getTotalDrivers, getTotalUsers } from '../store/usersSlice';
function Home() {
  const dispatch = useDispatch();
  const { totalUsers, totalCustomers, totalDrivers } = useSelector((state) => state.users)
  const loadDashboardData = async () => {
    await dispatch(getTotalUsers())
    await dispatch(getTotalCustomers())
    await dispatch(getTotalDrivers())
  }
  useEffect(() => {
    loadDashboardData()
  }, [])
  return (
        <div className='container dashboard'>
          <div className='row'>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary text-primary"><svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>All Users</b></p>
                      <h4 class="mb-0 text-left">{totalUsers}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-warning text-warning"><svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Customers</b></p>
                      <h4 class="mb-0 text-left">{totalCustomers}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-danger text-danger"><svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Delivery Boys</b></p>
                      <h4 class="mb-0 text-left">{totalDrivers}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-success text-success"><svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>All Orders</b></p>
                      <h4 class="mb-0 text-left">145</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary text-primary"><svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Orders Pickedup</b></p>
                      <h4 class="mb-0 text-left">145</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card widget-stat">
                <div className="card-body p-4">
                  <div className='media ai-icon'>
                    <span class="me-3 bgl-primary text-primary"><svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>                    
                    <div class="media-body">
                      <p class="mb-1"><b>Orders Deliverd</b></p>
                      <h4 class="mb-0 text-left">145</h4>
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
