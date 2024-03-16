import { useEffect, useState } from 'react';
import style from "@/styles/components/card.module.scss";
import PhotoIcon from "@/components/Icon";


interface PropsType {
    id?: number;
    iconImage?: string;
    titleImage?: string;
    userName?: string;
    workName?: string;
    rankIcon: string;

}

const Card = (props: PropsType) => {

    const { iconImage, userName, titleImage, workName, rankIcon } = props;
    const handleBookmarkClick = () => {
        // ブックマークがクリックされたときの処理を記述する
    };

    const handleLikeClick = () => {
        // いいねボタンがクリックされたときの処理を記述する
    };


    return (
        <div className={style.wrap}>
            <div className={style.user_wrap}>
                <div className={style.user_data}>
                    <div className={style.userIcon}>
                        <PhotoIcon src={iconImage || "/image/ArianaGrande.jpg"} size={80} />
                    </div>
                    <p className={style.userName}>{userName}</p>
                    <div className={style.rank}>
                        <figure>
                            <img src={rankIcon} alt='rank' />
                        </figure>
                    </div>
                </div>
                <div className={style.user_evaluation}>
                    <div className={style.bookmark}>
                        <input onClick={handleBookmarkClick} type="image" src='/image/bookmark.png' alt="bookmark" />
                    </div>
                    <div className={style.like}>
                        <input onClick={handleLikeClick} type="image" src='/image/like.png' alt="like" />
                    </div>
                </div>
            </div>
            <div
                className={style.contents}
                onClick={() => location.href = '/Detailed'}
            >
                <figure>
                    <img className='bookmark' src={titleImage} alt={workName} />
                </figure>
            </div>
        </div>
    );
};

export default Card;

