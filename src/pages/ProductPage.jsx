import React,{useState, useEffect} from "react";
import { useLocation, useNavigate, useParams } from "react-router"; 
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import service from "../AppWrite/config";
import env from "../ImportEnvs/Envs";
function ProductPage() {

    const { productName, categoryName } = useParams() // to ye apan dodo param bhi la skte hai or ese apan descrutre krte hai isse apne konse page pr hai uska name agya  
    const location = useLocation()
    const [feacuredimg, setImg] = useState("")
    const navigate = useNavigate()
    const { item } = location.state || {}



    const {id: productId , title: prodName, price, images, category , stock: quantity , discountPercentage: discount, ...rest} = item || {} // yha pr apnne de-structure kiya hai // to yha pr title ka name mtlb key apan productName dediya hai 
    console.log("id:",item);

    const today = new Date()
    const day = String(today.getDate()).padStart(2, "0"); // Ensures two digits
    const month = String(today.getMonth()).padStart(2, "00")
    const year = today.getFullYear()
    const date = `${day}-${month}-${year}` 
    
    const formattedPrice = parseInt(price, 10) || 0; 
    const formattedDiscount = parseInt(discount) || 0; 


    const handleCart = async () => {
        console.log(":::---", item)
        const product = await service.fetchBuyNowItems() || [];
        const isItemExist = product?.some(cartItem => cartItem.prodName === prodName) // to isme item.title likhne ki jarurat nhi hai kyuki apnne upar de-structure kr liya hai 

        if(!isItemExist) { // agar same product excist nhi krta to addTOcart kro warna 
            service.addToCart({productId  //  ghar ake daldena price or prodName ye sab price ko number me daldena 
                ,prodName
                ,price: formattedPrice
                ,quantity: 1    
                ,discount: formattedDiscount
                ,images
                // ,category 
                // , ...rest
            }) // yha pr apnne de-structure kiya hai 
            navigate('/cart')
        }else{
            navigate('/cart')
        }
    }

    const handleBuyNow = () =>{
        if(item){
            service.getOrder({
                // userId,
                productId,         
                quantity,
                orderDate: date
            })
            navigate('/cart')
        }
        console.log(date);

    }
    
    return (
        <div class="container mx-auto z-10 min-w-full min-h-full bg-primary text-white flex flex-col items-center p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-[4%]">
                <div>
                    <div class="space-y-4 sticky">
                        <img src={feacuredimg? feacuredimg : item.images[0]} alt="Product Image" class="w-full h-auto border rounded-md shadow-sm" />
                        <div class={`flex space-x-3`}>
                            {item.images.map((img, index) => (
                                <img src={img} key={index} alt="Thumbnail 1" className={`w-16 h-16 border rounded-md ${img == feacuredimg ? "ring-2 ring-blue-300" : ""}`} onClick={() => setImg(img)} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-white">
                    <nav class="flex gap-2 text-sm mb-2">
                        <a href="/" class="hover:text-gray-700">Home</a> &gt;
                        <a href="#" onClick={() => navigate(-1)} class="hover:text-gray-700">{categoryName}</a> &gt;
                        <a href="#" class="hover:text-gray-700">{productName}</a>
                    </nav>

                    <h1 class="text-2xl font-bold ">{item.title}</h1>
                    <p className="mt-3 text-gray-400">{item.description}</p>

                    <div class="flex items-center mt-4">
                        <span class="text-3xl font-bold text-green-600">₹{item.price}</span>
                        <span class="ml-4 text-gray-500 line-through">₹1,399</span>
                        <span class="ml-2 text-green-600 text-sm font-semibold">{item.discountPercentage}% off</span>
                    </div>

                    <div class="flex items-center mt-2 text-white">
                        <div class="flex items-center text-yellow-500">
                            <span class="material-icons">star</span>
                            <span class="ml-1 text-lg">4.3</span>
                        </div>
                        <span class="ml-2 ">(106 ratings and 2 reviews)</span>
                    </div>

                    <div class="mt-4 text-white">
                        <h2 class=" font-medium">Color</h2>
                        <div class="flex space-x-3 mt-2">
                            <img src="https://via.placeholder.com/100" alt="Color Option 1" class="w-16 h-16 border-2 border-gray-300 rounded-md" />
                            <img src="https://via.placeholder.com/100" alt="Color Option 2" class="w-16 h-16 border-2 border-gray-300 rounded-md" />
                        </div>
                    </div>

                    <div class="mt-4 text-white">
                        <h2 class=" font-medium">Size</h2>
                        <div class="flex items-center space-x-4 mt-2">
                            <button class="px-4 py-2 border rounded-md text-gray-600 hover:border-gray-800">XS</button>
                            <button class="px-4 py-2 border rounded-md text-gray-600 hover:border-gray-800">S</button>
                        </div>
                        {/* <a href="#" class="text-sm text-blue-600 mt-2 block">Size Chart</a> */}
                    </div>

                    <div class="mt-4 text-white">
                        <h2 class="font-medium">Available Offers</h2>
                        <ul class="mt-2 space-y-1">
                            <li>- <strong>Bank Offer:</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
                            <li>- <strong>Bank Offer:</strong> 10% off up to ₹1250 on HDFC Bank Credit Card Transactions</li>
                            <li>- <strong>Bank Offer:</strong> 10% off up to ₹1500 on HDFC Bank Credit Card EMI Transactions</li>
                        </ul>
                    </div>

                    <div class="mt-6 flex space-x-4">
                        <button class="px-6 py-3 flex  gap-4 items-center bg-gray-700 text-white rounded-md hover:bg-gray-800" onClick={handleCart}><FiShoppingCart />ADD TO CART</button>
                        <button class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700" onClick={handleBuyNow}>BUY NOW</button>
                        <button class="px-5 py-2  bg-gray-700 text-white rounded-md hover:bg-gray-800"><FaRegHeart /></button>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}


export default ProductPage