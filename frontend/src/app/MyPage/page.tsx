'use client'

import { useState, useEffect } from 'react'
import style from '@/styles/MyPage/mypage.module.scss'

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";


export default function MyPage() {

    // formのアコーディオンを実装するstate
    const [accordion, setAccordion] = useState(false)

    return (
        <>
            <div className={style.myPageWrap}>

                {/* 作ったcomponentを挿入 */}
                <header className={style.sampleHeader}>
                    <h1>mypage</h1>
                </header>

                <form action="" className={style.formBox}>
                    <div className={style.formTop}>
                        {/* 自分のアイコンのComponentを挿入 */}
                        <div className={style.iconBox}>
                            <figure>
                                <img src="/" alt="" />
                            </figure>
                        </div>
                        <div className={style.formContent}>
                            <label htmlFor="">ユーザーネーム</label>
                            <input type="text" />
                            <label htmlFor="">出身地</label>
                            <input type="text" />
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
                                <input type="text" />
                                <label htmlFor="">パスワード</label>
                                <input type="text" />
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
                            <img src="/img/1apprentice.svg" alt="" />
                        </figure>
                        <div className={style.meterBox}>
                            <div className={style.meter}>
                                <div
                                    className={style.gauge}
                                    style={{ width: '70%', height: '100%' }}
                                ></div>
                            </div>
                        </div>
                        <figure>
                            <img src="/img/3Master.svg" alt="" />
                        </figure>
                    </div>
                </div>
            </div>
        </>
    )
}