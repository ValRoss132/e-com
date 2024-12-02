import Products from './components/Pages/Products';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Product from './components/Pages/Product';
import './styles/styles.css';
import Categories from './components/Pages/Categories/Categories';
import AboutPage from './components/Pages/AboutPage/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/product">
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
