import React from 'react';

import Text from '../Text';

import './Card.css';

import '../../styles/styles.css';

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
}) => {
	return (
		<div className={`card ${className}`} onClick={onClick}>
			<img src={image} alt="" />
			<div className="content-container">
				<div className="text-container">
					{captionSlot && (
						<Text
							className="caption"
							view="p-14"
							weight="medium"
							color="secondary"
						>
							{captionSlot}
						</Text>
					)}
					<Text
						className="title"
						view="p-20"
						weight="medium"
						maxLines={2}
					>
						{title}
					</Text>
					<Text
						className="subtitle"
						view="p-16"
						color="secondary"
						maxLines={3}
					>
						{subtitle}
					</Text>
				</div>
				{(contentSlot || actionSlot) && (
					<div className="footer-container">
						<Text className="content" view="p-18" weight="bold">
							{contentSlot}
						</Text>
						{actionSlot && <>{actionSlot}</>}
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
