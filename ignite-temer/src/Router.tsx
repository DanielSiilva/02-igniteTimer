import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { History } from "./pages/Histoty";
import { Home } from "./pages/Home";


export function Router (){


    return (

        <Routes>
            <Route path="/"  element={<Home />}/>
            <Route path="/history"  element={<History />}/>
        </Routes>
    )
}