import {Outlet} from "react-router-dom";
import Header from "./Header";


function Layout() {
  return (
    <main className="app">
        <Header/>
        <Outlet/>     
    </main>
  )
}

export default Layout
