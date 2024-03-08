'use client'

import { useState, useEffect } from 'react'
import style from './page.module.scss'
import { Modal } from '@/components/Modal'

export default function Test() {

    const [state, setState] = useState(false)

    function onClose() {
        setState(false)
    }

    return (
        <>
            <div>
                <button
                    onClick={() => setState(true)}
                >click</button>
                {state &&
                    <Modal isOpen={state}>
                        <div className={style.modalWrap}>
                            <div className={style.modalHeader}>
                                <button
                                    className={style.backBtn}
                                    onClick={onClose}
                                >＜戻る</button>
                                <h4>test</h4>
                            </div>
                            <div className={style.contentBox}>
                                <form action="">
                                    <label htmlFor="">メールアドレス</label>
                                    <input type="email" name="" id="" />
                                    <label htmlFor="">パスワード</label>
                                    <input type="password" name="" id="" />
                                    <div className={style.checkBox}>
                                        <input type="checkbox" name="" id="" />
                                        <p>サインインしたままにする</p>
                                    </div>
                                </form>
                            </div>
                            <div className={style.btnBox}>
                                <button
                                    className={style.btn}
                                // onClick={}
                                >サインイン</button>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        </>
    )
}