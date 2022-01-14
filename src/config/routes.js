//Layout
//import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin Page

//Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Error404 from "../pages/Error404";
import Breedslist from "../pages/Breedslist";
import FilterBreed from "../pages/FilterBreed";

const routes=[
    {
        path: "/",
        layout: LayoutBasic,
        component: Home
    },
    {
        path: "/contact",
        layout: LayoutBasic,
        component: Contact
    },
    {
        path: "/breedslist",
        layout: LayoutBasic,
        component: Breedslist
    },
    {
        path: "/filterbreed",
        layout: LayoutBasic,
        component: FilterBreed
    },
    {
        path: "*",
        layout: LayoutBasic,
        component: Error404
    }
]

export default routes;