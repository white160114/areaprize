'use client'

import { useState, useEffect, ReactNode } from 'react'
import style from '@/styles/components/modal.module.scss'


type Props = {
    children: ReactNode,
    isOpen: boolean,
}


export function Modal(props: Props) {
    return (
        <>
            <div className={style.backgranund}>
                {props.children}
            </div>
        </>
    )
}