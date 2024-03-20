'use client'
import { useEffect, useState } from 'react';
import style from "@/styles/PastWork/pastwork.module.scss"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Tab from "@/components/Tab"
import Card from "@/components/Card"

const themeUrl="https://areaprize.kurumimnm.net/theme/data";
const categoryUrl = "https://areaprize.kurumimnm.net/data/CATEGORY";
const userUrl = "https://areaprize.kurumimnm.net/data/USERS";
const rankUrl = "https://areaprize.kurumimnm.net/data/RANKS";
const workUrl = "https://areaprize.kurumimnm.net/work/data";





const fetchData= async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
const fetchAllData = async () => {
    const [themeData, categoryData,usersData,rankData,workData] = await Promise.all([
        fetchData(themeUrl),
        fetchData(categoryUrl),
        fetchData(userUrl),
        fetchData(rankUrl),
        fetchData(workUrl),


    
    ]);
    return { themeData, categoryData,usersData,rankData ,workData};
};


// 最もgoodが多い作品を取得する関数
    const findMostLikedWorksByCategory = (works: any[]) => {
        let mostLikedWorks: any[] = [];
    
        // カテゴリごとに最もgoodが多い作品を見つける
        works.forEach((theme: any) => {
        if (theme.works.length > 0) {
            // 最もgoodが多い作品を探す
            let mostLikedWork = theme.works.reduce((prev: any, current: any) => {
            return (prev.good > current.good) ? prev : current;
            });
    
            // 見つかった作品を配列に追加
            mostLikedWorks.push(mostLikedWork);
        }
        });
    
        console.log(mostLikedWorks)
        return mostLikedWorks;
    };


    
export default function PastWork() {

    const [themeData, setThemeData] = useState<any[]>([]);
    const [themeName, setThemeName] = useState<any[]>([]);
    const [themeDate, setThemeDate] = useState<any[]>([]);
    const [themeWork, setThemeWork] = useState<any[]>([]);

    const [categoryName, setCategoryName] = useState<any[]>([]);

    const [usersData, setUserData] = useState<any[]>([]);
    const [rankData, setRankData] = useState<any[]>([]);
    const [workData, setWorkData] = useState<any[]>([]);



    const [userName, setUserName] = useState<any[]>([]);


    useEffect(() => {
        const fetchDataAndUpdate = async () => {
            try {
                const { themeData,  categoryData,usersData,rankData,workData} = await fetchAllData();
                //themeData
                const themeName = themeData.map((theme:any)=>theme.theme_name);
                const themeDate = themeData.map((theme:any)=>theme.date);
                const themeWork = themeData.map((theme:any)=>theme.works);

                //categoryData
                const categoryName =categoryData.map((category: any) => category.category_name);

                //user
                const userName = usersData.map((user:any)=>user.user_name);


                // console.log(categoryName);
                setThemeData(themeData);
                setThemeName(themeName);
                setThemeDate(themeDate);
                setCategoryName(categoryName);
                setThemeWork(themeWork);
                setUserData(usersData);
                setUserName(userName);
                setRankData(rankData);
                setWorkData(themeWork);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndUpdate();
        const intervalId = setInterval(fetchDataAndUpdate, 10000);
        return () => clearInterval(intervalId);
    }, []);



    // カテゴリごとの最もgoodが多い作品を取得
    const mostLikedWorksByCategory = findMostLikedWorksByCategory(themeData);

    const getCategoryWorks = (categoryId: number) => {
        const works = workData.find((workCategory: any) => workCategory.category_id === categoryId)?.work_data || [];
        return works.map((work: any) => {
            const user = usersData.find((user: any) => user.user_id === work.made_by);
            const rankIcon = getRankIcon(user.rank_point);
            return (
                <Card key={work.work_id} id={work.work_id} iconImage={user.profile_icon} userName={user?.user_name} rankIcon={rankIcon} titleImage={work.title_image} />
            );
        });
    };


    const getRankIcon = (rankPoint: number) => {
        for (let i = 0; i < rankData.length; i++) {
            const rank = rankData[i];
            if (rankPoint >= rank.low_point && rankPoint <= rank.high_point) {
                return rank.icon;
            }
        }
        return "";
    };

    //TODO:書き直す(同じ値入れてるだけです)
    return (
        <>
        
        <div className={style.PastWork_wrap}>
        <Header />
            <div>{themeDate[0]}</div>
            <div> 「{themeName[0]}」</div>
            <Tab  tab01={categoryName[0]}
                children01={
                    <div>
                            {mostLikedWorksByCategory.map((work: any) => {
                                // 作品に関連するユーザー情報を取得
                                const user = usersData.find((user: any) => user.user_id === work.user_id);
                                return (
                                    <Card
                                        key={work.work_id[0]}
                                        iconImage={user?.profile_icon}
                                        workName={work.work_name}
                                        titleImage={work.title_image}
                                        rankIcon={getRankIcon(user?.rank_point)}
                                        userName={user?.user_name}
                                    />
                                );
                            })}
                        </div>
                
                }
                tab02={categoryName[1]}
                children02={ <div>
                    {mostLikedWorksByCategory.map((work: any) => {
                        // 作品に関連するユーザー情報を取得
                        const user = usersData.find((user: any) => user.user_id === work.user_id);
                        return (
                            <Card
                                key={work.work_id[0]}
                                iconImage={user?.profile_icon}
                                workName={work.work_name}
                                titleImage={work.title_image}
                                rankIcon={getRankIcon(user?.rank_point)}
                                userName={user?.user_name}
                            />
                        );
                    })}
                </div>}
                />
                            <Footer />
        </div>
        
        </>
    )
}