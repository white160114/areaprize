'use client'

import style from '@/styles/components/footer.module.scss'

export function Footer() {
    return (
        <>
            <footer className={style.footer}>
                <p>お問い合わせ</p>
                <label htmlFor="">tel:</label>
                {/* <input type="text" value={''} /> */}
                <p>012-XXXX-XXXX</p>
                <label htmlFor="">mail:</label>
                {/* <input type="text" value={'mailadress@yahoo.co.jp'} /> */}
                <p>mailadress@yahoo.co.jp</p>
            </footer>
        </>
    )
}