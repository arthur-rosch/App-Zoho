import { Router } from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { QueryContextProvider } from './context/context'

function App({data}) {
 return(
    <QueryContextProvider>
      <BrowserRouter>   
        <Router />
      </BrowserRouter>
    </QueryContextProvider>
 )
}
export default App;
