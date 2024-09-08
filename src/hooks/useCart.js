import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";


const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    //useState
    const [ data ] = useState(db);
    const [ cart, setCart ] = useState(initialCart);

    //useEffect
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const MIN_QUANTITY = 1;
    const MAX_QUANTITY = 5;
    const STEP = 1;

    function addToCart(item) {
        const itemExist = cart.findIndex(element => element.id === item.id); //findIndex return -1 if not exist, else return index of first element
        if(itemExist >= 0) {
            const updatedCart = [...cart];      //para no mutar el state se obteniene una copia
            updatedCart[itemExist].quantity++;  //acceder al elemento e incrementar quantity
            setCart(updatedCart);               //actualizar el state
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    function removeItem(id) {
        setCart(cart.filter(item => item.id != id));
    }

    function decreaceQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_QUANTITY) {
                return {
                    ...item,
                    quantity: item.quantity - STEP
                }
            }
            return item; //si la condicion es false, retornar el item como esta
        });
        setCart(updatedCart);
    }

    function increaceQuantity(id) {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_QUANTITY) {
                return {
                    ...item,
                    quantity: item.quantity + STEP
                }
            }
            return item; //si la condicion es false, retornar el item como esta
        });
        setCart(updatedCart); //actualizar el state
    }

    function clearCart() {
        setCart([]);
    }
    
    //State derivado
    // const isEmpty = () => cart.length === 0
    // const cartTotal = () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0)

    const isEmpty = useMemo( () => cart.length === 0, [cart]);
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0), [cart] )

    return {
        data,
        cart,
        setCart,
        addToCart,
        removeItem,
        decreaceQuantity,
        increaceQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

export default useCart