import {MutableRefObject, useRef, useState} from "react";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import {NameInput} from "@/components/modules/FeedbackForm/NameInput";
import PhoneInput from "@/components/modules/FeedbackForm/PhoneInput";
import EmailInput from "@/components/modules/FeedbackForm/EmailInput";
import MessageInput from "@/components/modules/FeedbackForm/MessageInput";
import {useForm} from "react-hook-form";
import {FeedbackInputs} from "@/types/feedbackForm";
import {toast} from "react-toastify";
import emailjs from '@emailjs/browser';

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/feedbackForm/index.module.scss'

export const FeedbackForm = () => {

    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FeedbackInputs>()


    const submitForm = () => {
        setSpinner(true)
        emailjs
            .sendForm(
                'service_bimymkj',
                'template_rzgslp7',
                formRef.current,
                'bqIoOqSNI5Hs4daFT'
            )
            .then((result) => {
                setSpinner(false)
                toast.success(`Сообщение отправлено! ${result.text}`)
            })
            .catch((error) => {
                setSpinner(false)
                toast.error(`Что-то пошло не так! ${error.text}`)
            })

        formRef.current.reset()
    }


    const [spinner, setSpinner] = useState(false)


    const formRef = useRef() as MutableRefObject<HTMLFormElement>

    return (
        <div className={`${styles.feedback_form} ${darkModeClass}`}>
            <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
                Форма обратной связи
            </h3>
            <form
                ref={formRef}
                className={styles.feedback_form__form}
                onSubmit={handleSubmit(submitForm)}
            >
                <NameInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <PhoneInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <EmailInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <MessageInput
                    register={register}
                    errors={errors}
                    darkModeClass={darkModeClass}
                />
                <div className={styles.feedback_form__form__btn}>
                    <button>
                        {spinner ? (
                            <span
                                className={spinnerStyles.spinner}
                                style={{ top: '6px', left: '47%' }}
                            />
                        ) : (
                            'Отправить сообщение'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
