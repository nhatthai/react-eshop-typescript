import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogPage, OrderPage, AboutPage } from './pages/';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { OrderDetailPage } from './pages/order/order-detail/OrderDetailPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<CatalogPage />}>
            <Route index element={<CatalogPage />} />
          </Route>
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
