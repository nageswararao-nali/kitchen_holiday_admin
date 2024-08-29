import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { addZone } from '../../store/subscriptionsSlice';
import GoogleMapComponent from './DrawingMapComponent'

function AddZone() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.users)
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState('');
    

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
            coordinates
        }
        await dispatch(addZone(userObj));
        // navigate('/delivery-zone')
    }
    setValidated(true);
    
  };
    
  return (
    <div className='container'>
        <div className='row mx-5'>
            <Row className='mb-3 mt-3'>
                <h2>Add Zone</h2>
            </Row>
            {
                error ? 
                <Row>
                    <p>Problem in adding Zone!</p>
                </Row>
                : null
            }
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col sm={2}>
                        <Form.Label> Zone Zipcode </Form.Label>
                    </Col>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" placeholder="Zone Name" required 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Col>
                </Form.Group>
                {/* <Row className='mb-5'>
                    <GoogleMapComponent />
                </Row> */}
                <Button type="submit">Add Zone</Button>
            </Form>
        </div>
    </div>
  );
}

export default AddZone;
