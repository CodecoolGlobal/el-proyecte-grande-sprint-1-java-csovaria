import React, {useEffect, useState} from "react";
import "../App.css"
import Card from "react-bootstrap/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import DataService from "../components/DataService"
import Button from 'react-bootstrap/Button'

const CartPage = () => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const CART_URL = "/cart";
    const CART_TOTAL_PRICE_URL = "/cart/value";


    async function increaseProductQuantity(cartId, productId) {
        try{
            await DataService.postData(`${CART_URL}/${cartId}/add/${productId}`);
            await getTotalPrice();
            await getCarts();
        }
        catch (error){
            console.log("Cannot increase product quantity: " + error);
        }
    }

    async function decreaseProductQuantity(cartId, productId) {
        try{
            await DataService.sendPut(`${CART_URL}/${cartId}/remove/${productId}`);
            await getTotalPrice();
            await getCarts();
        }
        catch (error){
            console.log("Cannot decrease product quantity: " + error);
        }
    }

    async function deleteProduct(cartId, productId) {
        try{
            await DataService.sendDelete(`${CART_URL}/${cartId}/remove/${productId}`);
            await getTotalPrice();
            await getCarts();
        }
        catch (error){
            console.log("Cannot delete product: " + error);
        }
    }

    async function getCarts() {
        try{
            const carts = await DataService.getData(CART_URL);
            setIsLoaded(true);
            setItems(carts.data);
        }
        catch (error){
            console.log("Error loading carts: " + error);
        }
    }

    async function getTotalPrice() {
        try{
            const totalPrice = await DataService.getData(`${CART_TOTAL_PRICE_URL}/1`);
            setTotalPrice(totalPrice.data);
        }
        catch(error){
            console.log("Error loading total price: " + error);
        }
    }


    useEffect(() => {
        getCarts();
        getTotalPrice();
    }, [])

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (

            <div className="container">

                <h1 style={{textAlign: "center"}}>Total Price: {totalPrice}</h1>
                <div className="grid">
                    {items[0].products.map(cartProduct => //items[0] only until we have user login. until then only 1 cart is available.
                        <Card key={cartProduct.product.id} style={{width: '36rem'}}>
                            <Card.Header></Card.Header>
                            <Card.Body>
                                <Card.Title>{cartProduct.product.name}</Card.Title>
                                <img className="homeImg" src={`${cartProduct.product.name.replace(" ", "_")}.jpeg`} style={{objectFit: "cover", width: 2000}}/>
                                <div className="grid">
                                    <p>Total quantity of products : {cartProduct.quantity} </p>
                                    <Button type="submit" bsPrefix="custom-button" size="sm" onClick={async() => await increaseProductQuantity(items[0].id, cartProduct.product.id)}>+</Button>
                                    <Button type="submit" bsPrefix="custom-button" size="sm" onClick={async() =>await decreaseProductQuantity(items[0].id, cartProduct.product.id)}>-</Button>
                                    <Button type="button" bsPrefix="custom-button" size="sm" onClick={async() =>await deleteProduct(items[0].id, cartProduct.product.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </div>
                <div className="checkoutButton">
                    <Button type="button" bsPrefix="custom-button" style={{text: "center"}}>Checkout</Button>
                </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
};

export default CartPage;
