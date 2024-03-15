import { useEffect, useState } from 'react';
import style from "@/styles/components/card.module.scss";
import PhotoIcon from "@/components/Icon";


interface PropsType {
    id?:number;
    iconImage?:string;
    titleImage?:string;
    userName?:string;
    workName?:string;
    rankIcon:string;

}

const Card = (props: PropsType) => {
    
    const { iconImage,userName,titleImage,workName ,rankIcon} = props;
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
                            <img src={rankIcon} alt='rank'/>
                        </figure>
                    </div>
                </div>
                <div className={style.user_evaluation}>
                    <div className={style.bookmark}>
                        <input onClick={handleBookmarkClick} type="image" src='/image/bookmark.png' alt="bookmark"/>
                    </div>
                    <div className={style.like}>
                        <input onClick={handleLikeClick} type="image" src='/image/like.png' alt="like"/>
                    </div>
                </div>
            </div>
            <div className={style.contents}>
                <figure>
                    <img className='bookmark' src={titleImage} alt={workName} />
                </figure>
            </div>
        </div>
    );
};

export default Card;


// "use client";

// import { useEffect, useState } from 'react';
// import style from "@/styles/components/card.module.scss";
// import PhotoIcon from "@/components/Icon";

// const url = "https://areaprize.kurumimnm.net/data/all";

// const fetchData = async () => {
//     const response = await fetch(url);
//     const all_data = await response.json();
//     return all_data;
// };

// //interface
// interface PropsType{
//  index:number;
// }

// const Card =(props:PropsType) =>{
//     //ユーザー名:USERS[user_name]
//     const [userNames, setUserNames] = useState<string[]>([]);
//     //説明:WORKS[title_image]
//     const [titleImage, setTitleImage] = useState<string[]>([]);

//     useEffect(() => {
//         const fetchDataAndUpdateUserNames = async () => {
//         const data: any = await fetchData();

//         const names = data.USERS.map((user: any) => user.user_name);
//         const  explanation= data.WORKS.map((works: any) => works.explanation);
//         const  titleImage= data.WORKS.map((works: any) => works.title_image);


//         setUserNames(names);
//         setTitleImage(titleImage);
//         fetchDataAndUpdateUserNames();
//         const intervalId = setInterval(fetchDataAndUpdateUserNames, 10000); 
//         return () => clearInterval(intervalId); 
//     }, []); 


//         const {index,}=props;
//         const defaultStyle ={
//             index :0,
//         }
//     console.log("コンソールログ！！！！！！！"+titleImage[index]);
//     return (
//     <>
//         <div className={style.wrap}>
//             <div className={style.user_wrap}>
//                 <div className={style.userIcon}>
//                     <PhotoIcon src="/image/ArianaGrande.jpg" altText="ArianaGrande" size={80} />
//                 </div>
//                 <h2 className={style.userName}>{userNames[index]}</h2>
//             </div>
//             <div className={style.contents}><image href={titleImage[index]}/></div>
            
//         </div>
//     </>
//     );

// };
// export default Card;