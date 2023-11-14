import {IPartImagesItemProps} from "@/types/part";


/**
 * Styles
 */
import styles from '@/styles/part/index.module.scss'


export const PartImagesItem = ({ src, alt, callback} : IPartImagesItemProps) => {

    const changeMainImage = () => callback(src)

    return (
        <li className={styles.part__images__list__item} onClick={changeMainImage}>
            <img src={src} alt={alt} />
        </li>
    );
};