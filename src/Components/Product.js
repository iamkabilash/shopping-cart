const Product = ({ item, addItem }) =>{
    return(
        <div className="w-[270px] p-[10px] rounded bg-sky-500 flex flex-col gap-[6px] items-center justify-center">
            <img className="w-[200px]" src={item.src.small} alt="" />
            <h4 className="font-semibold ">{"Product name: " + item.photographer }</h4>
            <p className="font-semibold ">{"Price: " + item.photographer_id}</p>
            <button onClick={() => addItem(item)} className="w-[100px] h-[35px] bg-green-300 hover:bg-green-500 text-md font-semibold rounded-lg">Add to cart</button>
        </div>
    );
}

export default Product;