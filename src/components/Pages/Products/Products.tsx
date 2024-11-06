import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../Card';
import Button from '../../Button';
import Input from '../../Input';
import Text from '../../Text';
import classes from './Products.module.scss';
import MultiDropdown from '../../MultiDropdown';
import Pagination from '../../Pagination';

export type ProductData = {
  id: number;
  title: string;
  contentSlot: number;
  subTitle: string;
  images: string[];
  captionSlot: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  category: { name: string };
  description: string;
  images: string[];
};

const productsPerPage = 9;

function Products() {
  const [value, setValue] = useState<string>('');
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
        result.data.map((raw: ProductType) => ({
          id: raw.id,
          title: raw.title,
          contentSlot: raw.price,
          captionSlot: raw.category.name,
          images: raw.images,
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
    <div className={`${classes.productsWrapper} wrapper`}>
      <div className={classes.info}>
        <Text className={classes.title} view="title">
          Products
        </Text>
        <Text className={classes.content} view="p-20">
          We display products based on the latest products we have, if you want <br />
          to see our old products please enter the name of the item
        </Text>
      </div>
      <div className={classes.searchWrapper}>
        <search className={classes.search}>
          <Input className="search__input" value={value} onChange={handleChange} placeholder="Search Product"></Input>
          <Button className={classes.button} loading={false}>
            Find Now
          </Button>
        </search>
        <MultiDropdown
          className={classes.dropDown}
          value={[]}
          getTitle={() => 'Filter'}
          onChange={() => null}
          options={[]}
        />
      </div>
      <div className={classes.products}>
        <div className={classes.total}>
          <Text className={classes.text} view="title">
            Total Product
          </Text>
          <span className={classes.value}>{products.length}</span>
        </div>
        <div className={classes.items}>
          {currentProducts.map((product) => (
            <Card
              url={`/product/${product.id}`}
              className={classes.item}
              key={product.id}
              title={product.title}
              image={product.images[0]}
              subtitle={product.subTitle}
              captionSlot={product.captionSlot}
              contentSlot={`$${product.contentSlot}`}
              actionSlot={<Button>Buy Now</Button>}
            />
          ))}
        </div>
        <div className={classes.pagination}>
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
