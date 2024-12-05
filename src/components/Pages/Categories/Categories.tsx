/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import Card from '../../Card';
import classes from './Categories.module.scss';
import CategoriesStore from '../../../store/CategoriesStore';
import { useLocalStore } from '../../../utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { Meta } from '../../../utils/meta';
import Loader from '../../Loader';

const Categories: React.FC = () => {
  const categoryStore = useLocalStore(() => new CategoriesStore());

  useEffect(() => {
    categoryStore.getCategoryList();
  }, [categoryStore]);

  if (categoryStore.meta === Meta.loading) {
    return (
      <div className={classes.load}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className={classes.items}>
        {categoryStore.list.map((product) => (
          <Card
            url={`/product/${product.id}`}
            className={classes.item}
            key={product.id}
            image={product.image}
            title={product.name}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(Categories);
