import './App.scss';
import Products from './components/Pages/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Product from './components/Pages/Product';

function App() {
  console.log();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product">
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
