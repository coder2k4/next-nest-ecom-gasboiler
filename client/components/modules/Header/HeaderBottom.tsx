import styles from '@/styles/header/index.module.scss'
import Link from "next/link";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import ModeToggler from "@/components/elements/ModeToggler/ModeToggler";
import SearchInput from "@/components/elements/SearchInput/SearchInput";
import CartPopup from "@/components/modules/Header/CartPopup/CartPopup";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {setDisableCart} from "@/context/shopping-cart";

const HeaderBottom = () => {

	const isMedia950 = useMediaQuery(950)

	const mode = useStore($mode)
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

	const router = useRouter()


	useEffect(() => {
		if (router.pathname === '/order') {
			setDisableCart(true)
			return
		}

		setDisableCart(false)
	}, [router.pathname])

	return (
		<div className={styles.header__bottom}>
			<div className={`container ${styles.header__bottom__container}`}>
				<h1 className={styles.header__logo}>
					<Link href="/dashboard" legacyBehavior passHref>
						<a className={styles.header__logo__link}>
							<img src="/img/logo.svg" alt="logo" />
							<span
								className={`${styles.header__logo__link__text} ${darkModeClass}`}
							>
                Детали для газовых котлов
              </span>
						</a>
					</Link>
				</h1>
				<div className={styles.header__search}>
					<SearchInput />
				</div>
				<div className={styles.header__shopping_cart}>
					{!isMedia950 && <ModeToggler />}
					<CartPopup />
				</div>
			</div>
		</div>
	)
}

export default HeaderBottom