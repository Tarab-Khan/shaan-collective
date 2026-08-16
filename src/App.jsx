import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import OpeningAnimation from "./components/OpeningAnimation";
import Main from "./pages/Main";
import Gharara from "./pages/Gharara";
import WomenCollection from "./pages/WomenCollection";
import MenCollection from "./pages/MenCollection";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductProvider } from "./context/ProductContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import Jewellery from "./pages/Jewellery";
import JewelleryDetails from "./pages/JewelleryDetails";
import Accessories from "./pages/Accessories";
import AccessoryDetails from "./pages/AccessoryDetails";
import Men from "./pages/Men";
import MenDetails from "./pages/MenDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Shipping from "./pages/Shipping";
import SizeGuidePage from "./pages/SizeGuidePage";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const location = useLocation();

  const [showOpening, setShowOpening] = useState(() => {
    // Animation only belongs to the Main/Home page
    if (location.pathname !== "/") {
      return false;
    }

    const navigation = performance.getEntriesByType("navigation")[0];

    // Show when opening the domain or refreshing the Main page
    return (
      navigation?.type === "navigate"  // (or can add) ||  navigation?.type === "reload
    );
  });

  return (
    <>
      {showOpening && (
        <OpeningAnimation
          onComplete={() => setShowOpening(false)}
        />
      )}

      <Routes>

        {/* Main Website */}
        <Route
          path="/"
          element={<Main />}
        />

        {/* All Ghararas */}
        <Route
          path="/ghararas"
          element={<Gharara />}
        />

        {/* Women Collection */}
        <Route path="/women/:occasion" element={<WomenCollection />} />
        
        {/* Men Collection */}
        <Route path="/men/collection/:occasion" element={<MenCollection />} />

        {/* Gharara Categories */}
        <Route
          path="/ghararas/bridal"
          element={
            <Gharara
              category="Bridal"
              title="BRIDAL GHARARAS"
            />
          }
        />

        <Route
          path="/ghararas/wedding"
          element={
            <Gharara
              category="Wedding"
              title="WEDDING GHARARAS"
            />
          }
        />

        <Route
          path="/ghararas/festive"
          element={
            <Gharara
              category="Festive"
              title="FESTIVE GHARARAS"
            />
          }
        />

        <Route
          path="/ghararas/party"
          element={
            <Gharara
              category="Party"
              title="PARTY GHARARAS"
            />
          }
        />

        {/* Individual Product */}
        <Route
          path="/ghararas/:id"
          element={<ProductDetails />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={<Payment />}
        />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* Jewellery */}
        <Route
          path="/jewellery"
          element={<Jewellery />}
        />

        {/* Jewellery Details */}
        <Route
          path="/jewellery/:id"
          element={<JewelleryDetails />}
        />

        {/* Accessories */}
        <Route
          path="/accessories"
          element={<Accessories />}
        />

        {/* Accessories Details */}
        <Route
          path="/accessories/:id"
          element={<AccessoryDetails />}
        />

        {/* Men */}
        <Route
          path="/men"
          element={<Men />}
        />

        {/* Men Details */}
        <Route
          path="/men/:id"
          element={<MenDetails />}
        />

        {/* Footer Information Pages */}
        <Route
          path="/about"
          element={<AboutUs />}
        />
        <Route
          path="/contact"
          element={<ContactUs />}
        />
        <Route
          path="/shipping"
          element={<Shipping />}
        />
        <Route
          path="/size-guide"
          element={<SizeGuidePage />}
        />

        {/* ATELIER ADMIN CONSOLE */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
                        
      </Routes>
    </>
  );
}


function App() {
  return (
    <ProductProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </ProductProvider>
  );
}

export default App;