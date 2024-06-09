import React from 'react';

import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './routes_new/Home';
import UpdatePage from './routes_new/UpdatePage';
import RestaurantDetailPage from './routes_new/RestaurantDetailPage';
import { RestaurantsContextProvider } from './context/RestaurantsContex';

const App = () => {
    return ( 
        <RestaurantsContextProvider>
            <div className='container'>
            <Router>
                <Routes>
                <Route exact path="/" Component={Home}/>
                <Route exact path="/restaurants/:id/update" Component={UpdatePage}/>
                <Route exact path="/restaurants/:id" Component={RestaurantDetailPage}/>

                </Routes>
            </Router>
            </div>  
        </RestaurantsContextProvider>
  
)};

export default App;