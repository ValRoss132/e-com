/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import Card from '../../Card';
import Button from '../../Button';
import Input from '../../Input';
import Text from '../../Text';
import classes from './Products.module.scss';
import MultiDropdown from '../../MultiDropdown';
import Pagination from '../../Pagination';
import { observer } from 'mobx-react-lite';
import ProductsStore from '../../../store/ProductsStore';
import { useLocalStore } from '../../../utils/useLocalStore';
import Loader from '../../Loader';
import { Meta } from '../../../utils/meta';
import PaginationStore from '../../../store/PaginationStore/PaginationStore';

const Products: React.FC = () => {
  const productsStore = useLocalStore(() => new ProductsStore());
  const paginationStore = useLocalStore(() => new PaginationStore(productsStore));

  useEffect(() => {
    productsStore.getProductList();
  }, [productsStore]);

  const [value, setValue] = useState<string>('');

  const handleChange = (value: string) => {
    setValue(value);
  };

  if (productsStore.meta === Meta.loading) {
    return (
      <div className={classes.load}>
        <Loader />
      </div>
    );
  }

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
          <span className={classes.value}>{productsStore.list.length}</span>
        </div>
        <div className={classes.items}>
          {paginationStore.currentProducts.map((product) => (
            <Card
              url={`/product/${product.id}`}
              className={classes.item}
              key={product.id}
              title={product.title}
              image={product.images[0]}
              subtitle={product.description}
              captionSlot={product.category.name}
              contentSlot={`$${product.price}`}
              actionSlot={<Button>Buy Now</Button>}
            />
          ))}
        </div>
        <div className={classes.pagination}>
          <Pagination
            totalPages={paginationStore.totalPages}
            paginate={paginationStore.paginate}
            currentPage={paginationStore.currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Products);
