import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../Card';
import Button from '../../Button';
import Input from '../../Input';
import Text from '../../Text';
import './Products.scss';
import MultiDropdown from '../../MultiDropdown';
import Pagination from '../../Pagination';
import ArrowDownIcon from '../../icons/ArrowDownIcon';

function Products() {
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const handleChange = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.escuelajs.co/api/v1/products',
      });

      setProducts(
        result.data.map((raw) => ({
          id: raw.id,
          title: raw.title,
          contentSlot: raw.price,
          captionSlot: raw.category.name,
          image: raw.images[0],
          subTitle: raw.description,
        })),
      );
    };

    fetch();
  }, []);

  const lastProductsIndex = currentPage * productsPerPage;
  const firstProductsIndex = lastProductsIndex - productsPerPage;
  const currentProducts = products.slice(firstProductsIndex, lastProductsIndex);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <div className="products-wrapper wrapper">
      <div className="info">
        <Text className="info__title" view="title">
          Products
        </Text>
        <Text className="info__content" view="p-20">
          We display products based on the latest products we have, if you want <br />
          to see our old products please enter the name of the item
        </Text>
      </div>
      <div className="search-wrapper">
        <search className="search">
          <Input className="search__input" value={value} onChange={handleChange} placeholder="Search Product"></Input>
          <Button className="search__button" loading={false}>
            Find Now
          </Button>
        </search>
        <MultiDropdown className="dropDown" value={[]} getTitle={() => 'Filter'} onChange={() => null} options={[]} />
      </div>
      <div className="products">
        <div className="products__total">
          <Text className="products__total-text" view="title">
            Total Product
          </Text>
          <span className="products__total-value">{products.length}</span>
        </div>
        <div className="products__items">
          {currentProducts.map((product) => (
            <Card
              url={`/product/${product.id}`}
              className="products__item"
              key={product.id}
              title={product.title}
              image={product.image}
              subtitle={product.subTitle}
              captionSlot={product.captionSlot}
              contentSlot={`$${product.contentSlot}`}
              actionSlot={<Button>Buy Now</Button>}
            />
          ))}
        </div>
        <div className="products__pagination">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
