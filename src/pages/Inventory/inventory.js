import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../store/orderSlice';



function Inventory() {
  
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
                                        <tr>
                                            <td><img class="rounded-circle" width="35" src="assets/img/menu_veg.png" alt=""/></td>
                                            <td>Tiger Nixon</td>
                                            <td>Architect</td>
                                            <td>05</td>                                           
                                            <td><strong>12345</strong></td>
                                            <td>
                                                <div class="d-flex"><a class="btn btn-primary shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-plus-lg"></i></a><a class="btn btn-secondary	 shadow btn-xs sharp me-2" href="/react/demo/todo"><i class="bi bi-pencil-fill"></i></a>
                                                <a class="btn btn-danger shadow btn-xs sharp" href="/react/demo/todo"><i class="bi bi-trash3-fill"></i></a>
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
    </div>
    );
}

export default Inventory;
