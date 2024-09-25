import Restaurants from "./components/Restaurants";
import Foods from "./components/Foods";
import Orders from "./components/Orders";
import { 
  Route,
  Routes,
 } from "react-router-dom";
import './App.css'

const App = () => {

  return (
    <Routes>
        <Route
          exact 
          path="/restaurants"
          element={<Restaurants />}
          />
        <Route
          exact 
          path="/restaurants/:restaurantsId/foods"
          element={<Foods />}
        />
        <Route
          exact 
          path="/orders"
          element={<Orders />} 
        />
    </Routes>
  )
}

export default App
