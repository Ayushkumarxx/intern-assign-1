import Onboard from "../pages/Onboard";
import Home from "../pages/Home";

import plane from "../assets/images/plane.png";

import BottomNavigation from "../components/Home/BottomNavigation";
let Exports = {
    pages: {
        Onboard: Onboard,
        Home: Home
    },
    images: {
        plane: plane
    },
    components: {
        BottomNavigation: BottomNavigation
    }
};

export default Exports;