import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getCategories, addItem, getItem } from '../../store/itemsSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function AddItem(props) {
    const { itemId } = useParams()
    const { categories, error, item } = useSelector((state) => state.items)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [category , setCategory] = useState('')
    const [description , setDescription] = useState('')
    const [name , setName] = useState('')
    const [isVeg , setIsVeg] = useState(false)
    const [itemImage , setItemImage] = useState(null)
    const [price , setPrice] = useState(null)

    const getCategoriesData = async () => {
        await dispatch(getCategories())
    }
    const getItemData = async () => {
        await dispatch(getItem({id: itemId}))
    }
    
    useEffect(() => {
        if(!categories.length) {
            getCategoriesData()
        }
    }, [categories])

    useEffect(() => {
        if(itemId) {
            getItemData()
        }
    }, [itemId])

    useEffect(() => {
        if(item) {
            setName(item.name)
            setDescription(item.description)
            setIsVeg(item.isVeg)
            setPrice(item.price)
            setCategory(item.category)
        }
    }, [item])
    
    
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            const formData = new FormData();
            formData.append('itemImage', itemImage)
            formData.append('name', name)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('isVeg', isVeg)
            formData.append('price', price)
            // let userObj = {
            //     category,
            //     name,
            //     description,
            //     itemImage,
            //     isVeg,
            //     price
            // }
            await dispatch(addItem(formData));
            navigate('/items')
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
                            <p>Problem in adding Item!</p>
                        </Row>
                        : null
                    }
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {
                            (categories && categories.length) ?
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Col sm={2}>
                                    <Form.Label> Category </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Select defaultValue={category} value={category} onChange={(e) => setCategory(e.target.value)} required >
                                        <option value="">Select Category</option>
                                        {categories.map((categoryData) => {
                                            return (<option key={categoryData.id} value={categoryData.id}>{categoryData.name}</option>)
                                        })}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            : null
                        }
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Col sm={2}>
                                <Form.Label> Name </Form.Label>
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
                            <Form.Label> Price </Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
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

export default AddItem;
