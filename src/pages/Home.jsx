import { useState, useEffect } from "react";
// import Spinner from "../components/Spinner";
// import Product from "../components/Product";
import imageLady from "../assets/machines/homepageLady.webp";
import grinder1 from "../assets/machines/grinder1.webp";
import grinder2 from "../assets/machines/grinder2.webp";
import grinder3 from "../assets/machines/grinder3.webp";
import Card from "../components/Card";
import routine from "../assets/machines/routine.webp";
import taste from "../assets/machines/taste.webp";
import EnjoyLife from "../assets/machines/EnjoyLife.webp"
import compare from "../assets/machines/compare.webp"


const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);

    try{
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    }
    catch(error) {
      console.log("Error aagya ji");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
  },[])

  return (
    <div>
      {/* section 1 */}
      <div className="flex gap-6">
        
        {/* <div>
        {
          loading ? <Spinner />  :
          posts.length > 0 ? 
          (<div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
            {
              posts.map( (post) => (
              <Product key = {post.id} post={post}/>
            ) )
            }

          </div>) :
          <div className="flex justify-center items-center">
            <p>No Data Found</p>
          </div> 
        }
        </div> */}


        <div className=""><img src={imageLady} alt="home" width="1235px"/></div>
          <div className="flex flex-col p-20 bg-orange-50 justify-center gap-7">
            <p className="font-extrabold text-4xl leading-snug">Empowering Health & Wellness</p>
            <p className="text-lg  leading-8">Your Trusted Online Medical Resource</p>
            <button className="flex font-extrabold bg-slate-900 w-fit p-3 text-white justify-start">See Medical Data </button>
          </div>
      </div>

      {/* section 2 */}
      <div className="flex flex-col items-center mt-28 gap-10 mb-16">
          <div className="flex flex-col gap-8 items-center">
              <p className="text-slate-800 font-extrabold text-3xl">Your Health Hub </p>
              <p className="leading-6 text-center">Welcome to our comprehensive online medical platform dedicated to providing reliable information, <br />esources, and support to enhance your health journey. <br />Explore our site to take control of your health and embark on a path to a happier, healthier life. </p>
          </div>
          <div className="flex gap-3">
            <Card thumbnail = {grinder1} itemName={"Everherb Karela Jamun Juice"} itemDescription={"EverHerb Karela Jamun Juice is formulated with the extracts of Karela or bitter gourd and the whole Jamun fruit. Since ancient times, Karela and Jamun juice have been used to keep blood sugar levels steady. Bitter gourd is a natural blood-sugar controller and has been used by Ayurvedic doctors for centuries to help diabetes patients. When used along with appropriate medication, a healthy diet and regular exercise, EverHerb Karela Jamun Juice for diabetes can be helpful as it keeps blood glucose levels in check."} btnText={"Buy"}/>
            <Card thumbnail = {grinder2} itemName={"B-Protin Chocolate Nutrition"} itemDescription={"B-Protin Powder is a nutritional health drink ideal for kids as well as older people. It is enriched with a blend of nutrients that ensure a continuous supply of amino acids. It contains soy, whey, and casein and is one of the best nutritional supplements in the market as well as highly recommended by doctors. It is available in different flavours such as mango, banana and vanilla and tastes delicious"} btnText={"Buy"}/>
            <Card thumbnail = {grinder3} itemName={"Liveasy Essentials Paper"} itemDescription={"Powder is a nutritional health drink ideal for kids as well as older people. It is enriched with a blend of nutrients that ensure a continuous supply of amino acids. It contains soy, whey, and casein and is one of the best nutritional supplements in the market as well as highly recommended by doctors. It is available in different flavours such as mango, banana and vanilla and tastes delicious"} btnText={"Buy"}/>
          </div>
      </div>

      {/* section 4 */}
      <div className="flex gap-5 m-16">
          <div className="flex flex-col w-[50%] bg-orange-50 justify-center pl-14 gap-7">
            <p>Your One-Stop Medical Destination</p>
            <p className="font-extrabold text-4xl leading-snug">Navigating Wellness.</p>
            <p className="text-md leading-8">At our platform, we're harnessing the power of blockchain to transform the landscape of healthcare delivery, making it more secure, transparent, and patient-centric than ever before.</p>
            <button className="flex font-extrabold bg-slate-900 w-fit p-3 text-white justify-start">See Medical Data</button>
          </div>
          <div className="w-[50%]"><img src={compare} alt="home"/></div>
      </div>
      
       {/* section 4 */}
      <div className=" mt-28 flex flex-col items-center gap-10">
        <div>
          <p className="text-slate-800 font-extrabold text-3xl">Health Made Simple: Accessible Information for All</p>
        </div>
        <div className="flex gap-3">
            <Card thumbnail = {routine} itemName={"Shelcal 500mg Strip "} itemDescription={" Very few food products are good sources of vitamin D, like cod liver oil, cheese and egg yolk"} btnText={"Buy"}/>
            <Card thumbnail = {taste} itemName={"Hairbless Health Supplement"} itemDescription={"Very few food products are good sources of vitamin D, like cod liver oil,"} btnText={"Buy"}/>
            <Card thumbnail = {EnjoyLife} itemName={"Evion 400mg Strip"} itemDescription={"Evion 400 mg is a vitamin supplement that is taken to help prevent a vitamin E deficiency. It also has antioxidant properties for some diseases. Vitamin E is the active ingredient in Evion capsule, and it keeps the cells of the body healthy. Vitamin E is a fat-soluble nutrient that is found in many food items"} btnText={"Buy"}/>
          </div>
      </div>
    </div>
  );
};

export default Home;
