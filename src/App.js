import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

const App = () =>{

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const addItem = (item) =>{
      const cartCheck = cart.findIndex((check) => {
          return check.id === item.id;
      })
      if(cartCheck<0){
          setCart([...cart, item]);
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
      setItems(response.data.photos);
  }

  const totalPrice = () =>{
      let sum = 0;
      cart.map((item) => sum = sum + item.photographer_id);
      return sum;
  }

  const checkOut = () =>{
      setCart([]);
  }

  useEffect(() => {
      fetchData();
  }, []);

  return(
      <section className="w-screen bg-gray-800 flex flex-col relative">
          <h2 className="w-screen text-2xl font-bold text-white py-[20px] text-center justify-center">Shopping Cart App</h2>
          <div className="flex flex-row gap-[20px]">
              <div className="w-3/5 flex flex-col items-center pt-[20px]">
                  <h3 className="text-xl font-bold text-white">Shop for products</h3>
                  <div className="flex flex-row flex-wrap gap-[20px] items-center justify-center mt-[20px]">
                      {items.map((item) => (
                          <div key={item.id} className="w-[270px] p-[10px] rounded bg-sky-500 flex flex-col gap-[6px] items-center justify-center">
                              <img className="w-[200px]" src={item.src.small} alt="" />
                              <h4 className="font-semibold ">{"Product name: " + item.photographer }</h4>
                              <p className="font-semibold ">{"Price: " + item.photographer_id}</p>
                              <button onClick={() => addItem(item)} className="w-[100px] h-[35px] bg-green-300 hover:bg-green-500 text-md font-semibold rounded-lg">Add to cart</button>
                          </div>
                      ))}
                  </div>
              </div>
              <div className="w-2/5 flex flex-col items-center pt-[20px]">
                  <h3 className="text-xl font-bold text-white">Cart</h3>
                  <div className="flex flex-col gap-[10px] justify-center mt-[20px]">
                      {cart.length>0 ?
                          (cart.map((item) => (
                              <div key={item.id} className="w-9/10 p-[10px] rounded bg-sky-500 flex flex-row items-center gap-[5px]">
                                  <img className="w-[70px]" src={item.src.small} alt="" />
                                  <div className="ml-[20px] flex flex-row gap-[15px]">
                                      <h4 className="font-semibold w-[130px]">{item.photographer }</h4>
                                      <p className="font-semibold w-[60px]">{"$" + item.photographer_id}</p>
                                      <button onClick={() => removeItem(item)} className=" w-[70px] py-[1px] bg-red-300 hover:bg-red-500 text-sm font-semibold rounded-lg">Remove</button>
                                  </div>
                              </div>
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
      </section>
  );
}

export default App;