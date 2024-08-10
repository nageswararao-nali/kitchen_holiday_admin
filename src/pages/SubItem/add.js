import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { addSubItem, getSubItem } from '../../store/itemsSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function AddSubItem(props) {
    const { itemId } = useParams()
    const { categories, error, subItem } = useSelector((state) => state.items)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [description , setDescription] = useState('')
    const [name , setName] = useState('')
    const [isVeg , setIsVeg] = useState(true)
    const [itemImage , setItemImage] = useState(null)
    const [quantity , setQuantity] = useState(0)
    
    const getItemData = async () => {
        await dispatch(getSubItem({id: itemId}))
    }
    
    useEffect(() => {
        if(itemId) {
            getItemData()
        }
    }, [itemId])

    useEffect(() => {
        if(subItem) {
            setName(subItem.name)
            setDescription(subItem.description)
            setIsVeg(subItem.isVeg)
        }
    }, [subItem])
    
    
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            let userObj = {
                name,
                description,
                itemImage,
                quantity,
                isVeg
            }
            await dispatch(addSubItem(userObj));
            navigate('/sub-items')
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
                            <p>Problem in adding Sub Item!</p>
                        </Row>
                        : null
                    }
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Col sm={2}>
                                <Form.Label> Sub Item Name </Form.Label>
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
                            <Form.Label> Description </Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Col sm={2}>
                            <Form.Label> Quantity </Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="quantity"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Col sm={2}>
                                <Form.Label> Image </Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control
                                    type="file"
                                    placeholder="image"
                                    onChange={(e) => setItemImage(e.target.files[0])}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                            <Col sm={2}></Col>
                            <Col sm={2}>
                                <Form.Check label="Is Veg?" checked={isVeg} onChange={(e) => setIsVeg(e.target.checked)} />
                            </Col>
                        </Form.Group>
                        <Button type="submit">Add</Button>
                    </Form>
                </Card.Body>
            </Card>
            
        </div>
    </div>
  );
}

export default AddSubItem;
