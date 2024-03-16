'use client'

import style from '@/styles/Detailed/page.module.scss'

import { useState } from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import { FaRegPaperPlane } from "react-icons/fa";

export default function Detailed() {

    // const [formData, setFormData] = useState({
    //     parent_comment_id: "",
    //     work_id: "",
    //     text: "",
    // });

    // async function onSubmit(event: any) {
    //     event.preventDefault();

    //     console.log(formData);

    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(formData),
    //     });
    //     const data = await response.json();
    //     console.log("response=>", data);
    // }

    // function handleInputChange(event: any) {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    // }


    return (
        <>
            <div className={style.detaileWrap}>
                {/* headerComponentの挿入 */}
                <Header />

                <div className={style.detaileContent}>
                    <div className={style.user}>
                        <figure>
                            <img src="" alt="" />
                        </figure>
                        <p>UserName</p>
                        <figure>
                            <img src="" alt="rankIcon" />
                        </figure>
                    </div>
                </div>

                <div className={style.userBox}>
                    <div className={style.userContent}>
                        <div className={style.workTitleBox}>
                            <h3>WorkTitle</h3>
                            <div></div>
                            {/* ここに星のアイコンを追加する */}
                        </div>
                        {/* <figure>
                            作品の詳細画像
                            <img src="/" alt="" />
                        </figure> */}
                        <iframe src="https://codesandbox.io/p/devbox/github/white160114/areaprize/tree/develop/frontend?embed=1&file=%2Fsrc%2Fapp%2Fpage.tsx"
                            style={{ width: "100%", height: '700px' }}
                            title="frontend"
                            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        ></iframe>
                    </div>
                    <div className={style.detaileText}>
                        <h4>作品説明</h4>
                        <p>
                            「エリアプライズ」は、地域活性化と学びを融合したプラットフォームです。地域の魅力や文化を探求しながら、新しいスキルを習得できます。地元のイベントや伝統的な工芸品、料理レシピなど、地域に関連する多彩なコンテンツを提供します。専門家によるワークショップやオンラインコースを通じて、学びと地域のつながりを深める場を提供します。エリアプライズは、地域の発展と成長を支援し、持続可能な未来の実現に貢献します。
                        </p>
                    </div>
                    <div className={style.detaileText}>
                        <h4>技術的ポイント</h4>
                        <p>
                            「エリアプライズ」は、Next.jsとNode.jsを活用し、地域活性化と学びを結びつけた革新的なウェブプラットフォームです。Next.jsのSSR（サーバーサイドレンダリング）とNode.jsの柔軟性を活かし、ユーザーはリアルタイムで地域情報や学習コンテンツにアクセスできます。また、モダンな技術スタックを用いた開発により、スムーズなユーザーエクスペリエンスと効率的なサイト運営を実現しています。エリアプライズは、地域社会の発展とユーザーの学びのニーズに対応するために、最新のWebテクノロジーを駆使しています
                        </p>
                    </div>
                    <div className={style.coment}>
                        <form action="" className={style.formBox}>
                            <input type="text" />
                            <button><FaRegPaperPlane className={style.icon} /></button>
                        </form>
                        <div className={style.message}>
                            <div className={style.userdeta}>
                                <figure>
                                    <img src="" alt="" />
                                </figure>
                                <p>userName</p>
                                <figure>
                                    <img src="" alt="" />
                                </figure>
                            </div>
                            <p>
                                学習できるコンテストなんてやる気しか出ない！
                                学習できるコンテストなんてやる気しか出ない！
                                学習できるコンテストなんてやる気しか出ない！
                                学習できるコンテストなんてやる気しか出ない！
                                学習できるコンテストなんてやる気しか出ない！
                                学習できるコンテストなんてやる気しか出ない！
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
