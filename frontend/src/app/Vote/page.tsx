'use client';
import { useEffect, useState } from 'react';
import style from "@/styles/Vote/vote.module.scss"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Tab from "@/components/Tab"
import Card from "@/components/Card"

const categoryUrl = "https://areaprize.kurumimnm.net/data/CATEGORY";
const workUrl = "https://areaprize.kurumimnm.net/work/data";
const userUrl = "https://areaprize.kurumimnm.net/data/USERS";
const rankUrl = "https://areaprize.kurumimnm.net/data/RANKS";

const fetchData= async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const fetchAllData = async () => {
    const [categoryData, workData, userData, rankData] = await Promise.all([
        fetchData(categoryUrl),
        fetchData(workUrl),
        fetchData(userUrl),
        fetchData(rankUrl),
    ]);
    return { categoryData, workData, userData, rankData };
};

export default function Vote() {
    // Data(Table)
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [workData, setWorkData] = useState<any[]>([]);
    const [userData, setUserData] = useState<any[]>([]);
    const [rankData, setRankData] = useState<any[]>([]);
    // Columns
    const [categoryName, setCategoryName] = useState<string[]>([]);

    useEffect(() => {
        const fetchDataAndUpdate = async () => {
            try {
                const { categoryData, workData, userData, rankData } = await fetchAllData();
                setCategoryData(categoryData);
                setWorkData(workData);
                setUserData(userData);
                setRankData(rankData);
                setCategoryName(categoryData.map((category: any) => category.category_name));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndUpdate();
        const intervalId = setInterval(fetchDataAndUpdate, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const getCategoryWorks = (categoryId: number) => {
        const works = workData.find((workCategory: any) => workCategory.category_id === categoryId)?.work_data || [];
        return works.map((work: any) => {
            const user = userData.find((user: any) => user.user_id === work.made_by);
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

    return (
        <div className={style.wrap}>
            <Header />
            <div>旅の記録</div>
            <div>お題</div>
            <Tab
                tab01={categoryName[0]}
                children01={<div>{getCategoryWorks(1)}</div>}
                tab02={categoryName[1]}
                children02={<div>{getCategoryWorks(2)}</div>}
            />
            <Footer />
        </div>
    );
}
