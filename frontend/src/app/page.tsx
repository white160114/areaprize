'use client'


import { useState, useEffect } from 'react'
import Image from "next/image";
import style from "./page.module.scss";

import { FaRegLightbulb } from "react-icons/fa";
import Tab from '@/components/Tab'
import Card from '@/components/Tab'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SiStyledcomponents } from 'react-icons/si';


type Props = {
  tabText: string,
  step: string
}


// const url = "https://areaprize.kurumimnm.net/data/all";

// const fetchData = async () => {
//   const response = await fetch(url);
//   const all_data = await response.json();

//   return all_data;
// };

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

  // const [userNames, setUserNames] = useState<string[]>([]);
  // const [testData, setTestData] = useState<string[]>([]);


  // useEffect(() => {
  //   const fetchDataAndUpdateUserNames = async () => {
  //     const data: any = await fetchData();

  //     const names = data.USERS.map((user: any) => user.user_name);

  //     const test_data = data.TEST.map((text: any) => text.text);

  //     setUserNames(names);
  //     setTestData(test_data);
  //   };

  //   fetchDataAndUpdateUserNames();

  //   const intervalId = setInterval(fetchDataAndUpdateUserNames, 10000); // 10秒ごとにデータを取得

  //   return () => clearInterval(intervalId); // クリーンアップ関数でタイマーをクリア
  // }, []); // 空の依存配列を渡して初回のみ実行する

  // console.log(userNames, testData);


  return (
    <>
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
            <h2>「大阪府の通天閣」</h2>
            <ul className={style.list}>
              <li>3/1 お題決定、エントリー開始</li>
              <li>3/4 エントリー締め切り</li>
              <li className={style.acc}>~</li>
              <li>3/24 作品アップロード</li>
              <li>3/25 投票開始</li>
              <li>月末 投票締め切り</li>
            </ul>
            <div className={style.btnBox}>
              <button className={style.btn}>旅に出る！</button>
            </div>
          </div>
          <div className={style.rightBox}>
            <div></div>
            <div></div>
          </div>
        </div>
        <Tab children01={<Card />} children02={<Card />} />
      </div>

      <Footer />
    </>
  );
}
