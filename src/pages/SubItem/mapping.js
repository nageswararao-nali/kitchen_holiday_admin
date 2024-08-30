import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getCategories, addItem, getItems, getSubItems, addItemMapping, itemMappingsData } from '../../store/itemsSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function ItemMapping(props) {
    // const {itemId} = useParams()
    const { items, subItems, mappings } = useSelector((state) => state.items)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [itemId, setItemId] = useState(null)
    const [subItemIds, setSubItemIds] = useState([])

    const getItemsData = async () => {
        await dispatch(getItems())
        
    }
    useEffect(() => {
        getItemsData()
    }, [])

    const getItemMappings = async(e) => {
        console.log("called map items", e.target.value)
        setItemId(e.target.value)
        await dispatch(itemMappingsData({itemId: e.target.value}));
        setTimeout(() => {
            getSubItemsData()
        }, 1000)
        
    }

    const getSubItemsData = async () => {
        await dispatch(getSubItems())
    }
    useEffect(() => {
        if(mappings.length && mappings[0].subItemIds) {
            console.log("am inside ...", JSON.parse(mappings[0].subItemIds))
            console.log("am inside 777...", (mappings[0].subItemIds))
            setSubItemIds(JSON.parse(mappings[0].subItemIds))
        }
        
    }, [mappings])
    

    // useEffect(() => {
    //     if(itemId) {
    //         // getItemData()
    //     }
    // }, [itemId])

    // useEffect(() => {
    //     if(item) {
    //         setName(item.name)
    //         setDescription(item.description)
    //         setIsVeg(item.isVeg)
    //         setPrice(item.price)
    //         setCategory(item.category)
    //     }
    // }, [item])
    
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;

        // Case 1 : The user checks the box
        if (checked) {
            setSubItemIds([...subItemIds, value])
        }

        // Case 2  : The user unchecks the box
        else {
            setSubItemIds(subItemIds.filter(
                (e) => e !== value
            ))
        }
    };
    
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            console.log(itemId)
            console.log(subItemIds)
            let userObj = {
                itemId,
                subItemIds
            }
            await dispatch(addItemMapping(userObj));
            // navigate('/items')
            setItemId(null)
            setSubItemIds([])
        }
        setValidated(true);
        
    };
  return (
    <div className='container-fluid'>
        <div className='row mx-5'>
            <Card>
                <div class="card-header  mb-3">
                    <div class="card-title h5">Item Mapping</div>
                    
                </div>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {
                            (items && items.length) ?
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Col sm={2}>
                                    <Form.Label> Sub Item </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Select defaultValue={itemId} value={itemId} onChange={(e) => getItemMappings(e)} required >
                                        <option value="">Select Item</option>
                                        {items.map((itemData) => {
                                            return (<option key={itemData.id} value={itemData.id}>{itemData.name}</option>)
                                        })}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            : null
                        }
                        {
                            (subItems && subItems.length) ?
                            <Row>
                                {
                                    subItems.map((subItem) => {
                                        return (
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                                                <Col sm={2}></Col>
                                                <Col sm={2}>
                                                    <Form.Check data={subItemIds.indexOf(subItem.id) > -1} name="subitem" label={subItem.name} value={subItem.id} onChange={handleChange} />
                                                </Col>
                                            </Form.Group>
                                        )
                                    })
                                }
                            </Row>
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

export default ItemMapping;
