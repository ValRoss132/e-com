import { useEffect, useState } from 'react';
import { ProductData, ProductType } from '../Products';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Text from '../../Text';
import './Product.scss';
import Button from '../../Button';
import Card from '../../Card';
import Loader from '../../Loader';

export type Filter = {
  category: { id: number };
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedItems, setRelatedItem] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.escuelajs.co/api/v1/products/' + `${id}`,
      });
      const res = await axios({
        method: 'get',
        url: 'https://api.escuelajs.co/api/v1/products',
      });

      setRelatedItem(res.data.filter((item) => item.category.id === result.data.category.id).slice(0, 3));
      setProduct(result.data);
    };

    fetch();
  }, [id]);

  if (JSON.stringify(product) === JSON.stringify({}))
    return (
      <div className="load">
        <Loader />
      </div>
    );

  return (
    <div className="product-wrapper wrapper">
      <Link to="/">
        <div className="backBtn">
          <div className="backBtn__icon">
            <ArrowDownIcon width={32} height={32} viewBox="0 0 24 24" color="primary" />
          </div>
          <div className="backBtn__text">Назад</div>
        </div>
      </Link>
      <div className="product-container">
        <div className="container">
          <div className="container__image">
            <img
              className="product-image"
              style={{ background: `no-repeat center/contain url(${product.images[0]})` }}
            />
          </div>
          <div className="content">
            <div className="content__text">
              <Text className="content__title" view="title">
                {product.title}
              </Text>
              <Text className="content__subtitle" view="p-20" color="secondary">
                {product.description}
              </Text>
            </div>
            <div className="action-container">
              <span className="action-container__price">{`$${product.price}`}</span>
              <div className="btns">
                <Button className="btns__buy">Buy Now</Button>
                <Button className="btns__add">Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relatedItem">
          <Text className="relatedItem__text" view="title">
            Realted Item
          </Text>
          <div className="relatedItem__items">
            {relatedItems.map((item) => (
              <Card
                url={`/product/${item.id}`}
                className="products__item"
                key={item.id}
                title={item.title}
                image={item.images[0]}
                subtitle={item.subTitle}
                captionSlot={item.captionSlot}
                contentSlot={`$${item.contentSlot}`}
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
