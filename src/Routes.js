import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/default";
import Home from "./pages/Home";
import Teste from "./pages/Teste";


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/teste" element={<Teste/>}/>
      </Route>
    </Routes>
  );
}