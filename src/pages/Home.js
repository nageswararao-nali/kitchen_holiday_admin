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
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">All Users</h5>
                    <div className="d-flex align-items-center" style={{justifyContent: 'center'}}>
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{totalUsers}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Customers</h5>
                    <div className="d-flex align-items-center" style={{justifyContent: 'center'}}>
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{totalCustomers}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Delivery Boys</h5>
                    <div className="d-flex align-items-center" style={{justifyContent: 'center'}}>
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{totalDrivers}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className='row'>
            <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">All Orders</h5>
                    <div className="d-flex align-items-center" style={{justifyContent: 'center'}}>
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>145</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Orders Pickedup</h5>
                    <div className="d-flex align-items-center" style={{justifyContent: 'center'}}>
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>145</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Orders Deliverd</h5>
                    <div className="d-flex align-items-center" style={{justifyContent: 'center'}}>
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>145</h6>
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
