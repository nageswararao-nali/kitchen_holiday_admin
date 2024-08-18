import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription } from '../../store/subscriptionsSlice';
import { useNavigate } from 'react-router-dom';

function AddSubscription() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.users)
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [days, setDays] = useState('');
    const [isVeg , setIsVeg] = useState(true)

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
            name,
            description,
            price,
            days,
            isVeg
        }
        await dispatch(addSubscription(userObj));
        navigate('/subscriptions')
    }
    setValidated(true);
    
  };
    
  return (
    <div className='container'>
        <div className='row mx-5'>
            <Row className='mb-3 mt-3'>
                <h2>Add Subscription</h2>
            </Row>
            {
                error ? 
                <Row>
                    <p>Problem in adding Subscription!</p>
                </Row>
                : null
            }
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                        <Form.Label> Subscription Name </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" placeholder="Name" required 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                        <Form.Label> Subscription Short Name </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" placeholder="Short Name" required 
                            onChange={(e) => setShortName(e.target.value)}
                            value={shortName}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                        <Form.Label> Description </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" placeholder="description" required 
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                    <Form.Label> No. of Days </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="number"
                            placeholder="No. of Days"
                            onChange={(e) => setDays(e.target.value)}
                            value={days}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                    <Form.Label> Price </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                    <Col sm={2}></Col>
                    <Col sm={2}>
                        <Form.Check label="Is Veg?" checked={isVeg} onChange={(e) => setIsVeg(e.target.checked)} />
                    </Col>
                </Form.Group>
                <Button type="submit">Add subscription</Button>
            </Form>
        </div>
    </div>
  );
}

export default AddSubscription;
