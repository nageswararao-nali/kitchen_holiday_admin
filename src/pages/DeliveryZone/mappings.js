import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getCategories, addItem, getItems, getSubItems, addItemMapping, itemMappingsData } from '../../store/itemsSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers } from '../../store/usersSlice';
import { getZones, addZoneMapping, zoneMappingsData } from '../../store/subscriptionsSlice';

function ZoneMapping(props) {
    // const {itemId} = useParams()
    const dispatch = useDispatch();
    const { zones, mappings } = useSelector((state) => state.subscriptions)
    const { users } = useSelector((state) => state.users)
    const [userId, setUserId] = useState(null)
    const [validated, setValidated] = useState(false);
    const [zipcodes, setZipcodes] = useState([]);
    const [mappedZips, setMappedZips] = useState([])

    const getUsersData = async () => {
      await dispatch(getUsers({user_type: 'delivery boy'}))
    }

    const getZonesData = async () => {
      await dispatch(getZones({}))
    }
    useEffect(() => {
            getUsersData()
            // getZonesData()
    }, [])

    const getItemMappings = async(e) => {
        // console.log("called map items", e.target.value)
        setUserId(e.target.value)
        await dispatch(zoneMappingsData({userId: e.target.value}));
        setTimeout(() => {
            getZonesData()
        }, 1000)
    }

    
    useEffect(() => {
        if(mappings.length && mappings[0].zipcodes) {
            console.log("mappings ....")
            console.log(mappings[0].zipcodes.split(","))
            setMappedZips(mappings[0].zipcodes.split(","))
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
            setZipcodes([...zipcodes, value])
        }

        // Case 2  : The user unchecks the box
        else {
            setZipcodes(zipcodes.filter(
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
            console.log(userId)
            console.log(zipcodes)
            let userObj = {
                userId,
                zipcodes: zipcodes.join(",")
            }
            await dispatch(addZoneMapping(userObj));
            // navigate('/items')
            setUserId(null)
            setZipcodes([])
        }
        setValidated(true);
        
    };
  return (
    <div className='container-fluid'>
        <div className='row mx-5'>
            <Card className='card_new'>
                <div class="card-header  mb-3">
                    <div class="card-title h5">Delivery Boy Mapping</div>
                    
                </div>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {
                            (users && users.length) ?
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Col sm={2}>
                                    <Form.Label className='form_label'> Delivery Boy </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Select defaultValue={userId} value={userId} onChange={(e) => getItemMappings(e)} required >
                                        <option value="">Select Delivery Boy</option>
                                        {users.map((userData) => {
                                            return (<option key={userData.id} value={userData.id}>{userData.fName + " " + userData.lName}</option>)
                                        })}
                                    </Form.Select>
                                    {
                                        (mappings &&  mappings[0]) ? 
                                        <div className='m-3'>
                                            <span>Selected Zones: {mappings[0].zipcodes}</span>
                                        </div>
                                        : null
                                    }
                                    {
                                    (zones && zones.length) ?
                                    <Row>
                                        <div className='d-flex flex-wrap mt-2 mx-2'>
                                        {
                                        zones.map((zone) => {
                                            return (
                                            <Form.Group className="mb-1 col-md-3 " controlId="formHorizontalCheck">
                                                <Col className='m-2 text-left'>
                                                    <Form.Check data={mappedZips.indexOf(zone.zipcode) > -1} checked={mappedZips.indexOf(zone.zipcode) > -1} name="subitem" label={zone.name + " - " + zone.zipcode} value={zone.zipcode} onChange={handleChange} />
                                                </Col>
                                            </Form.Group>
                                        )
                                    })
                                }
                              </div>
                            </Row>
                            : null
                        }
                                </Col>
                            </Form.Group>
                            : null
                        }
                        
                        <Row></Row>
                        
                        
                        <Button type="submit">Add</Button>
                        {/* <hr></hr>
                        <Row>
                        <Col sm={2}>
                            <Form.Label className='form_label'> Delivery1 Boy </Form.Label>
                        </Col>
                        {
                            (zones && zones.length) ?
                            <Col sm={10}>
                                 <div className='d-flex flex-wrap mt-2 mx-2'>
                                {
                                    zones.map((zone) => {
                                        return (
                                            <Form.Group className="mb-1 col-md-3 " controlId="formHorizontalCheck">
                                                <Col className='m-2 text-left'>
                                                    <Form.Check data={zones.indexOf(zone.id) > -1} name="subitem" label={zone.name} value={zone.name} onChange={handleChange} />
                                                </Col>
                                            </Form.Group>
                                        )
                                    })
                                }
                              </div>
                            </Col>
                            : null
                        }
                        </Row>
                        
                        <Button type="submit">Delete</Button> */}
                    </Form>
                </Card.Body>
            </Card>
            
        </div>
    </div>
  );
}

export default ZoneMapping;
