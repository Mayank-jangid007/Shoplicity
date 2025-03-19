import React,{useEffect, useState} from 'react'
import service from '../AppWrite/config'

function Cart() {

    const [ cartItem, setCartItem] = useState([])
    
    const handleDecreaseQuantity = async (data) => { // agar data.quantity is null/undefined to function yhi ruk jaega mtlb reutrn hojaega 
      if(!data.quantity || data.quantity <= 0) return
        const updatedItems = cartItem.map(i => {
          if(i.productId === data.productId){
            return{ ...i, quantity: data.quantity - 1 }
          }
          return i
        })

        setCartItem(updatedItems)
      
      // Update in database     
      await service.addToCart({
        ...data,
        quantity: data.quantity - 1 // isme apan direactly updatedItems bhi de skte hai apnne yha overwrite kiya hai bus
      })
    }

    const handleIncreaseQuantity = async (data) => {
      let updatedItems = cartItem.map((i) => {
        if(i.productId === data.productId){
          return { ...i, quantity: data.quantity + 1}
        }
        return i
      })

      setCartItem(updatedItems);

      await service.addToCart({
        ...data,
        quantity: data.quantity + 1
      }) // to apnne idhar sidha pass krdiya updatedItems or decrement me apnne overwrite kiya tha

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const item = await service.fetchBuyNowItems() || [];
                setCartItem(item);
                console.log("====", item);
            } catch (error) { 
                console.log("error::::", error);   
            }
        };
    
        fetchData();
      }, []);
      
      console.log("==+==+", cartItem);
     

    
    
    return (
        <div className="min-h-screen bg-primary p-6">
        <div className="max-w-5xl mx-auto bg-secoundary p-6 rounded-md shadow-md text-white">
          {/* Header */}
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Flipkart (3)</h2>
            <p className="text-gray-600 text-sm">Kilos</p>
          </div>
  
          {/* Delivery Address */}
          <div className='border p-3 border-gray-500 flex justify-between'>
            <div className="flex gap-2 mb-2 flex-col">
                <p className="text-sm">Deliver to: <strong>Mayank Jangid, 342008</strong></p>
                <p className="text-xs text-gray-500">
                    87 Ram Nagar, Chopasni Housing Board, Jodhpur...
                </p>
            </div>
                <button className="text-blue-500 hover:text-white text-sm px-3 rounded-xl bg-gray-300">Change</button>
          </div>
  
          {/* Cart Items */}
          <div className="space-y-6 mt-6">
          {cartItem.map((data, index) => (
              <div key={index} className="flex justify-between border-b pb-4">
                {/* Product Details */}
                <div className="flex items-center">
                  <img src={data.images[0]} alt={data.proName} className="w-24 h-24 object-cover rounded-md" />
                  <div className="ml-6">
                    <h3 className="text-base font-semibold">{data.prodName}</h3>
                    <p className="text-sm text-gray-500">Size: {}</p>
                    <p className="text-sm text-gray-500">Seller: {}</p>
                    <div className="flex items-center mt-2">
                      <p className="text-sm text-gray-400 line-through">1000</p>
                      <p className="text-lg font-semibold ml-2">{data.price}</p>
                      <span className="bg-green-100 text-green-500 text-sm px-2 py-1 rounded-md ml-2">{data.discount} Off</span>
                    </div>
                  </div>
                </div>
  
                {/* Quantity & Actions */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">{}</p> item.delivery
                  <div className="flex items-center mt-2">
                    <button className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-md text-black" onClick={() => handleDecreaseQuantity(data)}>-</button>
                    <span className="mx-3">{data.quantity || 1}</span>
                    <button className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-md text-black" onClick={() => handleIncreaseQuantity(data)}>+</button>
                  </div>
                  <button className="text-blue-500 hover:underline text-sm mt-2 block">SAVE FOR LATER</button>
                  <button className="text-red-500 hover:underline text-sm mt-2 block">REMOVE</button>
                </div>
              </div>
            ))}
          </div>
  
          {/* Price Details */}
          <div className="mt-10 p-6 bg-secoundary rounded-lg">
            <h2 className="text-lg font-semibold">PRICE DETAILS</h2>
            <div className="flex justify-between mt-4">
              <p className="text-sm">Price (3 items)</p>
              <p className="text-sm">₹3,597</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm">Discount</p>
              <p className="text-sm text-red-500">-₹1,310</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm">Platform Fee</p>
              <p className="text-sm">₹3</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm">Delivery Charges</p>
              <p className="text-sm">₹40 Free</p>
            </div>
            <div className="flex justify-between mt-4 border-t border-gray-300 pt-2">
              <p className="text-base font-semibold">Total Amount</p>
              <p className="text-base font-semibold">₹2,290</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">You will save ₹1,307 on this order</p>
          </div>
  
          {/* Place Order Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md mt-6 w-full">
            PLACE ORDER
          </button>
  
          {/* Secure Payment Info */}
          <div className="text-xs text-gray-500 mt-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5" />
            </svg>
            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </div>
      </div>
    )
}

export default Cart