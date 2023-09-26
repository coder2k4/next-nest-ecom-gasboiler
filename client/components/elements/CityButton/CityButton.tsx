import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import styles from '@/styles/cityButton/index.module.scss'
import LocationSvg from "@/components/elements/LocationSvg/LocationSvg";

const CityButton = () => {

    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <button className={styles.city}
            // onClick={getCity}
        >
              <span className={`${styles.city__span} ${darkModeClass}`}>
                <LocationSvg/>
              </span>
              <span className={`${styles.city__text} ${darkModeClass}`}>
               {/* {spinner ? (
                    <span
                        className={spinnerStyles.spinner}
                        style={{top: '-10px', left: 10, width: 20, height: 20}}
                    />
                ) : city.length ? (
                    city
                ) : (
                    'Город'
                )}*/}
                  Обнинск
              </span>
        </button>
    );
};

export default CityButton
