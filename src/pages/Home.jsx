import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router"


function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimation, setIsAnimation] = useState(false);
  const navigate = useNavigate();

  console.log("----",products);
  
  
  const imgObject = [
    {
      img: "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      id: 1,
    },
    {
      img: "https://images.unsplash.com/photo-1462212210333-335063b676bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hhaXJ8ZW58MHx8MHx8fDA%3D",
      id: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1499096382193-ebb232527fee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
      id: 3,
    },
    {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlZHxlbnwwfHwwfHx8MA%3D%3D",
      id: 4,
    },
    {
      img: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBwbGV8ZW58MHx8MHx8fDA%3D",
      id: 5,
    },
    {
      img: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBwbGV8ZW58MHx8MHx8fDA%3D",
      id: 6,
    },
    {
      img: "https://images.unsplash.com/photo-1619948543232-c515a389c22d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwcGxlfGVufDB8fDB8fHww",
      id: 7,
    },
  ];

  useEffect(() => {
    const main = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");

        // setProducts(response.data.slice(0, 2)); // silce a[an isliye kr rhe hia kyuki aan ko 2 hi image chahiye isse apan ko do product mil jaenge]
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    main();

  }, []);

  const category = products.reduce((acc, items) => {
    // if(!acc.includes(item.category)){ // accumulator me item.category(abhi manlo pehle itretion me category ayi hogi "shoes" too wo) included nhi hai acc me to krdo push acc me fhir next wale me sale shoes catagory agyi to psuh nhi hogi khali acc ko reutnr krdenge jesa hai wesa hai
    //   acc.push(item.category)
    // }
    const isCategoryPresent = acc.some((item) => item.category === items.category); // to pehle to acc ek empty array hai to pehli bar chala apane ne check kra ki acc me category hai kya nhi hai to push krdo uske baad dusri bar check kra hai lekin is bar acc me hai previous wala ye revious wala isliye aya kyuki apnne canditioin di thi ki agar  isCategoryPresent match nhi hoti hai to add kro acc me items

    // If not present, add the object
    if (!isCategoryPresent) {
      acc.push(items);
    }

    return acc;

  }, []); // to yha pan jo chese accumulator ko dena chahte hai wo dete hai jese abhi mai empty arrray dena chahta hu ya agr empty obejct ya value jese 0 1  fhir wo intial value hoti hai accumulator ki


  const handleNext = (e) => {
    // manlo prevIndex 2 hai  prevIndex + 1 = 3,  3 % 20 = 3 , to koi bhi bde no se apan mod krte hai chote no ko same hi ata hai mtlb 5 % 20 to 20 5 ko devide nhi kr skta to iska remender me 5 hi aega
    //or jese hi mnale prevIndex = 20 hai to 20 % 20 = 0 to ye wapas se ab start hojaega 0 se
    if (isAnimation) return; // Agar animation chal rahi hai, to kuch mat karo
    setIsAnimation(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex !== 4 ? prevIndex + 1 : (prevIndex = 0 % imgObject.length)
      );
      setIsAnimation(false);
    }, 700);
  };

  const handlePrivious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgObject.length - 2 : prevIndex - 1
    ); // manlo prevIndex = 0 to true hogya  to ye 20 me se -1 mtlb ki 19 ulta chalne lag jaega
  };

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen bg-dark-primary  dark:bg-light-primary flex justify-center items-center">Loading...</div>
      ) : (
        <div className="relative w-full h-full bg-dark-primary dark:bg-light-secondary p-4 overflow-auto">
          {/* <Outlet /> */}
          {/*  Featured section */}
          <ul className="w-[98%] flex gap-2 h-[25rem] rounded-2xl overflow-hidden p-3 ml-9">
            {imgObject
              .slice(currentIndex, currentIndex + 3)
              .map((data, index) => (
                <motion.li
                  key={data.id}
                  className="h-full bg-slate-50 rounded-lg overflow-hidden"
                  initial={{
                    width: index === 2 ? "0%" : index === 0 ? "70%" : "30%",
                  }} // to isme index 2 hai mtlb third wala li usko de diya 0 width or index 1 ko li hai pehle wala ali usko de di 70 or third ko 30 width
                  animate={{
                    width: isAnimation
                      ? index === 0
                        ? "0%"
                        : index === 1
                        ? "70%"
                        : "30%"
                      : index === 0
                      ? "0%"
                      : index === 1
                      ? "70%"
                      : "30%",
                  }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                  <img
                    className="object-fill object-center w-full h-full"
                    src={data ? data.img : " "}
                    alt="Shoplicity Logo"
                  />
                  {/* <p>{loading ? <h1>Loading...</h1> : false}</p> */}
                </motion.li>
              ))}
          </ul>

          {/* Next img btn*/}
          <div className="absolute w-[30%] h-20 bg-black/10 backdrop-blur-md top-[20rem] left-20 rounded-2xl overflow-hidden p-3">
            <div className="absolute flex left-3 gap-3 items-center">
              <img
                alt="image"
                className="w-14 h-14 rounded-md"
                src="https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D"
              />
              <p className="text-white"></p>
            </div>
            <div className="absolute flex right-3 overflow-hidden gap-3 top-5">
              <button
                onClick={handlePrivious}
                className="p-3 text-white rounded-full bg-black/30 backdrop-blur-md"
              >
                <FaAngleLeft />
              </button>

              <p className="mt-2 text-white">{`${currentIndex}/${
                imgObject.length - 2
              }`}</p>

              <button
                onClick={(e) => handleNext(e)}
                className="p-3 text-white rounded-full bg-black/30 backdrop-blur-md"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          {/* grid section */}
          <div className="relative ml-28 my-16 w-[80%]">
            <div className="grid grid-rows-2 gap-3 w-[50%] text-white">
              {imgObject.slice(0, 2).map((item) => (
                <div className="relative rounded-3xl h-36 overflow-hidden bg-white">
                  <h2 className="absolute top-2 left-2 text-2xl font-bold">
                    GET UP TO 50% OFF
                  </h2>
                  <button className="absolute bottom-3 right-10 text-black p-2 bg-white rounded-full text-sm">
                    Get Dicount
                  </button>
                  <img src={item.img} className="w-full h-full" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3  w-[50%]">
              {imgObject.slice(0, 2).map((item) => (
                <div className="rounded-3xl overflow-hidden h-[14rem]">
                  <img
                    src={item.img}
                    alt="Product 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="absolute top-0 right-0 w-[50%] pl-2">
              <div className="relative grid grid-cols-2 gap-3">
              {imgObject.slice(3, 5).map((item) => (
                  <div className="rounded-3xl h-[22rem] overflow-hidden ">
                    <img
                      src={item.img}
                      className="w-full h-full object-cover"
                    />
                    <h2 className="absolute text-2xl font-bold top-5 left-1 text-white">
                      GET UP TO 50% OFF
                    </h2>
                    <p className="absolute text-2xl top-12 left-1" onClick={() => navigate}>
                      Get Discount
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-blue-200 col-span-2 rounded-3xl overflow-hidden">
                  <img
                    src={imgObject[6].img}
                    className="w-full h-44 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Top Offers*/}
          <div className="w-[95.5%] h-[388px] p-3 bg-dark-secondary dark:bg-light-five ml-14 my-16 rounded-3xl">
            <div className="w-full h-16 bg-dark-tertiary  dark:bg-light-six flex justify-between rounded-full overflow-hidden items-center px-4">
              <h2 className="font-bold text-2xl text-white">Top Offers</h2>
              <button className="w-10 h-10 bg-white/25 rounded-full text-white dark:text-light-six text-center text-lg pl-3">
                <MdNavigateNext />
              </button>
            </div>

            <div className="grid grid-cols-6 mt-5 overflow-x-auto p-2 gap-52 no-scrollbar">
              {/* {products.slice(0, 6).map((items) => ( */}
              {category.map(items => (
                <div
                  className="rounded-2xl overflow-hidden w-48 dark:bg-light-tertiary ring ring-white/40 dark:ring-light-six p-4 text-center"
                  key={items.id} 
                  onClick={() => navigate(`category/${items.category}`)}
                > 
                  <img
                    src={items.images[0]}
                    className="w-44 h-44 rounded-2xl object-cover bg-white"
                  />
                  <p className="text-white dark:text-light-six mt-2">{items.category}</p>
                  <p className="font-bold text-white dark:text-light-six">60-50% off</p>
                </div>
                ))}
              {/* ))} */}
            </div>
          </div>

          {/* cards section */}

          <div className="w-[95.5%] grid grid-cols-3 p-6 gap-6 bg-dark-secondary  dark:bg-light-five ml-14 my-16 rounded-3xl">
            {/* card-1 */}
            <div className="p-3 bg-dark-secondary dark:bg-light-tertiary rounded-2xl w-full ring ring-white/20 dark:ring-light-six">
              <div className="w-full h-16 mb-5 bg-dark-tertiary dark:bg-light-six flex justify-between rounded-full overflow-hidden items-center px-4">
                <h2 className="font-bold text-2xl text-white dark:text-light-tertiary">
                  HandPickes for you
                </h2>
                <button className="w-10 h-10 bg-white/25 rounded-full text-white  text-center text-lg pl-3">
                  <MdNavigateNext />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5 p-2">
                {products.slice(0, 4).map((item) => (
                  <div className="rounded-2xl overflow-hidden w-full ring ring-white/40 dark:ring-light-six p-4 text-center">
                    <img
                      src={item.images[0]}
                      className="w-32 h-32 rounded-2xl object-cover bg-white"
                    />
                    <p className="text-white dark:text-light-six mt-2">{item.title}</p>
                    <p className="font-bold text-white dark:text-light-six">{item.discountPercentage}% off</p>
                  </div>
                ))}
              </div>
            </div>

            {/* card-2 */}
            <div className="p-3 bg-dark-secondary dark:bg-light-tertiary rounded-2xl w-full ring ring-white/20 dark:ring-light-six">
              <div className="w-full h-16 mb-5 bg-dark-tertiary dark:bg-light-six flex justify-between rounded-full overflow-hidden items-center px-4">
                <h2 className="font-bold text-2xl text-white dark:text-light-tertiary">
                  Flipcart's finest yours now!
                </h2>
                <button className="w-10 h-10 bg-white/25 rounded-full text-white text-center text-lg pl-3 dark:text-light-six">
                  <MdNavigateNext />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-5 p-2">
                {products.slice(9, 13).map((item) => (
                  <div className="rounded-2xl overflow-hidden w-full ring ring-white/40 dark:ring-light-six p-4 text-center">
                    <img
                      src={item.images[0]}
                      className="w-32 h-32 rounded-2xl object-cover bg-white dark:text-light-six"
                    />
                    <p className="text-white dark:text-light-six mt-2">{item.title}</p>
                    <p className="font-bold text-white dark:text-light-six">{item.discountPercentage}% off</p>
                  </div>
                ))}
              </div>
            </div>

            {/* card-3 */}
            <div className="p-3 bg-dark-secondary dark:bg-light-tertiary rounded-2xl w-full ring ring-white/20 dark:ring-light-six">
              <div className="w-full h-16 mb-5 bg-dark-tertiary dark:bg-light-six flex justify-between rounded-full overflow-hidden items-center px-4">
                <h2 className="font-bold text-2xl text-white dark:text-light-tertiary">
                  Finest Gear To Stay Fit
                </h2>
                <button className="w-10 h-10 bg-white/25 rounded-full text-white text-center text-lg pl-3">
                  <MdNavigateNext />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5 p-2">
                {products.slice(4, 8).map((item) => (
                  <div className="rounded-2xl overflow-hidden w-full ring ring-white/40 dark:ring-light-six p-4 text-center">
                    <img
                      src={item.images[0]}
                      className="w-32 h-32 rounded-2xl object-cover bg-white"
                    />
                    <p className="text-white dark:text-light-six mt-2">{item.title}</p>
                    <p className="font-bold text-white dark:text-light-six">{item.discountPercentage}% off</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
