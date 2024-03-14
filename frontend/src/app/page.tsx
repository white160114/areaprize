'use client'


import { useState, useEffect } from 'react'
import Image from "next/image";
import style from "./page.module.scss";

import { FaRegLightbulb } from "react-icons/fa";


type Props = {
  tabText: string
}

export default function Home() {

  // 解説のするときのTabcomponentを作成
  function Tab(props: Props) {

    const [state, setState] = useState({
      tabText: props.tabText
    })

    return (
      <>
        <div className={style.caption}>
          <span>
            <FaRegLightbulb />
            step{'1'}
          </span>
          <p>{props.tabText}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={style.homeWrap}>

        <header className={style.head}>
          <h1>
            Home
          </h1>
        </header>

        <div className={style.mainView}>
          <img src="img/FlameLeft.svg" alt="lefttop" />
          <div className={style.mainViewContent}>
            <div className={style.mainViewContentBox}>
              <h2>
                <figure>
                  <img src="img/areaprize.svg" alt="logo" />
                </figure>
              </h2>
              <p>地域の良さを発信し、想像力を磨く旅へ</p>
            </div>
            <figure>
              <img src="img/JapanMap.svg" alt="japanMap" />
            </figure>
          </div>
          <img src="img/FlameRight.svg" alt="rightbottom" />
        </div>

        <div className={style.explanationBox}>
          <div className={style.captionBox}>
            <span></span>
            <h3>旅の計画</h3>
            <span></span>
          </div>
          <div className={style.explanation}>
            <div className={style.explanationContent}>
              <Tab tabText='旅の行き先がランダムに選ばれるよ！' />
              <figure>
                <img src="img/Step1.svg" alt="" />
              </figure>
            </div>
            <div className={style.explanationContent}>
              <figure>
                <img src="img/Step2.svg" alt="" />
              </figure>
              <Tab tabText='選ばれた場所に旅に出よう！' />
            </div>
            <div className={style.explanationContent}>
              <Tab tabText='旅の思い出を記録しよう！' />
              <figure>
                <img src="img/Step3.svg" alt="" />
              </figure>
            </div>
            <div className={style.explanationContent}>
              <figure>
                <img src="img/Step4.svg" alt="" />
              </figure>
              <Tab tabText='仲間の旅の記録を評価しよう！' />
            </div>
            <figure>
              <img src="img/rank.svg" alt="" />
            </figure>
          </div>
        </div>

        <div>

        </div>
      </div>
    </>
  );
}
