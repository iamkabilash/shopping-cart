import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import Product from "./Components/Product";
import CartItem from "./Components/CartItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from "./Components/data.json"

const App = () =>{

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const addItem = (item) =>{
      const cartCheck = cart.findIndex((check) => {
          return check.id === item.id;
      })
      if(cartCheck<0){
          setCart([...cart, item]);
      } else{
        toast('Item already in cart.', {type: "error"});
      }
  }

  const removeItem = (item) =>{
      let updatedCart = cart.filter((check) => {
          if(check.id === item.id){
              return false;
          }
          return true
      });
      setCart(updatedCart);
  }

  const fetchData = async() =>{
      const response = await axios.get("http://myjson.dit.upm.es/api/bins/ebp2");
      if(response){
          setItems(response.data.photos);
          console.log("Failed to load API, so fetching from local - data.json");
      } else{
        setItems(data);
      }
  }

  const totalPrice = () =>{
      let sum = 0;
      cart.map((item) => sum = sum + item.photographer_id);
      return sum;
  }

  const checkOut = () =>{
    if (cart.length === 0){
      toast.warn('Cart is empty!', );
    } else{
      setCart([]);
      toast('Checkout complete!');
    }
  }

  useEffect(() => {
      fetchData();
  }, []);

  return(
      <section className="w-screen flex flex-col relative">
          <h2 className="w-screen text-2xl font-bold text-white py-[20px] text-center justify-center">Shopping Cart App</h2>
          <div className="flex flex-row gap-[20px]">
              <div className="w-3/5 flex flex-col items-center pt-[20px]">
                  <h3 className="text-xl font-bold text-white">Shop for products</h3>
                  <div className="flex flex-row flex-wrap gap-[20px] items-center justify-center mt-[20px]">
                      {items.map((item) => (
                          <Product item={item} addItem={addItem} key={item.id} />
                      ))}
                  </div>
              </div>
              <div className="w-2/5 flex flex-col items-center pt-[20px]">
                  <h3 className="text-xl font-bold text-white">Cart</h3>
                  <div className="flex flex-col gap-[10px] justify-center mt-[20px]">
                      {cart.length>0 ?
                          (cart.map((item) => (
                              <CartItem item={item} removeItem={removeItem} key={item.id} />
                          )))
                          :
                          (<h2 className="text-white text-xl">Cart is empty</h2>)
                      }
                  </div>
              </div>
              <div className="fixed bottom-[30px] right-[7vw] w-[26vw] h-[60px] rounded-lg flex flex-row bg-red-400 items-center px-[20px] justify-between">
                  <h2 className="text-lg font-bold">{"Total price: " + totalPrice()}</h2>
                  <button onClick={() => checkOut()} className="bg-green-400 hover:bg-green-500 rounded-lg py-[4px] px-[10px] text-lg font-bold">Checkout</button>
              </div>
          </div>
          <ToastContainer />
      </section>
  );
}

export default App;