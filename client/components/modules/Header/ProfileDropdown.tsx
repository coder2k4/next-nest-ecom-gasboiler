import {useStore} from "effector-react";
import {$mode} from "@/context/mode";


import styles from '@/styles/profileDropDown/index.module.scss'
import ProfileSvg from "@/components/elements/ProfileSvg/ProfileSvg";
import {forwardRef} from "react";
import {IWrappedComponentProps} from "@/types/common";
import {AnimatePresence, motion} from "framer-motion";
import {withClickOutside} from "@/utils/withClickOutside";
import LogoutSvg from "@/components/elements/LogoutSvg/LogoutSvg";
import {$user, setUser} from "@/context/user";
import {logoutFx} from "@/app/api/auth";
import {IcheckUserAuthFXResponse} from "@/types/auth";
import {useRouter} from "next/router";

const ProfileDropdown =
    forwardRef<HTMLDivElement, IWrappedComponentProps>((
        {open, setOpen}, ref
    ) => {

        const mode = useStore($mode)
        const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

        const user = useStore($user)

        const toggleProfileDropDown = () => {
            setOpen(!open)
        }

        const router = useRouter()

        const handleLogout = async () => {

            await logoutFx('users/logout')
            setUser({} as IcheckUserAuthFXResponse)
            await router.push('/')

        }

        return (
            <div className={styles.profile}
                 ref={ref}
            >
                <button className={styles.profile__btn}
                        onClick={toggleProfileDropDown}
                >
                      <span className={styles.profile__span}>
                        <ProfileSvg/>
                      </span>
                </button>
                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0}}
                            className={`${styles.profile__dropdown} ${darkModeClass}`}
                            style={{transformOrigin: 'right top'}}
                        >
                            <li className={styles.profile__dropdown__user}>
                                <span
                                    className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                                >
                                  {user.username}

                                </span>
                                <span
                                    className={`${styles.profile__dropdown__email} ${darkModeClass}`}
                                >
                                  {user.email}

                                </span>
                            </li>
                            <li className={styles.profile__dropdown__item}>
                                <button
                                    className={styles.profile__dropdown__item__btn}
                                    onClick={handleLogout}
                                >
                                  <span
                                      className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                                  >
                                    Выйти
                                  </span>
                                    <span
                                        className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                                    >
                                    <LogoutSvg/>
                                  </span>
                                </button>
                            </li>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        )
    })

ProfileDropdown.displayName = 'ProfileDropdown'

export default withClickOutside(ProfileDropdown)