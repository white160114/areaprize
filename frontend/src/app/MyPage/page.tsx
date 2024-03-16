'use client'

import { useState, useEffect } from 'react'
import style from '@/styles/MyPage/mypage.module.scss'


import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Tab from '@/components/Tab';
import Card from '@/components/Card';

const userDataUrl ="https://areaprize.kurumimnm.net/user/data";
const userUrl = "https://areaprize.kurumimnm.net/data/USERS";
const rankUrl ="https://areaprize.kurumimnm.net/data/RANKS";



const fetchData= async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
const fetchAllData = async () => {
    const [userworkData,usersData,rankData] = await Promise.all([
        fetchData(userDataUrl),
        fetchData(userUrl),
        fetchData(rankUrl),

        
    ]);
    return { userworkData, usersData, rankData};
};


export default function MyPage() {
    // formのアコーディオンを実装するstate
    const [accordion, setAccordion] = useState(false)

    //Data
    const [userworkData, setUserworkData ] = useState<any[]>([]);
    const [usersData, setUsersData] =  useState<any[]>([]);
    const [rankData, setRankData] = useState<any[]>([]);

    //Culums
    const [userId,setUserId] = useState<number[]>([]);
    const [userData,setUserData] = useState<any[]>([]);
    const [userWorks,setUserWorks] = useState<any[]>([]);
    const [userBookmarks,setUserBookmarks] = useState<any[]>([]);

    //login[値変えたらログインしてる人も変わるよ。]
    const [loginid, setLoginId] = useState<number>(0); 

    useEffect(() => {
        const fetchDataAndUpdate = async () => {
            try {
                const { userworkData, usersData, rankData} = await fetchAllData();

                const userIds = userworkData.map((userData: any) => userData.user_id); //user_id
                const userData = userworkData.map((userData: any) => userData.data); //userの情報
                const userWorks = userworkData.map((userData: any) => userData.works); //userの作品
                const userBookmarks = userworkData.map((userData: any) => userData.bookmarks); //userのbookmark
    
                const updatedLoginId = usersData[loginid].user_id -1;
                console.log(loginid);
                console.log(usersData[loginid].user_id);
                console.log(usersData[loginid].rank_point);





            
                setUserworkData(userworkData);
                setUserId(userIds);
                setUserData(userData);
                setUserWorks(userWorks);
                setUserBookmarks(userBookmarks);
                setUsersData(usersData);
                setLoginId(updatedLoginId);
                setRankData(rankData);


            } catch (error) {
                console.error('エラー！！！！！！:', error);
            }
        };

        fetchDataAndUpdate();
        const intervalId = setInterval(fetchDataAndUpdate, 10000);
        return () => clearInterval(intervalId);
    }, []);


    // ブックマークされた作品のコンポーネントの部分で以下のように変更します
userBookmarks[loginid]?.map((bookmark: any) => {
    // ブックマークされた作品のID
    const bookmarkedWorkId = bookmark.work_id;

    // ブックマークされた作品のIDと一致する作品を探す
    const correspondingWork = userWorks[loginid]?.find((work: any) => work.work_id === bookmarkedWorkId);

    if (correspondingWork) {
        // 対応する作品が見つかった場合、その作品の作成者のユーザーIDを取得
        const creatorUserId = correspondingWork.user_id;

        // 作成者の情報を取得
        const creatorInfo = userData.find((user: any) => user.data[0].user_id === creatorUserId);
        
        // 作成者のアイコンと名前を取得
        const creatorIcon = creatorInfo?.data[0].profile_icon;
        const creatorName = creatorInfo?.data[0].user_name;

        return (
            <Card
                key={bookmark.work_id}
                iconImage={creatorIcon}
                userName={creatorName}
                rankIcon={userData[loginid][0]?.rank_icon}
                titleImage={bookmark.title_image}
                workName={bookmark.work_name}
            />
        );
    } else {
        // 対応する作品が見つからなかった場合は何も表示しない
        return null;
    }
})

    
    return (
        <>
            <div className={style.myPageWrap}>

                {/* 作ったcomponentを挿入 */}
                <Header />

                <form action="" className={style.formBox}>
                    <div className={style.formTop}>
                        {/* 自分のアイコンのComponentを挿入 */}
                        <div className={style.iconBox}>
                            <figure>
                                <img src={usersData[loginid]?.profile_icon} alt="" />
                            </figure>
                        </div>
                        <div className={style.formContent}>
                          <label htmlFor="">ユーザーネーム</label>
                            <input type="text" defaultValue={usersData[loginid]?.user_name || ''} />
                           
                           
                        </div>
                        {/* 編集するかしないかで表示する矢印の方向を変える */}
                        {!accordion &&
                            <FaAngleDown
                                className={style.icon}
                                onClick={() => setAccordion(true)}
                            />
                        }
                        {accordion &&
                            <FaAngleUp
                                className={style.icon}
                                onClick={() => setAccordion(false)}
                            />
                        }
                    </div>
                    {accordion &&
                        <div className={style.formBottom}>
                            <div className={style.formContent}>
                                <label htmlFor="">メールアドレス</label>


                                <input type="text"  defaultValue={usersData[loginid]?.mail || ''}  /> 
                                

                            </div>
                            <div className={style.btnBox}>
                                <button
                                // onClick={}
                                >編集</button>
                            </div>
                        </div>
                    }
                </form>

                {/* ランクを表示するコンテンツ */}
                <div className={style.rankBox}>
                    <p>現在のランク</p>
                    <div className={style.rankContent}>
                        <figure>
                        <img src={userData[loginid]?.[0]?.rank_icon} alt="" />
                        </figure>
                        <div className={style.meterBox}>
                            <div className={style.meter}>
                                <div
                                    className={style.gauge}
                                    style={{ width:'50%', height: '100%' }}
                                ></div>
                            </div>
                        </div>
                        <figure>
                            <img src="/image/3Master.svg" alt="" />
                        </figure>
                    </div>
                </div>


        <Tab
                tab01='あなたの過去の記録'
                tab02='いいねした作品'
                children01={
        userWorks[loginid]?.map((work: any) => (
            <Card
                key={work.work_id}
                iconImage={usersData[loginid]?.profile_icon}
                userName={usersData[loginid]?.user_name}
                rankIcon={userData[loginid][0]?.rank_icon}
                titleImage={work.title_image} />
        ))
    }
    //TODO:値べた書き直す
    children02={
        userBookmarks[loginid]?.map((bookmark: any) => (
            <Card
                key={bookmark.work_id}
                iconImage={usersData[1]?.profile_icon}
                userName={usersData[1]?.user_name}
                rankIcon={userData[1][0]?.rank_icon}
                titleImage={bookmark.title_image}
                workName={bookmark.work_name}
            />
        ))
    }
/>


                <Footer />
            </div>
        </>
    )
}