import styles from '@/styles/header/index.module.scss'
import Link from "next/link";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import CityButton from "@/components/elements/CityButton/CityButton";
import ProfileDropdown from "@/components/modules/Header/ProfileDropdown";
import {withClickOutside} from "@/utils/withClickOutside";
import {usePopup} from "@/hooks/usePopup";
import ModeToggler from "@/components/elements/ModeToggler/ModeToggler";
const HeaderTop = () => {

	const isMedia950 = useMediaQuery(950)

	const mode = useStore($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''


	const {open, toggleOpen, closePopup} = usePopup()

	return (
		<div className={styles.header__top}>
			<div className={`container ${styles.header__top__container}`}>
				{!isMedia950 && <CityButton />}
				{isMedia950 && (
					<button
						onClick={ !open ? toggleOpen :  closePopup }
						className={`${styles.burger_menu} ${
							open ? styles.open : ''
						} ${darkModeClass}`}
					>
						<span />
						<span />
						<span />
					</button>
				)}
				<nav
					className={`${styles.header__nav}
					${ open ? styles.open : '' } 
					${darkModeClass}`}
				>
					<ul className={styles.header__nav__list}>
						<li className={styles.header__nav__list__item}>
							<Link href="/shipping-payment" passHref legacyBehavior>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
									onClick={closePopup}
								>
									Доставка и оплата
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href="/about" passHref legacyBehavior>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
									onClick={closePopup}
								>
									О компании
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href="/catalog" passHref legacyBehavior>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
									onClick={closePopup}
								>
									Каталог
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href="/contacts" passHref legacyBehavior>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
									onClick={closePopup}
								>
									Контакты
								</a>
							</Link>
						</li>
						<li className={styles.header__nav__list__item}>
							<Link href="/wholesale-buyers" passHref legacyBehavior>
								<a
									className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
									onClick={closePopup}
								>
									Оптовым покупателям
								</a>
							</Link>
						</li>
						{isMedia950 && (
							<li className={styles.header__nav__list__item}>
								<CityButton />
							</li>
						)}
						{isMedia950 && (
							<li className={styles.header__nav__list__item}>
								<ModeToggler />
							</li>
						)}
					</ul>
				</nav>
				<ProfileDropdown />
			</div>
		</div>
	)
}

export default HeaderTop