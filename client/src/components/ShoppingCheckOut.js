import React, { Component } from "react";
import "../App.css";
import Footer from "./Footer";
import {
    Card,
    Button,
    Table,
    CardTitle,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardText,
    CardImg,
    Row,
    Col,
  } from "reactstrap";

import { useState } from "react";
import axios from "axios";
import NavbarTop from "./NavbarTop";


const url = "http://localhost:8000/api/uploadManage/image/";

export default class CheckOutList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            goods: 
            [
                { name: "testA", price: "10", quantity:"1"},
                { name: "testB", price: "5", quantity:"1"},
                { name: "testC", price: "8", quantity:"1"},
            ],
        };
        
        this.sendPayment = this.sendPayment.bind(this);

        
    }
    

    sendPayment(e){
        e.preventDefault();
 

        const lists = this.state.goods;
        console.log(lists);

        axios.post("http://localhost:8000/api/paypal/pay",lists)
        .then((res) =>{
            window.location.href=res.data.link;
        })
        
    }

    render() {
        return (
            <div>
                <NavbarTop />
                <br />
                <br />
                <h1>CHECKOUTLIST</h1>
                <br />
                <br />
                <br />
                <br />
                <div>
                   <ItemsTable/> 
                </div>
                <div >
                    <Button size ="lg" color="primary" onClick ={this.sendPayment} block> 
                        Check and Pay
                    </Button>{' '}
                </div>
                <Footer />
            </div>
        )
    }
}



class ItemsTable extends Component{


    render(){
        return (
            <Table >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td >
                        <img   
                            height="20%"
                            width="20%"  
                            src="http://localhost:8000/api/uploadManage/image/cff15ed84dad8a582143ce1ada541820.png"
                        />
                    </td>
                    <td>Mona lisa's smile</td>
                    <td>
                        1
                    </td>
                    <td>AUD 30.00</td>
                    <td>
                        <Button size="sm" color="danger"> Remove</Button>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>
                        <img 
                            height="20%"
                            width="20%"
                            src="http://localhost:8000/api/uploadManage/image/141d4e89773a48c1d4ed37ba20fb0a72.png"
                        />
                    </td>
                    <td>MAD MAX 4</td>
                    <td>1</td>
                    <td>AUD 20.00</td>
                    <td>
                        <Button size="sm" color="danger"> Remove</Button>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <th>
                        <img 
                            height="20%"
                            width="20%"
                            src={url + "877845f5327f2ac4d5935ef64499befd.png"}
                        />
                    </th>
                    <td>天线得得B</td>
                    <td>1</td>
                    <td>AUD 10.00</td>
                    <td>
                        <Button size="sm" color="danger"> Remove</Button>
                    </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

