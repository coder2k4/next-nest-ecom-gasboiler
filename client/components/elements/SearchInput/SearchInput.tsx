import styles from '@/styles/header/index.module.scss'

import {
    controlStyles,
    inputStyles,
    menuStyles,
    optionStyles,
} from '@/styles/searchInput'

import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import SearchSvg from "@/components/elements/SearchSvg/SearchSvg";
import Select from "react-select";
import {useState} from "react";
import {SelectOptionType} from "@/types/common";

const SearchInput = () => {

    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const [searchOption, setSearchOption] = useState<SelectOptionType>(null)


    const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
        setSearchOption(selectedOption)
    }

    return (
        <>
            <div className={styles.header__search__inner}>
                <Select
                    components={{
                        // NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
                    }}
                    placeholder="Я ищу..."
                    value={searchOption}
                    onChange={handleSearchOptionChange}
                    styles={{
                        ...inputStyles,
                        container: (defaultStyles) => ({
                            ...defaultStyles,
                            // ...onMenuOpenContainerStyles,
                        }),
                        control: (defaultStyles) => ({
                            ...controlStyles(defaultStyles, mode),
                            backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
                            // zIndex,
                            transition: 'none',
                            // ...onMenuOpenControlStyles,
                        }),
                        input: (defaultStyles) => ({
                            ...defaultStyles,
                            color: mode === 'dark' ? '#f2f2f2' : '#222222',
                        }),
                        menu: (defaultStyles) => ({
                            ...menuStyles(defaultStyles, mode),
                            // zIndex,
                            marginTop: '-1px',
                        }),
                        option: (defaultStyles, state) => ({
                            ...optionStyles(defaultStyles, state, mode),
                        }),
                    }}
                    isClearable={true}
                    openMenuOnClick={false}
                    // onFocus={onFocusSearch}
                    // onMenuOpen={onSearchMenuOpen}
                    // onMenuClose={onSearchMenuClose}
                    // onInputChange={onSearchInputChange}
                    // options={options}
                    options={[1,2,3,4,5,6,7,8,9,10].map((item)=>({value:item, label: item}))}
                />
                <span
                    // ref={borderRef}
                    className={styles.header__search__border}/>
            </div>
            <button
                className={`${styles.header__search__btn} ${darkModeClass}`}
                // ref={btnRef}
                // style={{zIndex}}
                // onClick={handleSearchClick}
            >
        <span className={styles.header__search__btn__span}>
          <SearchSvg/>
        </span>
            </button>
        </>
    );
};


export default SearchInput