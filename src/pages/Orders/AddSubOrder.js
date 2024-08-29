import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getCategories, addItem, getItem, getItems, itemMappingsData, getSubItems } from '../../store/itemsSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, Card, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserAddresses, getUsers } from '../../store/usersSlice';
import { addOrder, addUserOrder } from '../../store/orderSlice';
import { getSubscriptions, getOrderDates } from '../../store/subscriptionsSlice';
import { getDeliverySlots } from '../../store/adminSlice';

function AddSubOrder() {
    const { error, items, subItems } = useSelector((state) => state.items)
    const { users, userAddresses } = useSelector((state) => state.users)
    const { subscriptions, lastSubDate } = useSelector((state) => state.subscriptions)
    const { deliverySlots } = useSelector((state) => state.admin)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [validated, setValidated] = useState(false);
    const [userId , setUserId] = useState('')
    const [itemId , setItemId] = useState('')
    const [mappings , setMappings] = useState([])
    const [showPopup, setShow] = useState(false);
    const [selectedSubId, setSelectedSubId] = useState(null);
    const [extraItemCountData, setExtraItemCountData] = useState({});
    const [extraSubItems, setExtraSubItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedItem, setSelectedItem] = useState({})
    const [selectedSubscription, setSelectedSubscription] = useState(null)
    const [selectedPlan, setSelectedPlan] = useState('');
    const [plan, setPlan] = useState();
    const [deliverySlot, setDeliverySlot] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [addressId, setAddressId] = useState(0)
    const [address, setAddress] = useState()
    const [newAddress, setNewAddress] = useState(false)

    const getItemsData = async () => {
        await dispatch(getItems())
        await dispatch(getSubItems())
        await dispatch(getDeliverySlots())
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
    
    

    const getSubscriptionsData = async () => {
      await dispatch(getSubscriptions({}))
    }
    useEffect(() => {
        if(!subscriptions.length) {
          getSubscriptionsData()
        }
    }, [subscriptions])

    
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            event.preventDefault();
            let orderObj = {
                userId: userId,
                itemId: itemId,
                itemName: selectedItem.name,
                subItems: JSON.parse(mappings[0].subItemIds),
                quantity: quantity,
                addressId: addressId,
                totalAmount: totalPrice,
                customerName: address.fName + " " + address.lName,
                customerMobile: address.mobile,
                address: address.address + ", " + address.address1 + ", " + address.state + ", " + address.zipcode,
                zipcode: address.zipcode,
                startDate: startDate,
                selectedPlan: selectedPlan,
                deliverySlot: deliverySlot,
                status: 'new',
                orderType: 'subscription',
                extraSubItems: extraSubItems,
                noOrders: selectedSubscription.days,
                subscriptionId: selectedSubscription.id,
                latitude: address.latitude,
                longitude: address.longitude
            }
            console.log("oreder req")
            console.log(orderObj)
            await dispatch(addUserOrder(orderObj))
            navigate('/sub-orders')
        }
        setValidated(true);
        
    };

    const selectItem = async () => {
        let mps = await dispatch(itemMappingsData({itemId: itemId}))
        // console.log("mps", selectedItem.id)
        console.log(mps)
        if(mps.payload) {
            setMappings(mps.payload.data.items)
        }
    }
    useEffect(() => {
        selectItem()
    }, [itemId])
    const handleClose = async () => {
        setShow(false);
        let extraSubData = []
        console.log("extraSubItems")
        console.log(extraSubItems)
        let extraSubItemsData = Object.keys(extraItemCountData)
        console.log(extraItemCountData)
        if(extraSubItemsData.length) {
            // console.log("hhhh")
            // extraSubItemsData.map((extraSubItem) => {
            let totoalPrice = selectedSubscription ? selectedSubscription.price : selectedItem.price
            for(let extraSubItem of extraSubItemsData){
                // console.log(extraSubItem)
                let subItemData = subItems.filter((subItem) => {
                    return subItem.id == extraSubItem
                })[0]
                if(extraItemCountData[extraSubItem]) {
                    console.log("data ", extraItemCountData[extraSubItem], totoalPrice)
                    totoalPrice = totoalPrice + (subItemData.price * extraItemCountData[extraSubItem])
                    extraSubData.push({itemId: extraSubItem, quantity: extraItemCountData[extraSubItem]})
                    // setExtraSubItems([...extraSubItems, {itemId: extraSubItem, quantity: extraItemCountData[extraSubItem]}])
                    
                } else {
                    totoalPrice = totoalPrice - (subItemData.price * 0)
                    // setExtraSubItems([...extraSubItems, {itemId: extraSubItem, quantity: 0}])
                }
            }
            setExtraSubItems(extraSubData)
            console.log("totoalPrice")
            console.log(totoalPrice)
            setTotalPrice(totoalPrice*quantity)
            setPrice(totoalPrice)
        }
    }

    const updateItemQuantity = async(num, itemId) => {
        // console.log(extraItemCountData)
        let extraItemCount = extraItemCountData
        if(!extraItemCount[itemId]) {
            extraItemCount[itemId] = 0
        }
        extraItemCount[itemId] = (extraItemCount[itemId]+num) > 0 ? (extraItemCount[itemId]+num) : 0;
        // console.log(extraItemCount)
        extraItemCount = JSON.parse(JSON.stringify(extraItemCount))
        setExtraItemCountData(extraItemCount)
      }
    const setItemIdData = async (itemIdD) => {
        let selectedItem = items.filter((sub) => {
            return sub.id == itemIdD
        })[0]
        setItemId(itemIdD)
        setSelectedItem(selectedItem)
    }
    const setSelectedSubIdData = async (itemIdD) => {
        let selectedItem = subscriptions.filter((sub) => {
            return sub.id == itemIdD
        })[0]
        setSelectedSubId(itemIdD)
        setSelectedSubscription(selectedItem)
    }
    const handleShow = () => {
        setShow(true)
    }
    const updateQuantity = async(num) => {
        console.log(price)
        let qty = quantity+num;
        setQuantity(qty > 0 ? qty : 0)
        setTotalPrice(price*qty)
        
      }
    const getLastOrderDate = async () => {
        if(selectedPlan && startDate) {
            let reqObj ={
                noOrders: selectedSubscription.days,
                startDate,
                selectedPlan,
            }
            await dispatch(getOrderDates(reqObj))
        }
    }
    const updatePlan = async (num) => {
        let index = selectedPlan.indexOf(num)
        if(index > -1) {
            let sp = selectedPlan.splice(index, 1);
            setSelectedPlan(sp)
          } else {
            setSelectedPlan([...selectedPlan, num])
          }
        console.log(selectedPlan)
      }
    const setUserIdData = async (usrId) => {
        setUserId(usrId)
        let addressesRes = await dispatch(getUserAddresses({userId: usrId}))
        console.log(addressesRes.payload)
    }
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
                                    <Form.Select defaultValue={userId} value={userId} onChange={(e) => setUserIdData(e.target.value)} required >
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
                                    <Form.Select defaultValue={itemId} value={itemId} onChange={(e) => setItemIdData(e.target.value)} required >
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
                            (subscriptions && subscriptions.length) ?
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Col sm={2}>
                                    <Form.Label> Subscriptions </Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Select defaultValue={selectedSubId} value={selectedSubId} onChange={(e) => setSelectedSubIdData(e.target.value)} required >
                                        <option value="">Select Subscription</option>
                                        {subscriptions.map((subscriptionData) => {
                                            return (<option key={subscriptionData.id} value={subscriptionData.id}>{subscriptionData.name}</option>)
                                        })}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            : null
                        }
                        <Row>
                            { itemId ?
                        <div class="cart-item ">
                            <div className='d-md-flex justify-content-between'>
                                
                                    <div class="px-3 my-3">
                                        <a class="cart-item-product" href="#">
                                            <div class="cart-item-product-thumb"><img src={selectedItem.image} alt="Product"/></div>
                                            <div class="cart-item-product-info">
                                                <h4 class="cart-item-product-title">{selectedItem.name} ({selectedItem.shortName})</h4>
                                                <span className='add_extra' onClick={handleShow}><strong>+ Add Extra</strong></span>
                                            </div>
                                        </a>
                                    </div> 
                                    
                                
                                {
                                    selectedSubscription ?
                                    <div class="px-3 my-3 text-center">
                                        <div class="cart-item-label">Choose your plan</div>
                                        <div class="count-input position-relative">
                                            <span className='position-absolute end-0 top-50 translate-middle d-arrow'><i class="bi bi-chevron-down"></i></span>
                                            <select class="form-control" onChange={(e) => {setPlan(e.target.value); setSelectedPlan(e.target.value); getLastOrderDate()}}>
                                                <option value="">Select Plan</option>
                                                <option value={[1,2,3,4,5]}>Mon-Fri</option>
                                                <option value={[1,2,3,4,5,6]}>Mon-Sat</option>
                                                <option value={[]}>Custom</option>
                                            </select>
                                        </div>
                                    
                                    </div>
                                    : null
                                }
                            
                            
                            <div class="px-3 my-3 text-center">
                                <div class="cart-item-label">Quantity</div>
                                <div className="added_count" ><span className="count_minus" onClick={() => updateQuantity(-1)}>-</span><span className="count_total">{quantity}</span><span className="count_plus" onClick={() => updateQuantity(1)}>+</span></div>
                            </div>
                            <div class="px-3 my-3 text-center">
                                <div class="cart-item-label">Subtotal</div><span class="text-xl font-weight-medium">${totalPrice}</span>
                            </div>
                            </div>
                            <div className='d-md-flex'>
                                {
                                    (deliverySlots && deliverySlots.length) ?
                                    <div class="px-3 my-3 text-center">
                                        <div class="cart-item-label">Choose Delivery Slot</div>
                                        <div class="count-input position-relative">
                                            <span className='position-absolute end-0 top-50 translate-middle d-arrow'><i class="bi bi-chevron-down"></i></span>
                                            <select class="form-control" onChange={(e) => {setDeliverySlot(e.target.value);}}>
                                                <option value="">Select Delivery Slot</option>
                                                {
                                                    deliverySlots.map((deliverySlot) => {
                                                        return (<option value={deliverySlot.id}>{deliverySlot.name}</option>)
                                                    })
                                                }
                                                
                                            </select>
                                        </div>
                                    
                                    </div>
                                    : null
                                }
                                {
                                    selectedSubscription ? 
                                    <div className='px-3 my-3 text-center'>
                                        <div class="cart-item-label">Start Date</div>
                                        <div class="count-input position-relative">
                                            <DatePicker selected={startDate} onChange={(date) => {setStartDate(date); getLastOrderDate()}} />
                                        </div>
                                    </div>
                                    : null
                                }
                                {
                                    lastSubDate ? 
                                    <div className='px-3 my-3 text-center'>
                                        <div class="cart-item-label">End Date</div>
                                        <div class="count-input position-relative">
                                            {lastSubDate}
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                            
                            
                            {
                                (plan != undefined && plan.length == 0) ? 
                            
                            <div className='custom_dates_wrap text-center'>
                                <span className='d-block'>Days of Week:</span>
                                <div className='custom_dates mb-3'>
                                    <Form> 
                                    {['checkbox'].map((type) => (
                                    <div key={`default-${type}`}  >
                                    <Form.Check
                                            inline
                                            label="Monday"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                            onChange={() => updatePlan(1)}
                                        />
                                        <Form.Check
                                            inline
                                            label="Tuesday"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            onChange={() => updatePlan(2)}
                                        />
                                        <Form.Check
                                            inline            
                                            label="Wednessday"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={() => updatePlan(3)}
                                        />
                                        <Form.Check
                                            inline            
                                            label="Thursday"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={() => updatePlan(4)}
                                        />
                                        <Form.Check
                                            inline            
                                            label="Friday"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={() => updatePlan(5)}
                                        />
                                        <Form.Check
                                            inline            
                                            label="Saturday"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={() => updatePlan(6)}
                                        />
                                        <Form.Check
                                            inline            
                                            label="Sunday"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={() => updatePlan(7)}
                                        />
                                        </div>
                                    ))}
                                </Form>
                            </div>
                            </div> : null
                            }
                        </div>
                        : null
                        }
                        </Row>
                        <Row>
                        {
                                userAddresses.length ?
                                <div className="row">
                                   
                                    {
                                        userAddresses.map((userAddress) => {
                                            return (
                                                <div className="row" onClick={() => {setAddressId(userAddress.id); setAddress(userAddress); setNewAddress(false)}}>
                                                    {/* {userAddress.address} */}
                                                    <div className="container">
                                                        <div className="address_block">
                                                        <Form>
                                                            {['radio'].map((type) => (
                                                                <div key={`inline-${type}`} className="mb-3">
                                                                    <div className="d-flex">
                                                                    <Form.Check
                                                                        inline
                                                                        name="group1"
                                                                        type={type}
                                                                        id={`inline-${type}-1`}
                                                                    />
                                                                    <address>
                                                                    {userAddress.fName + " " + userAddress.lName},<br />
                                                                        {userAddress.address},<br></br> {userAddress.address1}, <br></br>{userAddress.zipcode} </address>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            </Form>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </div>
                                : <span className="btn btn2 btn-lg btn-block add_address" onClick={() => setNewAddress(!newAddress)}  id="goToPayment">+ New Address</span>
                            }
                        </Row>
                        <Button type="submit">Add</Button>
                    </Form>
                </Card.Body>
            </Card>
            
        </div>
        <Modal show={showPopup} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
            <Modal.Title className='m-l-auto'>Add Extra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row className='justify-content-center'>
                {
                    (subItems && subItems.length && mappings && mappings.length) ? 
                        subItems.map((subItem) => {
                            let mps = JSON.parse(mappings[0].subItemIds)
                            if(mps.indexOf(subItem.id.toString()) > -1) {
                                return (
                                    <div className="menu_item">
                                        <span><img src={subItem.image} width="100" alt=""/></span><span className='d-block'>{subItem.name}</span>
                                        <div class="added_count"><span class="count_minus" onClick={() => updateItemQuantity(-1, subItem.id)}>-</span><span class="count_total">{extraItemCountData[subItem.id] ? extraItemCountData[subItem.id] : 0}</span><span class="count_plus" onClick={() => updateItemQuantity(1, subItem.id)}>+</span></div>
                                    </div>
                                )
                            }
                            
                        })
                    : null
                }
                {/*
                    (subItems.length && mappings.length) ? 
                        subItems.map((subItem) => {
                            let mps = JSON.parse(mappings[0].subItemIds)
                            if(mps.indexOf(subItem.id.toString()) > -1) {
                                return (
                                    <Col xs={6} md={4}>
                                        <div className="menu_item" style={extraSubItems.indexOf(subItem.id) > -1 ? active : inactive} onClick={handleClick(subItem.id)}>
                                            <span><img src={subItem.image} width="40" alt=""/></span><span>{subItem.name}</span>
                                        </div>
                                        
                                    </Col>
                                )
                            }
                            
                        })
                    : null
                */}
            </Row>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
            {/* <Button variant="secondary" onClick={handleClose}>
                Close
            </Button> */}
            <Button variant="btn btn2" onClick={handleClose}>
                Add Items
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default AddSubOrder;
