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
            <div className="card">
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
            </div>
        </section>
        
    </Layout>
    
  );
}

export default Home;
