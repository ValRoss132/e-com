/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Text from '../../Text';
import classes from './Product.module.scss';
import Button from '../../Button';
import Card from '../../Card';
import Loader from '../../Loader';
import { observer } from 'mobx-react-lite';
import { useLocalStore } from '../../../utils/useLocalStore';
import ProductsStore from '../../../store/ProductsStore';
import { Meta } from '../../../utils/meta';

const Product: React.FC = () => {
  const productsStore = useLocalStore(() => new ProductsStore());
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      productsStore.getProductById(id).then(() => productsStore.getRelatedProducts(productsStore.item.category.id));
    }
  }, [id, productsStore]);

  const product = productsStore.item;

  if (productsStore.meta === Meta.loading)
    return (
      <div className={classes.load}>
        <Loader />
      </div>
    );

  return (
    <div className={`${classes.productWrapper} wrapper`}>
      <Link to={`/products/1`}>
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
            <img className={classes.image} src={product.images[0]} />
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
            {productsStore.list.map((item) => (
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

export default observer(Product);
