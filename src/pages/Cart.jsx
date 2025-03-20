import React,{useEffect, useState} from 'react'
import service from '../AppWrite/config'

function Cart() {

    const [ cartItem, setCartItem] = useState([]);
    const [loading, setLoading] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0);

    // Move calculateTotalPrice outside useEffect
    const calculateTotalPrice = () => {
        if (cartItem && cartItem.length > 0) {
            const total = cartItem.reduce((sum, item) => {
                return sum + (item.price * (item.quantity || 1));
            }, 0);
            return total;
        }
        return 0;
    };

    // Fetch cart items
    useEffect(() => {
        const fetchData = async () => {
            try {
                const item = await service.fetchBuyNowItems() || [];
                setCartItem(item);
            } catch (error) { 
                console.log("error::::", error);   
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    // Calculate total price whenever cartItem changes
    useEffect(() => {
        const total = calculateTotalPrice();
        setTotalPrice(total);
        console.log("Total Price:", total);
    }, [cartItem]); // This will run whenever cartItem changes

    console.log("==+==+", cartItem);

    
    const handleDecreaseQuantity = async (data) => {
        if(!data.quantity || data.quantity <= 0) return
        
        try {
            // Update local state first with the new quantity
            const newQuantity = data.quantity - 1
            
            // Create updated item with new quantity
            const updatedItem = {
                ...data,
                quantity: newQuantity
            }

            // Update database with the complete item
            await service.updateCartItem(updatedItem) // We'll need to create this method
            
            // Update local state
            setCartItem(prevItems => 
                prevItems.map(item => 
                    item.productId === data.productId 
                        ? updatedItem 
                        : item
                )
            )
        } catch (error) {
            console.error("Error updating quantity:", error)
        }
    }

    const handleIncreaseQuantity = async (data) => {
        try {
            // Update local state first with the new quantity
            const newQuantity = data.quantity + 1
            
            // Create updated item with new quantity
            const updatedItem = {
                ...data,
                quantity: newQuantity
            }

            // Update database with the complete item
            await service.updateCartItem(updatedItem) // We'll need to create this method
            
            // Update local state
            setCartItem(prevItems => 
                prevItems.map(item => item.productId === data.productId ? updatedItem : item)
            )
        } catch (error) {
            console.error("Error updating quantity:", error)
        }
    }
     
    
    return (
      <>
         {loading ? <h1 className='text-white w-full h-full text-center'>Loading...</h1> : (
      
          <div className="min-h-screen bg-dark-primary dark:bg-light-secondary p-6">
          <div className="max-w-5xl mx-auto bg-dark-secondary dark:bg-light-five p-6 rounded-md shadow-md text-white">
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
                    <div className="ml-6 dark:text-light-six">
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
            <div className="mt-10 p-6 bg-dark-secondary dark:bg-light-six rounded-lg">
              <h2 className="text-lg font-semibold">PRICE DETAILS</h2>
              <div className="flex justify-between mt-4">
                <p className="text-sm">Price (3 items)</p>
                <p className="text-sm">₹{totalPrice}</p>
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
                <p className="text-base font-semibold">₹{totalPrice}</p>
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
  )}
      </>
    )
}

export default Cart