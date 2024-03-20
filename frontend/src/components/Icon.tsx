import { CSSProperties } from "react";

interface PropsType {
    src: string;
    altText?: string;
    imgStyle?: CSSProperties;
    imgWrapperStyle?: CSSProperties;
    size: number;/*ここでサイズ指定するにょ(~o~) */
}
    const PhotoIcon = (props: PropsType) => {
    const { src, altText, imgWrapperStyle, imgStyle, size } = props;
    const defaultStyle: CSSProperties = {
        objectFit: "cover",
        width: `${size}px`, 
        height: `${size}px`, 
        borderRadius: `${size/2}px`,
    };

    return (
        <div style={imgWrapperStyle ? imgWrapperStyle : undefined}>
            <img
                src={src}
                alt={altText ? altText : ""}
                style={imgStyle ? imgStyle : defaultStyle}
            />
        </div>
    );
};
export default PhotoIcon;
