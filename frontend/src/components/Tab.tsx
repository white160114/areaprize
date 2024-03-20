import { useEffect, useState, ReactNode } from 'react';

import style from "@/styles/components/tab.module.scss"


type PropsType = {
    tab01?: string;
    tab02?: string;
    children01?: ReactNode;
    children02?: ReactNode;
    className?: string;
}

const Tab = (props: PropsType) => {
    // const { className, tab01, tab02, children01, children02 } = props;
    // const defaultStyle = {
    //     tab01: "tab01",
    //     tab02: "tab02",
    //     children01: "children01のコンテンツです",
    //     children02: "children02のコンテンツです"
    // }

    // 下記の内容はダミーデータ
    const [tabs, setTabs] = useState<PropsType>({
        tab01: props.tab01,
        tab02: props.tab02,
        children01: props.children01,
        children02: props.children02,
        className: props.className
    })

    useEffect(() => {
        setTabs({
            tab01: props.tab01,
            tab02: props.tab02,
            children01: props.children01,
            children02: props.children02,
            className: props.className
        })
    }, [props])

    return (
        <div className={style.tabs} >
            <input className={style.tab_input} id={style.tab01} type="radio" name="tab_switch" defaultChecked />
            <label className={style.tab_label} htmlFor={style.tab01}>{tabs.tab01}</label>
            <input className={style.tab_input} id={style.tab02} type="radio" name="tab_switch" />
            <label className={style.tab_label} htmlFor={style.tab02}>{tabs.tab02}</label>

            <div className={style.tab_content} id={style.tab01_content}> {tabs.children01}</div>
            <div className={style.tab_content} id={style.tab02_content}>{tabs.children02}</div>
        </div>
    );

}

export default Tab;