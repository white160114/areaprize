'use client'

import style from '@/styles/Detailed/page.module.scss'

export default function Detailed() {
    return (
        <>
            <div className={style.detaileWrap}>
                {/* headerComponentの挿入 */}
                <header className={style.header}>
                    <h1>Detailed</h1>
                </header>

                <div className={style.detaileContent}>
                    <div className={style.user}>
                        <figure>
                            <img src="" alt="userIcon" />
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
                        <figure>
                            {/* 作品の詳細画像 */}
                            <img src="/" alt="" />
                        </figure>
                    </div>
                    <div className={style.detaileText}>
                        <h4>作品説明</h4>
                        <p>
                            ここには作品概要が入ります。
                            ここには作品概要が入ります。
                            ここには作品概要が入ります。
                            ここには作品概要が入ります。
                            ここには作品概要が入ります。
                            ここには作品概要が入ります。
                        </p>
                    </div>
                    <div className={style.detaileText}>
                        <h4>技術的ポイント</h4>
                        <p>
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                            ここには技術的ポイントが入ります。
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}