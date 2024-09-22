import React, { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getZones } from '../../store/subscriptionsSlice';



function Zones() {
  const navigate = useNavigate();
    const [userType , setUserType] = useState(null)
    const dispatch = useDispatch()
    const { zones } = useSelector((state) => state.subscriptions)

    const getZonesData = async () => {
      await dispatch(getZones({}))
    }
    useEffect(() => {
        // if(!zones.length) {
          getZonesData()
        // }
    }, [])

    const columns = [
      {
        dataField: "id",
        text: "Zone ID",
      },
      {
        dataField: "name",
        text: "Zone Name",
      },
      {
        isDummyField: true,
        text: 'Actions',
        formatter: (cell, row, rowIndex) => {
          return (
            <div key={row.id} style={{display: "flex", justifyContent: 'space-evenly'}}>
            </div>
          )
        }
      }
    ];
  return (
    <div className='container-fluid'>
        
        <div className='row'>
          <Card >
              <div class="card-header ">
                <div class="card-title my-0 h5">Zones</div>
                <div className='d-block d-sm-flex align-items-center' style={{justifyContent: 'space-between'}}>
              <div className='search-bar mr-2' style={{minWidth:'250px'}}>
                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                        <input type="text" className="form-control" name="query" placeholder="Search Name / Mobile / Email" title="Enter search keyword" />
                        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                  </div>
                  <div className='d-flex'>
                    <div className=' mb-2  mr-2' style={{justifyContent: 'start'}}>
                        <div className='card widget-stat mb-0'>
                        <Button onClick={() => navigate('/delivery-zone/add')}> Add Zone</Button>

                        </div>
                    </div>
                    <div className=' mb-2  ml-2' style={{justifyContent: 'end'}}>
                        <div className='card widget-stat mb-0'>
                        <Button onClick={() => navigate('/delivery-zone/mapping')}> Mapping</Button>

                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <Card.Body>
              
                  {
                      (zones && zones.length) ?
                      <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={zones}
                          columns={columns}
                          pagination={paginationFactory({ sizePerPage: 10, hideSizePerPage: true, onPageChange:(page)=>console.log("DB CALL with page" + page) })}
                      
                      />
                      : null
                  }
                
              </Card.Body>
            </Card>
        </div>
    </div>
  );
}

export default Zones;
