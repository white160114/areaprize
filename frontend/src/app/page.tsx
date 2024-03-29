'use client'


import { useState, useEffect } from 'react'
import Image from "next/image";
import style from "./page.module.scss";

import { FaRegLightbulb } from "react-icons/fa";
import Tab from '@/components/Tab'
import Card from '@/components/Card'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Modal } from '@/components/Modal'

import { SiStyledcomponents } from 'react-icons/si';


type Props = {
  tabText: string,
  step: string
}

const url = 'https://areaprize.kurumimnm.net/data/all';
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



export default function Home() {
  // 解説のするときのTabcomponentを作成
  function Tabs(props: Props) {

    const [state, setState] = useState({
      tabText: props.tabText
    })

    return (
      <>
        <div className={style.caption}>
          <span>
            <FaRegLightbulb />
            step{props.step}
          </span>
          <p>{props.tabText}</p>
        </div>
      </>
    )
  }


  // アップロードMOdalの表示
  const [modal, setModal] = useState(false)

  // Modalの内容を表示
  function onClose() {
    setModal(false)
  }


  const [userNames, setUserNames] = useState<string[]>([]);
  const [testData, setTestData] = useState<string[]>([]);


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


  // アップロード処理

  const [formData, setFormData] = useState({
    work_name: "",
    category_id: "",
    explanation: "",
    technical_points: "",
    title_image: "",
  });

  async function onSubmit(event: any) {
    event.preventDefault();

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
      // if (key === "title_image") {
      //   formDataToSend.append(key, value); // ファイルの場合、appendメソッドを使用して追加
      // } else {
      //   formDataToSend.append(key, value);
      // }
    });

    console.log(formData);

    const response = await fetch(url, {
      method: "POST",
      body: formDataToSend,
    });
    const data = await response.json();
    console.log("response=>", data);
  }

  function handleInputChange(event: any) {
    const { name, value, files } = event.target;
    if (name === "title_image" && files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  return (
    <>
      {modal &&
        <Modal isOpen={modal}>
          <div className={style.modalWrap}>
            <div className={style.head}>
              <button
                className={style.backBtn}
                onClick={onClose}
              >＜戻る</button>
              <h4>アップロード</h4>
            </div>
            <form onSubmit={onSubmit} className={style.formBox}>
              <div className={style.detaWrap}>
                <div className={style.detaBox}>
                  <label htmlFor="">webサイト</label>
                  <input
                    type="radio"
                    name="category_id"
                    value={1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style.detaBox}>
                  <label htmlFor="">グラフィック</label>
                  <input
                    type="radio"
                    name="category_id"
                    value={2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={style.detaBox}>
                <label htmlFor="">作品名</label>
                <input
                  type="text"
                  name="work_name"
                  placeholder="作品名"
                  value={formData.work_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.detaBox}>
                <label htmlFor="">作品説明</label>
                <input
                  type="text"
                  name="explanation"
                  placeholder="説明"
                  value={formData.explanation}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.detaBox}>
                <label htmlFor="">技術的ポイント</label>
                <input
                  type="text"
                  name="technical_points"
                  placeholder="技術的説明"
                  value={formData.technical_points}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style.detaBox}>
                <label htmlFor="">サムネ画像</label>
                <input type="file" name="title_image" onChange={handleInputChange} />
              </div>
              <button
                type="submit"
                onClick={() => setModal(false)}
              >送信</button>
            </form>
          </div>
        </Modal>
      }


      <div className={style.homeWrap}>

        <Header />

        <div className={style.mainView}>
          <img src="image/FlameLeft.svg" alt="lefttop" />
          <div className={style.mainViewContent}>
            <div className={style.mainViewContentBox}>
              <h2>
                <figure>
                  <img src="image/areaprize.svg" alt="logo" />
                </figure>
              </h2>
              <p>地域の良さを発信し、想像力を磨く旅へ</p>
            </div>
            <figure>
              <img src="image/JapanMap.svg" alt="japanMap" />
            </figure>
          </div>
          <img src="image/FlameRight.svg" alt="rightbottom" />
        </div>

        <div className={style.explanationBox}>
          <div className={style.captionBox}>
            <span></span>
            <h3>旅の計画</h3>
            <span></span>
          </div>
          <div className={style.explanation}>
            <div className={style.explanationContent}>
              <Tabs tabText='旅の行き先がランダムに選ばれるよ！' step='1' />
              <figure>
                <img src="image/Step1.svg" alt="" />
              </figure>
            </div>
            <div className={style.explanationContent}>
              <figure>
                <img src="image/Step2.svg" alt="" />
              </figure>
              <Tabs tabText='選ばれた場所に旅に出よう！' step='2' />
            </div>
            <div className={style.explanationContent}>
              <Tabs tabText='旅の思い出を記録しよう！' step='3' />
              <figure>
                <img src="image/Step3.svg" alt="" />
              </figure>
            </div>
            <div className={style.explanationContent}>
              <figure>
                <img src="image/Step4.svg" alt="" />
              </figure>
              <Tabs tabText='仲間の旅の記録を評価しよう！' step='4' />
            </div>
            <figure>
              <img src="image/rank.svg" alt="" />
            </figure>
          </div>
        </div>

        <div className={style.themeBox}>
          <div className={style.leftBox}>
            <div></div>
            <div></div>
          </div>
          <div className={style.textBox}>
            <p>今回旅する都道府県は...</p>
            {/* TODO h2にはお題の内容をいれる */}
            <h2>「愛媛県の特産物」</h2>
            <ul className={style.list}>
              <li>3/1 お題決定、エントリー開始</li>
              <li>3/4 エントリー締め切り</li>
              <li className={style.acc}>~</li>
              <li>3/24 作品アップロード</li>
              <li>3/25 投票開始</li>
              <li>月末 投票締め切り</li>
            </ul>
            <div className={style.btnBox}>
              <button
                className={style.btn}
                onClick={() => setModal(true)}
              >思い出を残す！</button>
            </div>
          </div>
          <div className={style.rightBox}>
            <div></div>
            <div></div>
          </div>
        </div>
        <Tab
                tab01={categoryName[0]}
                children01={<div>{getCategoryWorks(1)}</div>}
                tab02={categoryName[1]}
                children02={<div>{getCategoryWorks(2)}</div>}
            />  
      </div>
      <Footer />
    </>
  );
}
