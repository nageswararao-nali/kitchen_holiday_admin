import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.users)
    const [validated, setValidated] = useState(false);
    const [userType, setUserType] = useState('customer');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    console.log(form)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        setValidated(true);
        event.preventDefault();
        let userObj = {
            email,
            mobile,
            username,
            password,
            user_type: userType
        }
        await dispatch(addUser(userObj));
        navigate('/users')
    }
    setValidated(true);
    
  };
    
  return (
    <div className='container'>
        <div className='row mx-5'>
            <Row className='mb-3 mt-3'>
                <h2>Add User</h2>
            </Row>
            {
                error ? 
                <Row>
                    <p>Problem in adding User!</p>
                </Row>
                : null
            }
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                        <Form.Label> Email </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control 
                            type="email" placeholder="Email" required 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                        <Form.Label> Mobile </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" placeholder="Mobile" required 
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                    <Form.Label> Username </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Col sm={2}>
                        <Form.Label> Password </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalUser">
                    <Col sm={2}>
                        <Form.Label> User Type </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Select defaultValue={userType} onChange={(e) => setUserType(e.target.value)} required >
                            <option value="">User Type</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            <option value="delivery boy">Delivery Boy</option>
                            <option value="kitchen">Kitchen</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Button type="submit">Add User</Button>
            </Form>
        </div>
    </div>
  );
}

export default AddUser;
