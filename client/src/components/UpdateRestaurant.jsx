import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';


const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateRestaurant = await RestaurantFinder.put(`${id}`, {
            name,
            location,
            price_range: priceRange
        });
        console.log(updateRestaurant);
        navigate("/");
    }

    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            // console.log(response.data.data);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        };

        fetchData();
    }, []);

  return (
    <div>
        <form action="">

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} id='name' className='form-control' type="text"  />
            </div>

            <div className="form-group">
                <label htmlFor="name" className='mt-3'>Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} id='location' className='form-control' type="text" />
            </div>

            <div className="form-group">
                <label htmlFor="name" className='mt-3'>Price Range</label>
                <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id='price_range' className='form-control' type="number" />
            </div>

            <button onClick={handleSubmit} className='btn btn-primary mt-3'>Update</button>
        </form>
    </div>
    
  )};

export default UpdateRestaurant
