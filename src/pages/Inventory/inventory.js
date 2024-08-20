import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';



function Inventory() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div class="container-fluid">
        <div class="row page-titles mx-0">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active"><a href="#">Post</a></li>
                <li class="breadcrumb-item  "><a href="#">Table</a></li>
            </ol>
        </div>
            <div class="col-12">
                <div class="card inventory_card">
                    <div class="card-header">
                        <h4 class="card-title">Inventory</h4>
                    </div>
                    <div class="card-body">
                        <div class="w-100 table-responsive">
                            <div id="example_wrapper" class="dataTables_wrapper">
                                <form>
                                    <table id="example" class="display w-100 dataTable">
                                        <thead>
                                            <tr>
                                                <th></th><th>Item name</th>
                                                <th>Department</th>
                                                <th>Quantity</th>
                                                <th>Stock</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {/* <tr>
                                            <td></td>
                                            <td><input type="text" required="" placeholder="Enter a name ..." name="name" value="Tiger Nixon"/></td>
                                            <td><input type="text" required="" placeholder="Enter a department ..." name="department" value="Architect"/></td><td><input type="text" required="" placeholder="Enter a quantity ..." name="quantity" value="05"/></td>
                                            <td><input type="text" required="" placeholder="Enter a stock" name="stock" value="12345"/></td>
                                            <td><div class="d-flex"><button class="btn btn-warning shadow btn-xs sharp me-1" type="submit"><i class="las la-check-circle scale5"></i></button><button class="btn btn-danger shadow btn-xs sharp " type="button"><i class="las la-times-circle scale5"></i></button></div></td>
                                        </tr> */}
                                        <tr>
                                            <td><img class="rounded-circle" width="35" src="assets/img/menu_veg.png" alt=""/></td>
                                            <td>Tiger Nixon</td>
                                            <td>Architect</td>
                                            <td>05</td>                                           
                                            <td><strong>12345</strong></td>
                                            <td>
                                                <div class="d-flex">
                                                    <a class="btn btn-primary shadow btn-xs sharp me-2" href="#" onClick={handleShow}><i class="bi bi-plus-lg"></i></a>
                                                    <a class="btn btn-secondary	 shadow btn-xs sharp me-2" href="#"><i class="bi bi-pencil-fill"></i></a>
                                                    <a class="btn btn-danger shadow btn-xs sharp" href="#"><i class="bi bi-trash3-fill"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class="rounded-circle" width="35" src="assets/img/menu_veg.png" alt=""/></td>
                                            <td>Gloria Little</td>
                                            <td> Administrator</td>
                                            <td>09</td>
                                            <td><strong>12345</strong></td>

                                            <td>
                                            <div class="d-flex"><a class="btn btn-primary shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-plus-lg"></i></a><a class="btn btn-secondary	 shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-pencil-fill"></i></a>
                                                <a class="btn btn-danger shadow btn-xs sharp" href="/react/demo/todo"><i class="bi bi-trash3-fill"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class="rounded-circle" width="35" src="assets/img/menu_veg.png" alt=""/></td>
                                            <td>Bradley Greer</td><td>Software Engineer</td>
                                            <td>25</td>
                                            <td><strong>98765</strong></td>
                                            <td>
                                            <div class="d-flex"><a class="btn btn-primary shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-plus-lg"></i></a><a class="btn btn-secondary	 shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-pencil-fill"></i></a>
                                                <a class="btn btn-danger shadow btn-xs sharp" href="/react/demo/todo"><i class="bi bi-trash3-fill"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr><td><img class="rounded-circle" width="35" src="assets/img/menu_veg.png" alt=""/></td>
                                        <td>Gloria Little</td>
                                        <td> Administrator</td>
                                        <td>16</td>
                                        <td><strong>09876</strong></td>
                                        <td>
                                        <div class="d-flex"><a class="btn btn-primary shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-plus-lg"></i></a><a class="btn btn-secondary	 shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-pencil-fill"></i></a>
                                                <a class="btn btn-danger shadow btn-xs sharp" href="/react/demo/todo"><i class="bi bi-trash3-fill"></i></a>
                                                </div>
                                        </td>
                                        </tr>
                                        <tr>
                                            <td><img class="rounded-circle" width="35" src="assets/img/menu_veg.png" alt=""/></td>
                                            <td>Tiger Nixon</td>
                                            <td>Architect</td>
                                            <td>11</td>
                                            <td><strong>12345</strong></td>
                                            <td>
                                            <div class="d-flex"><a class="btn btn-primary shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-plus-lg"></i></a><a class="btn btn-secondary	 shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-pencil-fill"></i></a>
                                                <a class="btn btn-danger shadow btn-xs sharp" href="/react/demo/todo"><i class="bi bi-trash3-fill"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class="rounded-circle" width="35" src="assets/img/menu_veg.png" alt=""/></td>
                                            <td>Bradley Greer</td>
                                            <td>Software Engineer</td>
                                            <td>08</td>
                                            <td><strong>98765</strong></td>
                                            <td>
                                            <div class="d-flex"><a class="btn btn-primary shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-plus-lg"></i></a><a class="btn btn-secondary	 shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-pencil-fill"></i></a>
                                                <a class="btn btn-danger shadow btn-xs sharp" href="/react/demo/todo"><i class="bi bi-trash3-fill"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
      className="modal show"     
    >
     <Modal show={show} onHide={handleClose} className='form_modal'>
        <Modal.Header closeButton>
          <Modal.Title className='modal-title fs-20'>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div class="form-group mb-3"><label class="text-black font-w500">Item Name</label><div class="contact-name"><input type="text" class="form-control" autocomplete="off" name="name" required="" placeholder="name"/><span class="validation-text"></span></div></div>
            <div class="form-group mb-3"><label class="text-black font-w500">Department</label><div class="contact-name"><input type="text" class="form-control" autocomplete="off" name="name" required="" placeholder="Department"/><span class="validation-text"></span></div></div>
            <div class="form-group mb-3"><label class="text-black font-w500">Quantity</label><div class="contact-name"><input type="text" class="form-control" autocomplete="off" name="name" required="" placeholder="Quantity"/><span class="validation-text"></span></div></div>
            <div class="form-group mb-3"><label class="text-black font-w500">Stock</label><div class="contact-name"><input type="text" class="form-control" autocomplete="off" name="name" required="" placeholder="Stock"/><span class="validation-text"></span></div></div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    );
}

export default Inventory;
