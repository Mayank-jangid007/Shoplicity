import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Outlet } from 'react-router';

function Category() {
  const { categoryName } = useParams() // jo yha name diya hai categoryName wo apan ko route ke path me bhi sane dena pdega // or apan isko destructure kr rhe hai categoryName ko multipale usl se name le skte hai apan or isme jo anme aega na wo aega jha se navigate huwa na usme apane to= "" isme jo name diya tha na wo aega idhar   
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState([])
  const [originalProducts, setOriginalProducts] = useState([])
  const [filter, setFilter] = useState([])
  const [toggleGender, setToggleGender] = useState(false)
  const [toggleDiscount, setToggleDiscount] = useState(false)
  const [toggleRating, setCustomerRatings] = useState(false)
  // const [discount, setDiscount] = useState([])

  const navigate = useNavigate()


  const handleDiscountChange = (value) => {
    setFilter((prev) => {
      if (prev?.includes(value)) { // agar prev me value include krti hai to ye kro // ? iska mtlb hai ki agar prev nhi hota hai to error nhi aegi  ye check krlega 
        return prev.filter((dis) => dis !== value) //  to apan isme ye kr rhe hai ki agar jo value previous wale se match nhi kr rhi hai mtlb alrady exist nhi krti to usko lelo jo match kr jae usko mat lo
      }

      // AGAR VALUE MATCH NHI KRTI TO VALUE KO ADD KRDO ARRAY ME 
      return [...prev, value]
    })

  }

  const handleRating = (value) => {
    setFilter((prev) => {
      if (prev?.includes(value)) {
        return prev.filter((item) => item !== value)
      }

      return [...prev, value]
    })
  }

  const handleGender = (value) => {
    setFilter((prev) => {
      if (prev?.includes(value)) {
        return prev.filter((item) => item !== value)
      }

      return [...prev, value]
    })
  }

  const handleRemove = (value) => {
    // console.log("----",value);
    // setFilter((prev) => prev? prev.filter((ele) => ele !== value ) : prev) // jo item se value nhi ho value usko lelo jo ho jae usko mat lo 
    setFilter((prev) => prev?.filter((ele) => ele !== value)) // jo item se value nhi ho value usko lelo jo ho jae usko mat lo 
  }


  const [minValue, setMinValue] = useState(5); // Default minimum value
  const [maxValue, setMaxValue] = useState(25); // Default maximum value

  // const piceArr = [1000,1500,2000,2500,3000,]
  const piceArr = [5, 10, 15, 20, 25]
  const Discount = ["10", "20", "30", "40", "50", "70",]
  const rating = [3, 4]
  const gender = ["Men", "Women", "Unisex"]

  const min = 5; // Minimum limit
  const max = 25; // Maximum limit
  const step = 5; // Step size

  const handleMinChange = (e) => {
    const value = Math.min(parseInt(e.target.value), maxValue - step); // minValue kabhi maxValue ke equal ya zyada na ho.    
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(parseInt(e.target.value), minValue + step); // Ensure maxValue is greater than minValue
    setMaxValue(value);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
        setProduct(response.data.products);
        setOriginalProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    // const fetchCategoryProducts = async () => { 
    //   const options = {
    //     method: 'GET',
    //     url: 'https://api.freeapi.app/api/v1/public/randomproducts',
    //     params: {
    //       page: '1',
    //       limit: '200',
    //       inc: 'category%2Cprice%2Cthumbnail%2Cimages%2Ctitle%2Cid%2C%20quantity',
    //       query: 'mens-watches'
    //     },
    //     headers: {accept: 'application/json'}
    //   };

    //   try {
    //     const { data } = await axios.request(options);
    //     console.log(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    const loadData = async () => {
      await fetchCategoryProducts();
      // await fetchRandomProducts();
    };

    loadData();
  }, [categoryName])

  useEffect(() => {
    const filterProducts = () => { // to agar api allow krti sidha filter in api to apan ye manually filter nhi krte mtlb apan ko niche jo filter kiya hai wo nhi krna pdta sidha api me dalke dicpunt or ye wo dedeta or usme loader bhi laga dete apni api sport nhi krti sefha filter krna
      // setLoading(true) 

      // Extract discount values from the filter
      const dis = filter.filter(item => item.includes("%")).map(item => Number(item.replace("%", "")));
      // Extract rating values from the filter
      const rateInNumber = filter.filter(item => item.includes("★ & above")).map(item => Number(item.replace("★ & above", "")));

      // Filter products based on discount
      const discountFiltered = dis.length > 0 ? product.filter(item => dis.some(ele => item.discountPercentage >= ele)) : originalProducts;

      // Filter products based on rating
      const ratingFiltered = rateInNumber.length > 0 ? discountFiltered.filter(item => rateInNumber.some(ele => item.rating >= ele)) : discountFiltered;

      // Filter products based on price
      const priceFiltered = (minValue !== null && maxValue !== null) ? ratingFiltered.filter(item => item.price >= minValue && item.price <= maxValue) : ratingFiltered;

      // Set the final filtered products
      setProduct(priceFiltered);
      // setLoading(false)
      console.log("---** Final Filtered Products:", priceFiltered);
    };

    filterProducts();
  }, [filter, minValue, maxValue,]);

  if (loading) {
    return <div className='w-full h-full bg-slate-500/30 flex justify-center items-center'>Loading...</div>;
  }


  return (
    <>
      {loading ? <h1 className='text-white'>Loading...</h1> :
        <div className='w-full min-h-screen overflow-hidden bg-dark-primary dark:bg-light-secondary flex flex-row-reverse '>
          <Outlet />
          <div className='w-[20%] mt-6 rounded-lg h-fit bg-dark-secondary dark:bg-light-tertiary p-2 '>

            <div className='border-b border-white/20 h-fit p-2'>
              <div className='flex justify-between items-center'>
                <h1 className='text-white dark:text-light-six h-fit text-2xl font-bold'>Filter</h1>
                <p className='text-white dark:text-light-six hover:text-white/60'>Clear All</p>
              </div>

              {/* Selected category*/}
              <div className='h-fit transition-all duration-500 ease-in flex w-full overflow-y-auto gap-2 flex-wrap mt-4'>
                {filter?.map((item, index) => (
                  <div key={index} className='flex justify-between items-center w-fit p-1 h-10 bg-white rounded-xl'>
                    <p>{item}</p>
                    <RxCross2 onClick={() => handleRemove(item)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Gender section */}
            <div className='w-full mt-3 h-fit border-b border-white/20 ' onClick={() => setToggleGender(!toggleGender)}>
              <div className={`flex gap-2 h-10 relative items-center text-white dark:text-light-six`}>
                <h1>Gender</h1>
                <RiArrowDropDownLine className={`text-2xl absolute right-0  transition-all duration-300 ease-in-out ${toggleGender ? "rotate-180" : "rotate-0"}`} />
              </div>
              <div className={`flex  ${toggleGender ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-500 ease-in-out flex-col gap-2 pb-2 text-white`}>
                {gender.map((item, index) => (
                  <div className='flex gap-2 relative text-white text-lg' onClick={(e) => e.stopPropagation()}>
                    <input type={'checkbox'} checked={filter.includes(item)} key={index} onClick={() => handleGender(item)} />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Discount Section*/}
            <div className='w-full mt-3 h-fit border-b border-white/20' onClick={() => setToggleDiscount(!toggleDiscount)}>
              <div className={`flex gap-2 h-10 relative items-center text-white dark:text-light-six`}>
                <h1>Discount</h1>
                <RiArrowDropDownLine className={`text-2xl absolute right-0  transition-all duration-300 ease-in-out ${toggleDiscount ? "rotate-180" : "rotate-0"}`} />
              </div>
              <div onClick={(e) => e.stopPropagation()} className={`flex  ${toggleDiscount ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}  overflow-y-auto transition-all duration-500 ease-in-out flex-col gap-2 pb-2 text-white`}>
                {Discount.map((item, index) => (
                  <div className='flex gap-2 relative text-white dark:text-light-six text-lg'>
                    <input type={'checkbox'} key={index} checked={filter?.includes(`${item}%`)} onClick={() => handleDiscountChange(`${item}%`)} />
                    <label>{item}%</label>
                  </div>
                ))}
              </div>
            </div>

            {/*Customer Ratings Section*/}
            <div className='w-full mt-3 h-fit border-b border-white/20 ' onClick={() => setCustomerRatings(!toggleRating)}>
              <div className={`flex gap-2 h-10 relative items-center text-white dark:text-light-six`}>
                <h1>Customer Ratings</h1>
                <RiArrowDropDownLine className={`text-2xl absolute right-0  transition-all duration-300 ease-in-out ${toggleRating ? "rotate-180" : "rotate-0"}`} />
              </div>
              <div onClick={(e) => e.stopPropagation()} className={`flex  ${toggleRating ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}  overflow-y-auto transition-all duration-500 ease-in-out flex-col gap-2 pb-2 text-white `}>
                {rating.map((item, index) => (
                  <div className='flex gap-2 relative text-white dark:text-light-six text-lg' key={index} onClick={() => handleRating(`${item}★ & above`)}>
                    <input type={'checkbox'} checked={filter.includes(`${item}★ & above`)} /> {/*ye cheked me ye isliye likha hai taki jab ye filterd vale section se hta de rating to yha se bhi check hat jae*/}
                    <label>{item}★ & above</label>
                  </div>

                ))}
              </div>
            </div>

            {/* Price Section*/}
            <div className='flex flex-col w-full mt-3 h-fit border-b border-white/20 '>
              <div className={`relative flex justify-between w-full gap-2 h-10 items-center text-white dark:text-light-six`}>
                <h1>Price</h1>
                <p className="absolute right-0">Clear</p>
              </div>
              <div className="flex flex-col gap-2 py-2 items-center">

                {/* PRICE RANGE */}
                <div className="flex flex-col items-center p-2 bg-gray-800 dark:bg-light-five text-white rounded-lg w-full max-w-md shadow-md">
                  <form className='flex gap-2 mb-9'>
                    <select name="cars" className='bg-gray-700 dark:bg-light-tertiary text-white dark:text-light-six rounded-lg p-1' value={minValue} onChange={(e) => setMinValue(Number(e.target.value))} >
                      <option value={minValue} >{minValue}</option>
                      {piceArr.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                      ))}
                    </select>

                    <label>To</label>

                    <select name="cars" className='bg-gray-700 dark:bg-light-tertiary  text-white dark:text-light-six rounded-lg p-1' value={maxValue} onChange={(e) => setMaxValue(Number(e.target.value))} >
                      <option value={maxValue} >{maxValue}</option>
                      {piceArr.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                      ))}
                    </select>
                  </form>

                  {/* Range Slider */}
                  <div className="relative w-full">
                    {/* Input for Minimum */}
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={minValue}
                      onChange={handleMinChange}
                      className="absolute z-20 w-full h-2 bg-transparent appearance-none pointer-events-auto"
                    />
                    {/* Input for Maximum */}
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={maxValue}
                      onChange={handleMaxChange}
                      className="absolute z-20 w-full h-2 bg-transparent appearance-none pointer-events-auto"
                    />

                    {/* Slider Track */}
                    <div className="relative w-full h-2 bg-gray-600 rounded-full">
                      <div
                        className="absolute h-2 bg-blue-500 dark:bg-light-six rounded-full"
                        style={{
                          left: `${((minValue - min) / (max - min)) * 100}%`,
                          right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex gap-5 w-full text-white text-sm px-2">
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                      <span className='text-white'>.</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 dark:bg-light-six rounded-lg hover:bg-blue-700 transition"
                    onClick={() =>
                      alert(`Selected Price Range: ₹${minValue} - ₹${maxValue}`)
                    }
                  >
                    Apply Range
                  </button>
                </div>

              </div>
            </div>
          </div>


          {/*Cards Section*/}
          <div className='w-[80%] h-full bg-wh p-6'>
            {/* Grid Container */}
            <div className="grid grid-cols-1 ml-11 sm:grid-cols-2 md:grid-cols-4 gap-6">

              {/* Product Card */}
              {product.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-secondary dark:bg-light-five p-3 rounded-lg duration-200"
                  onClick={() => navigate(`product/${encodeURIComponent(item.title)}`, { state: { id: item.id, item: item } })}  // to encodeURIComponent ye kya krta hai ki jo bhi khali sapce hote hai na name me to usko fill krdeta hai sepecial charater se or khali sapce url me error deta ahi
                >
                  {/* Image */}
                  <img
                    src={item.images[0]} c
                    alt="Product"
                    className="w-full h-48 object-cover rounded-md"
                  />

                  {/* Product Info */}
                  <div className="mt-4">
                    {/* Product Name */}
                    <h3 className="text-lg font-semibold text-white dark:text-light-six truncate">
                      {item.title} {index + 1}
                    </h3>

                    {/* Price and Discount */}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-medium text-white dark:text-light-six">₹{item.price}</p>
                      <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-md">
                        {item.discountPercentage}% OFF
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white mt-3 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Sizes */}
                    <div className="mt-3">
                      <p className="text-sm font-medium text-white">Sizes:</p>
                      <div className="flex gap-2 mt-1">
                        {["S", "M", "L", "XL"].map((size, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 border rounded-md text-white border-gray-300"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
          {/* <Outlet /> */}

        </div>
      }
    </>
  )
}

export default Category