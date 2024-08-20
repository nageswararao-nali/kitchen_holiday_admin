import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isAuthenticated, error, user } = useSelector((state) => state.auth)
    const [userType, setUserType] = useState('')
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [isError, setIsError] = useState(false)
    const loginAction = async () => {
        if(username && password) {
            await dispatch(login({username, password, userType}))
        } else {
            setIsError(true)
        }
    }
    useEffect(() => {
        if(isAuthenticated) {
            if(user.user_type == 'kitchen') {
                navigate('/kitchen-orders')
            } else if(user.user_type == 'delivery boy') {
                navigate('/delivery-orders')
            } else {
                navigate('/')
            }
            
        }
    }, [isAuthenticated])
  return (
    <Layout>
        <section className='section login-form' style={{}}>
           {/*  <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    {
                        error ? 
                        <div className="col-md-12 pd5" style={{color: 'red'}}>{error}</div>
                        : null
                    }
                    <div className="col-md-12 pd5">
                        <div className="form-floating">
                            <input type="test" className="form-control" id="floatingEmail" placeholder="username" onChange={(e) => {
                                setUsername(e.target.value); 
                                e.target.value ? setIsError(false) : setIsError(true);
                                }}
                            />
                            <label htmlFor="floatingEmail">Username</label>
                            {isError ? <span className='error'>Please Enter Username</span> : null}
                        </div>
                    </div>
                    <div className="col-md-12 pd5">
                        <div className="form-floating">
                            <input type="test" className="form-control" id="floatingEmail" placeholder="password" onChange={(e) => {
                                setPassword(e.target.value); 
                                e.target.value ? setIsError(false) : setIsError(true);
                                }}
                            />
                            <label htmlFor="floatingEmail">Password</label>
                            {isError ? <span className='error'>Please Enter Password</span> : null}
                        </div>
                    </div>
                    <div className="col-md-12 pd5">
                        <div className="form-floating">
                            <select value={userType} className="form-control" onChange={(e) => {
                                setUserType(e.target.value); 
                                e.target.value ? setIsError(false) : setIsError(true);
                                }}>
                            <option value="">User Type</option>
                            <option value="admin">Admin</option>
                            <option value="delivery boy">Delivery Boy</option>
                            <option value="kitchen">Kitchen</option>
                            <label htmlFor="floatingEmail">User Type</label>
                            </select>
                            {isError ? <span className='error'>Please Select User Type</span> : null}
                        </div>
                    </div>
                    
                    <div className="text-center pd5">
                        <button onClick={() => loginAction()} className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div> */}

            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 col-md-7 box-skew d-flex">
                        <div class="authincation-content">
                            <div class="mb-4"><h3 class="mb-1 font-w600">Welcome to Kitchen Holiday</h3><p class="">Sign in by entering information below</p></div>
                            {
                        error ? 
                        <div className="col-md-12 pd5" style={{color: 'red'}}>{error}</div>
                        : null
                    }
                    <div className="col-md-12 pd5 form_modal ">
                        <div className="form-floating">
                            <input type="test" className="form-control" id="floatingEmail" placeholder="username" onChange={(e) => {
                                setUsername(e.target.value); 
                                e.target.value ? setIsError(false) : setIsError(true);
                                }}
                            />
                            <label htmlFor="floatingEmail">Username</label>
                            {isError ? <span className='error d-block text-left'>Please Enter Username</span> : null}
                        </div>
                    </div>
                    <div className="col-md-12 pd5 form_modal mt-3">
                        <div className="form-floating">
                            <input type="test" className="form-control" id="floatingEmail" placeholder="password" onChange={(e) => {
                                setPassword(e.target.value); 
                                e.target.value ? setIsError(false) : setIsError(true);
                                }}
                            />
                            <label htmlFor="floatingEmail">Password</label>
                            {isError ? <span className='error  d-block text-left'>Please Enter Password</span> : null}
                        </div>
                    </div>
                    
                    <div className="text-center pd5 mt-2">
                        <button onClick={() => loginAction()} className="btn btn-primary w-100 mt-2 py-3 loginbtn">Login</button>
                    </div>
                    </div></div>
                    <div class="col-lg-6 col-md-5 d-flex box-skew1">
                        <div class="inner-content align-self-center">
                            <img src='assets/img/logo_with_leaves.png' width={200} className='img-fluid'/>
                            <h2 class="m-b10 text-white">Kitchen Holiday</h2><p class="m-b40 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div></div></div></div>
        </section>
        
    </Layout>
    
  );
}

export default Home;
