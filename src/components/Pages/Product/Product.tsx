import { useEffect, useState } from 'react';
// import { ProductType } from '../Products';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Text from '../../Text';
import classes from './Product.module.scss';
import Button from '../../Button';
import Card from '../../Card';
import Loader from '../../Loader';
import { ProductType } from '../../../store/ProductsStore/types';

export type Filter = {
  category: { id: number };
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [relatedItems, setRelatedItem] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await Promise.all([
        axios.get(`https://api.escuelajs.co/api/v1/products/${id}`),
        axios.get('https://api.escuelajs.co/api/v1/products'),
      ]);

      setRelatedItem(
        result[1].data.filter((item: Filter) => item.category.id === result[0].data.category.id).slice(0, 3),
      );
      setProduct(result[0].data);
    };

    fetch();
  }, [id]);

  if (JSON.stringify(product) === JSON.stringify({}) || product === undefined)
    return (
      <div className={classes.load}>
        <Loader />
      </div>
    );

  return (
    <div className={`${classes.productWrapper} wrapper`}>
      <Link to="/">
        <div className={classes.backBtn}>
          <div className={classes.icon}>
            <ArrowDownIcon width={32} height={32} viewBox="0 0 24 24" color="primary" />
          </div>
          <div className={classes.text}>Назад</div>
        </div>
      </Link>
      <div className={classes.productContainer}>
        <div className={classes.container}>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={product.images[0]}
              style={{ background: `no-repeat center/contain url(${product.images[0]})` }}
            />
          </div>
          <div className={classes.content}>
            <div className={classes.contentText}>
              <Text className="content__title" view="title">
                {product.title}
              </Text>
              <Text className="content__subtitle" view="p-20" color="secondary">
                {product.description}
              </Text>
            </div>
            <div className={classes.actionContainer}>
              <span className={classes.price}>{`$${product.price}`}</span>
              <div className={classes.btns}>
                <Button className="btns__buy">Buy Now</Button>
                <Button className={classes.addBtn}>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.relatedItem}>
          <Text className="relatedItem__text" view="title">
            Realted Item
          </Text>
          <div className={classes.relatedItems}>
            {relatedItems.map((item) => (
              <Card
                url={`/product/${item.id}`}
                className={classes.productItem}
                key={item.id}
                title={item.title}
                image={item.images[0]}
                subtitle={item.description}
                captionSlot={item.category.name}
                contentSlot={`$${item.price}`}
                actionSlot={<Button>Buy Now</Button>}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
