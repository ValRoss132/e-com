import React, { useState } from 'react';
import Text from '../Text';
import classes from './Card.module.scss';
import { Link } from 'react-router-dom';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;

  url: string;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  url,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <div className={`${classes.card} ${className}`} onClick={onClick}>
      <Link className={classes.link} to={url}></Link>
      <div className={!isImageLoaded ? classes.def : ''}>
        <img className={classes.img} src={image} alt=" " onLoad={() => setIsImageLoaded(true)} />
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.textContainer}>
          {captionSlot && (
            <Text className="caption" view="p-14" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text className="title" view="p-20" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text className="subtitle" view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={classes.footerContainer}>
            <Text className="content" view="p-18" weight="bold">
              {contentSlot}
            </Text>
            {actionSlot && <div className={classes.button}>{actionSlot}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
