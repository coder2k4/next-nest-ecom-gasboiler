import {formatPrice} from "@/utils/common";
import {useStore} from "effector-react";
import {$user, $userCity} from "@/context/user";
import {$mode} from "@/context/mode";
import {$shoppingCart, $totalPrice, setShoppingCart} from "@/context/shopping-cart";
import {useEffect, useState} from "react";
import {checkPaymentFx, makePaymentFx} from "@/app/api/payment";
import {useRouter} from "next/router";
import OrderAccordion from "@/components/modules/OrderPage/OrderAccordion";
import {toast} from "react-toastify";


/**
 * styles
 */
import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import {removeFromCartFx} from "@/app/api/shopping-cart";

function OrderPage() {
    /**
     * Store
     */
    const user = useStore($user)
    const mode = useStore($mode)
    const shoppingCart = useStore($shoppingCart)
    const totalPrice = useStore($totalPrice)
    const spinner = useStore(makePaymentFx.pending)
    const userCity = useStore($userCity)

    /**
     * State
     */
    const [orderIsReady, setOrderIsReady] = useState(false)
    const [agreement, setAgreement] = useState(false)

    const router = useRouter()
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''


    const handleAgreementChange = () => setAgreement(!agreement)

    useEffect(() => {
        const paymentId = sessionStorage.getItem('paymentId')

        console.log(paymentId);

        if (paymentId) {
            checkPayment(paymentId)
        }
    }, [])

    const makePay = async () => {
        try {
            const data = await makePaymentFx({
                url: '/payment',
                amount: totalPrice,
                description: `Заказ c сайтa GasBoiler ${
                    userCity.city.length
                        ? `Город: ${userCity.city}, улица: ${userCity.street}`
                        : ''
                }`,
            })

            sessionStorage.setItem('paymentId', data.id)
            await router.push(data.confirmation.confirmation_url)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    const checkPayment = async (paymentId: string) => {
        try {
            const data = await checkPaymentFx({
                url: '/payment/info',
                paymentId,
            })

            if (data.status === 'succeeded') {
                await resetCart()
                return
            }

            sessionStorage.removeItem('paymentId')
        } catch (error) {
            console.log((error as Error).message)
            await resetCart()
        }
    }

    const resetCart = async () => {
        sessionStorage.removeItem('paymentId')
        setShoppingCart([])
        await removeFromCartFx(`/shopping-cart/remove-all/${user.userId}`)
    }

    return (
        <section className={styles.order}>
            <div className="container">
                <h2 className={`${styles.order__title} ${darkModeClass}`}>
                    Оформление заказа
                </h2>
                <div className={styles.order__inner}>
                    <div className={styles.order__cart}>
                        <OrderAccordion
                            setOrderIsReady={setOrderIsReady}
                            showDoneIcon={orderIsReady}
                        />
                    </div>
                    <div className={styles.order__pay}>
                        <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
                            Итого
                        </h3>
                        <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
                            <div className={styles.order__pay__goods}>
                        <span>
                          Товары (
                            {shoppingCart.reduce(
                                (defaultCount, item) => defaultCount + item.count,
                                0
                            )}
                            )
                        </span>
                                <span>{formatPrice(totalPrice)} P</span>
                            </div>
                            <div className={styles.order__pay__total}>
                                <span>На сумму</span>
                                <span className={darkModeClass}>
                              {formatPrice(totalPrice)} P
                            </span>
                            </div>
                            <button
                                disabled={!(orderIsReady && agreement)}
                                className={styles.order__pay__btn}
                                onClick={makePay}
                            >
                                {spinner ? (
                                    <span
                                        className={spinnerStyles.spinner}
                                        style={{top: '6px', left: '47%'}}
                                    />
                                ) : (
                                    'Подтвердить заказ'
                                )}
                            </button>
                            <label
                                className={`${styles.order__pay__rights} ${darkModeClass}`}
                            >
                                <input
                                    className={styles.order__pay__rights__input}
                                    type="checkbox"
                                    onChange={handleAgreementChange}
                                    checked={agreement}
                                />
                                <span className={styles.order__pay__rights__text}>
                                  <strong>Согласен с условиями</strong> Правил пользования
                                  торговой площадкой и правилами возврата
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OrderPage;