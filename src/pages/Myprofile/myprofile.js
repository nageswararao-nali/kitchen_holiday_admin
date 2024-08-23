import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Myprofile() {
 
    
  return (
    <div class="container-fluid">
        <div class="row page-titles mx-0">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active"><a href="/react/demo/app-profile">App</a></li>
                <li class="breadcrumb-item  "><a href="/react/demo/app-profile">Profile</a></li>
            </ol>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="profile card card-body px-3 pt-3 pb-3">
                    <div class="profile-head">
                        <div class="photo-content ">
                            {/* <div class="cover-photo rounded"></div> */}
                        </div>
                        <div class="profile-info d-flex">
                            <div class="profile-photo">
                                <img src="assets/img/profile-img.jpg" class="img-fluid rounded-circle" alt="profile"/>
                            </div>
                            <div class="profile-details d-flex">
                                <div class="profile-name px-3 pt-2"><h4 class="text-primary mb-0">Mitchell C. Shay</h4><p>UX / UI Designer</p></div>
                                <div class="profile-email px-2 pt-2"><h4 class="text-muted mb-0">hello@email.com</h4><p>Email</p></div>  
                                <div className='flex-grow-1 px-2 pt-2 profile-edit'>
                                                        
                                        <a class="btn btn-primary light px-3 me-1" href="#"><i class="bi bi-pencil-fill m-0"></i> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">           
            
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <div class="profile-tab">
                            <div class="custom-tab-1">
                            <Tabs
                                defaultActiveKey="profile"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                >
                                <Tab eventKey="home" title="About me">
                                    <div  role="tabpanel" class="fade tab-pane text-left">
                                        <div class="profile-about-me text-left">
                                            <div class="pt-4 border-bottom-1 pb-3"><h4 class="text-primary">About Me</h4><p class="mb-2">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.</p><p>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p></div>
                                        </div>
                                        <div class="profile-skills mb-5"><h4 class="text-primary mb-2">Skills</h4><a class="btn btn-primary light btn-xs mb-1 me-1" href="/react/demo/app-profile"> Admin</a><a class="btn btn-primary light btn-xs mb-1 me-1" href="/react/demo/app-profile"> Dashboard</a><a class="btn btn-primary light btn-xs mb-1 me-1" href="/react/demo/app-profile">Photoshop</a><a class="btn btn-primary light btn-xs mb-1 me-1" href="/react/demo/app-profile">Bootstrap</a><a class="btn btn-primary light btn-xs mb-1 me-1" href="/react/demo/app-profile">Responsive</a><a class="btn btn-primary light btn-xs mb-1 me-1" href="/react/demo/app-profile">Crypto</a></div>
                                        <div class="profile-lang  mb-5"><h4 class="text-primary mb-2">Language</h4><a class="text-muted pe-3 f-s-16" href="/react/demo/app-profile"><i class="flag-icon flag-icon-us"></i>English</a><a class="text-muted pe-3 f-s-16" href="/react/demo/app-profile"><i class="flag-icon flag-icon-fr"></i>French</a><a class="text-muted pe-3 f-s-16" href="/react/demo/app-profile"><i class="flag-icon flag-icon-bd"></i>Bangla</a></div>
                                        <div class="profile-personal-info"><h4 class="text-primary mb-4">Personal Information</h4>
                                            <div class="row mb-2">
                                                <div class="col-3"><h5 class="f-w-500"> Name<span class="pull-right">:</span></h5></div>
                                                <div class="col-9"><span>Mitchell C.Shay</span></div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-3"><h5 class="f-w-500">Email<span class="pull-right">:</span></h5></div>
                                                <div class="col-9"><span>example@examplel.com</span></div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-3"><h5 class="f-w-500">  Availability<span class="pull-right">:</span></h5></div>
                                                <div class="col-9"><span>Full Time (Free Lancer)</span></div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-3"><h5 class="f-w-500">Age<span class="pull-right">:</span></h5></div>
                                                <div class="col-9"><span>27</span></div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-3"><h5 class="f-w-500">  Location<span class="pull-right">:</span></h5></div>
                                                <div class="col-9"><span>Rosemont Avenue Melbourne, Florida</span></div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-3"><h5 class="f-w-500">Year Experience<span class="pull-right">:</span></h5></div>
                                                <div class="col-9"><span>07 Year Experiences</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Settings">
                                    <div  class="fade tab-pane text-left">
                                        <div class="pt-3">
                                            <div class="settings-form text-left"><h4 class="text-primary">Account Setting</h4>
                                        
                                                <div class="row">
                                                    <div class="form-group mb-3 col-md-6"><label class="form-label">Email</label><input type="email" placeholder="Email" class="form-control"/></div>
                                                    <div class="form-group mb-3 col-md-6"><label class="form-label">Password</label><input type="password" placeholder="Password" class="form-control"/></div>
                                                </div>
                                                <div class="form-group mb-3"><label class="form-label">Address</label><input type="text" placeholder="1234 Main St" class="form-control"/></div>
                                                <div class="form-group mb-3"><label class="form-label">Address 2</label><input type="text" placeholder="Apartment, studio, or floor" class="form-control"/></div>
                                                <div class="row">
                                                    <div class="form-group mb-3 col-md-6"><label class="form-label">City</label><input type="text" class="form-control"/></div>
                                                    <div class="form-group mb-3 col-md-4"><label class="form-label">State</label><select class="form-control" id="inputState"><option value="option-1" selected="">Choose...</option><option value="option-2">Option 1</option><option value="option-3">Option 2</option><option value="option-4">Option 3</option></select></div>
                                                    <div class="form-group mb-3 col-md-2"><label class="form-label">Zip</label><input type="text" class="form-control"/></div>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <div class="form-check custom-checkbox"/><input type="checkbox" class="form-check-input" id="gridCheck"/><label class="form-check-label" for="gridCheck">Check me out</label>
                                                    </div>
                                                </div>
                                                <button class="btn btn-primary" type="submit">Update</button>
                                        
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="Inbox" >
                                   <div class="email-right-box ms-0 ms-sm-4 ms-sm-0 text-left">
                                        <div role="toolbar" class="toolbar ms-1 ms-sm-0">
                                            <div class="btn-group mb-1 me-1 ms-1">
                                                <div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox1"/><label class="form-check-label" for="checkbox1"></label></div></div>
                                                <div class="btn-group mb-1"><button class="btn btn-primary light px-3" type="button"><i class="bi bi-arrow-clockwise"></i></button></div>
                                                <div class="btn-group mb-1 dropdown"><button type="button" id="react-aria8096053300-13" aria-expanded="false" data-toggle="dropdown" class="btn btn-primary px-3 light dropdown-toggle ms-1 dropdown-toggle btn btn-primary">More <span class="caret"></span></button></div>
                                                </div>
                                                <div class="email-list mt-3"><div class="message position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox2"/><label class="form-check-label" for="checkbox2"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div><div class="date">11:49 am</div></a></div></div><div class="message position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox3"/><label class="form-check-label" for="checkbox3"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div><div class="date">11:49 am</div></a></div></div><div class="message position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox4"/><label class="form-check-label" for="checkbox4"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox5"/><label class="form-check-label" for="checkbox5"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox6"/><label class="form-check-label" for="checkbox6"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div><div class="date">11:49 am</div></a></div></div><div class="message position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox7"/><label class="form-check-label" for="checkbox7"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div><div class="date">11:49 am</div></a></div></div><div class="message position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox8"/><label class="form-check-label" for="checkbox8"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message unread position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox9"/><label class="form-check-label" for="checkbox9"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message unread position-relative"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox10"/><label class="form-check-label" for="checkbox10"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox11"/><label class="form-check-label" for="checkbox11"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox12"/><label class="form-check-label" for="checkbox12"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox13"/><label class="form-check-label" for="checkbox13"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox14"/><label class="form-check-label" for="checkbox14"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div><div class="date">11:49 am</div></a></div></div><div class="message unread d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox15"/><label class="form-check-label" for="checkbox15"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox16"/><label class="form-check-label" for="checkbox16"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox17"/><label class="form-check-label" for="checkbox17"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox18"/><label class="form-check-label" for="checkbox18"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Ingredia Nutrisha, A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox19"/><label class="form-check-label" for="checkbox19"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</div><div class="date">11:49 am</div></a></div></div><div class="message unread d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox20"/><label class="form-check-label" for="checkbox20"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div><div class="message d-none"><div><div class="d-flex message-single"><div class="ps-1 align-self-center"><div class="form-check custom-checkbox"><input type="checkbox" class="form-check-input" id="checkbox21"/><label class="form-check-label" for="checkbox21"></label></div></div><div class="ms-2"><button class="border-0 bg-transparent align-middle p-0"><i class="bi bi-star-fill" aria-hidden="true"></i></button></div></div><a class="col-mail col-mail-2" href="/react/demo/email-inbox/email-read"><div class="subject">Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of</div><div class="date">11:49 am</div></a></div></div></div>
                                                <div class="row mt-4"><div class="col-12 ps-3"><nav><ul class="pagination pagination-gutter pagination-primary pagination-sm no-bg"><li class="page-item page-indicator"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li><li class="page-item  active "><a class="page-link" href="#">1</a></li><li class="page-item   "><a class="page-link" href="/#">2</a></li><li class="page-item   "><a class="page-link" href="#">3</a></li><li class="page-item page-indicator"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li></ul></nav></div></div></div>
                                </Tab>
                                <Tab eventKey="notifications" title="Notifications" >
                                    <div class="profile-news d-flex flex-column align-items-start">
                                        <div class="media pt-3 pb-3 d-flex align-items-center text-left">
                                        <img src="assets/img/messages-3.jpg" alt="" class="me-3 rounded" width="75"/>
                                    
                                    <div class="media-body"><h5 class="m-b-5"><a class="text-black" href="/react/demo/post-details">Collection of textile samples</a></h5><p class="mb-0">I shared this on my fb wall a few months back, and I thought. </p></div>
                                </div>
                                <div class="media pt-3 pb-3 d-flex align-items-center text-left">
                                    <img src="assets/img/messages-1.jpg" alt="" class="me-3 rounded" width="75"/>
                                    <div class="media-body"><h5 class="m-b-5"><a class="text-black" href="/react/demo/post-details">Collection of textile samples</a></h5><p class="mb-0">I shared this on my fb wall a few months back, and I thought.</p></div>
                                </div>
                                <div class="media pt-3 pb-3 d-flex align-items-center text-left"><img src="assets/img/messages-2.jpg" alt="" class="me-3 rounded" width="75"/>
                                    <div class="media-body"><h5 class="m-b-5"><a class="text-black" href="/react/demo/post-details">Collection of textile samples</a></h5><p class="mb-0">I shared this on my fb wall a few months back, and I thought.</p></div></div></div>
                                </Tab>
                            </Tabs>                            
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default Myprofile;
