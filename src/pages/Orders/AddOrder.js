import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getCategories, addItem, getItem, getItems } from '../../store/itemsSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers } from '../../store/usersSlice';
import { addOrder } from '../../store/orderSlice';

function AddOrder() {
    const { error, items } = useSelector((state) => state.items)
    const { users } = useSelector((state) => state.users)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [userId , setUserId] = useState('')
    const [itemId , setItemId] = useState('')
    

    const getItemsData = async () => {
        await dispatch(getItems())
    }
    useEffect(() => {
        if(!items.length) {
            getItemsData()
        }
    }, [items])

    const getUsersData = async () => {
        await dispatch(getUsers({user_type: 'customer', isActive: true}))
    }
    useEffect(() => {
        if(!users.length) {
            getUsersData()
        }
    }, [users])
    
    
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            let orderObj = {
                userId,
                itemId
            }
            await dispatch(addOrder(orderObj));
            navigate('/orders')
        }
        setValidated(true);
        
    };
  return (
    <div className='container'>
        <div className='row mx-5'>
            <Card>
                <Card.Title>Add Item</Card.Title>
                <Card.Body>
                    {
                        error ? 
                        <Row>
                            <p>Problem in adding Order!</p>
                        </Row>
                        : null
                    }
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {
                            (users && users.length) ?
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Col sm={2}>
                                    <Form.Label> User </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Select defaultValue={userId} value={userId} onChange={(e) => setUserId(e.target.value)} required >
                                        <option value="">Select User</option>
                                        {users.map((userData) => {
                                            return (<option key={userData.id} value={userData.id}>{userData.username}</option>)
                                        })}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            : null
                        }
                        {
                            (items && items.length) ?
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Col sm={2}>
                                    <Form.Label> Item </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Select defaultValue={itemId} value={itemId} onChange={(e) => setItemId(e.target.value)} required >
                                        <option value="">Select Item</option>
                                        {items.map((itemData) => {
                                            return (<option key={itemData.id} value={itemData.id}>{itemData.name}</option>)
                                        })}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            : null
                        }
                        <Button type="submit">Add</Button>
                    </Form>
                </Card.Body>
            </Card>
            
        </div>
    </div>
  );
}

export default AddOrder;
