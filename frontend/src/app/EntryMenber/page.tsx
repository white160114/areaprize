'use client'
import style from "@/styles/EntryMenber/entrymenber.module.scss"


type State = {
    listData:Array<List>
}

type List = {
    icon:String,
    userName:String,
    Lank:String
}



export default function EntryMenber() {
    
    return (
        <>
        <div className={style.wrap}>
            <h3>無事に旅に出れました！</h3>
            旅に出たもの一覧
            <div className={style.tablewrap}>
            <table >
                <thead>
                    <tr>
                        <th>エントリー者</th>
                        <th>ランク</th>
                    </tr>
                </thead>
                <tbody>
                    {/*TODO:tbodyの中身書き直す */}
                    <tr>
                        <td className={style.userName}><image>(ここはimg)</image>miyu</td>
                        <td>(ここはimg)</td>
                    </tr>
                    <tr>
                        <td className={style.userName}>miyu</td>
                        <td className={style.userRank}>(ここはimg)</td>
                    </tr><tr>
                        <td className={style.userName}>miyu</td>
                        <td className={style.userRank}>(ここはimg)</td>
                    </tr>
                    <tr>
                        <td className={style.userName}>miyu</td>
                        <td className={style.userRank}>(ここはimg)</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        </>
    )}