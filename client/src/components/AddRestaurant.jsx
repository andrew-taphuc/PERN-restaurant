import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContex';

const AddRestaurant = () => {
  const{addRestaurants} = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range : priceRange
      })
      addRestaurants(response.data.data.restaurant)
      console.log(response);
    } catch (err) {
        console.log(err);
    }
  }
  return (
    <div className='mb-4'>
      <form action="" className='mx-4'>
        <div className="form-row">
            <div className="row">
                <div className="col">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='form-control' placeholder='Name'/>
                </div>
                <div className="col">
                    <input value={location} onChange={(e) => setLocation(e.target.value)}type="text" className='form-control' placeholder='Location' />
                </div>
                <div className="col">
                    <select 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(e.target.value)}
                      className='form-control '>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="col-auto">
                    <button 
                    onClick = {handleSubmit}
                    type='submit'
                    className="btn btn-primary btn-m text-center">ADD</button>
                </div>
            </div>    
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
