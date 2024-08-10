import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

function Otp() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isAuthenticated, mobileNumber, userToken } = useSelector((state) => state.auth)
    const [otp, setOtp] = useState(null)
    const [isError, setIsError] = useState(false)
    const verifyAction = async () => {
        await dispatch(login({mobileNumber, otp}))
    }
    useEffect(() => {
        if(isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])
    useEffect(() => {
        if(!mobileNumber) {
            navigate('/login')
        }
    }, [mobileNumber])
  return (
    <Layout>
        <section className='section login-form' style={{}}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Verify Mobile</h5>
                    <div className="col-md-12 pd5">
                        <div className="form-floating">
                            <input type="test" className="form-control" id="floatingEmail" placeholder="Otp" 
                                onChange={(e) => {
                                    setOtp(e.target.value); 
                                    e.target.value ? setIsError(false) : setIsError(true);
                                    }}
                            />
                            <label htmlFor="floatingEmail">Otp</label>
                        </div>
                        {isError ? <span className='error'>Please Enter Mobile Number</span> : null}
                    </div>
                    
                    <div className="text-center pd5">
                        <button onClick={() => verifyAction()} className="btn btn-primary">Verify</button>
                    </div>
                </div>
            </div>
        </section>
        
    </Layout>
    
  );
}

export default Otp;
