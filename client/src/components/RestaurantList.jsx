import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContex';
import { useNavigate } from 'react-router-dom';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);

    let navigate = useNavigate();

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (err) {}
        };

        fetchData();
        }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }
        ))
        } catch (err) {}
    };

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`);
    };

    const handleRestauranrSelect = (id) => {
        navigate(`/restaurants/${id}`);
    }

  return (
    <div className='list-group '>
        <table className="table table-hover table-dark">
            <thead className='text-center'>
                <tr className="bg-primary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price range</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {restaurants && restaurants.map(restaurant => {
                    return(
                    <tr onClick={() => handleRestauranrSelect(restaurant.id)} key = {restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{("$".repeat(restaurant.price_range))}</td>
                        <td>Reviews</td>
                        <td><button onClick={((e) => handleUpdate(e, restaurant.id))} className="btn btn-warning">Update</button></td>
                        <td><button 
                            onClick={(e) => handleDelete(e, restaurant.id)} 
                            className="btn btn-danger">Delete</button></td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList

