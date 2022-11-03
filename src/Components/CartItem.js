const CartItem = ({ item, removeItem }) =>{
    return(
        <div key={item.id} className="w-9/10 p-[10px] rounded bg-sky-500 flex flex-row items-center gap-[5px]">
            <img className="w-[70px]" src={item.src.small} alt="" />
            <div className="ml-[20px] flex flex-row gap-[15px]">
                <h4 className="font-semibold w-[130px]">{item.photographer }</h4>
                <p className="font-semibold w-[60px]">{"$" + item.photographer_id}</p>
                <button onClick={() => removeItem(item)} className=" w-[70px] py-[1px] bg-red-300 hover:bg-red-500 text-sm font-semibold rounded-lg">Remove</button>
            </div>
        </div>
    );
}

export default CartItem;