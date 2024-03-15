'use client'

import { useState, useEffect } from 'react'
import style from '@/styles/components/header.module.scss'

export function Header() {

    const [navArray, setNavArray] = useState([
        {
            text: '投票',
            link: '/Vote',
        },
        {
            text: '過去作品',
            link: '/PastWork',
        },
        {
            text: 'マイページ',
            link: '/MyPage',
        },
    ])

    return (
        <>
            <header className={style.header}>
                <h1>
                    <figure
                        onClick={() => location.href = '/'}
                    >
                        <img src="image/areaprize.svg" alt="logo" />
                    </figure>
                </h1>
                <nav>
                    <ul>
                        {navArray.map((v, idx) =>
                            <li key={idx}>
                                <a href={v.link}>{v.text}</a>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    )
}