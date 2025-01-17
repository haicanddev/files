import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import performPasswordReset from '@/api/auth/performPasswordReset';
import { httpErrorToHuman } from '@/api/http';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import { Actions, useStoreActions } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { Formik, FormikHelpers } from 'formik';
import { object, ref, string } from 'yup';
import Field from '@/components/elements/Field';
import tw from 'twin.macro';
import Button from '@/medusa/components/Button';
import { BiSolidLockOpen } from 'react-icons/bi';

interface Values {
    password: string;
    passwordConfirmation: string;
}

export default ({ match, location }: RouteComponentProps<{ token: string }>) => {
    const [email, setEmail] = useState('');

    const { clearFlashes, addFlash } = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes);

    const parsed = new URLSearchParams(location.search);
    if (email.length === 0 && parsed.get('email')) {
        setEmail(parsed.get('email') || '');
    }

    const submit = ({ password, passwordConfirmation }: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();
        performPasswordReset(email, { token: match.params.token, password, passwordConfirmation })
            .then(() => {
                // @ts-expect-error this is valid
                window.location = '/';
            })
            .catch((error) => {
                console.error(error);

                setSubmitting(false);
                addFlash({ type: 'error', title: 'Error', message: httpErrorToHuman(error) });
            });
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                password: '',
                passwordConfirmation: '',
            }}
            validationSchema={object().shape({
                password: string()
                    .required('A new password is required.')
                    .min(8, 'Your new password should be at least 8 characters in length.'),
                passwordConfirmation: string()
                    .required('Your new password does not match.')
                    // @ts-expect-error this is valid
                    .oneOf([ref('password'), null], 'Your new password does not match.'),
            })}
        >
            {({ isSubmitting }) => (
                <LoginFormContainer title={'Reset Password'}>
                    <div css={tw`mt-6`}>
                        <Field
                            icon
                            iconType={BiSolidLockOpen}
                            description={'Passwords must be at least 8 characters in length.'}
                            name={'password'}
                            type={'password'}
                        />
                    </div>

                    <div css={tw`mt-6`}>
                        <Field
                            icon
                            iconType={BiSolidLockOpen}
                            description={'Passwords must be at least 8 characters in length.'}
                            name={'passwordConfirmation'}
                            type={'password'}
                        />
                    </div>

                    <div css={tw`mt-6`}>
                        <Button type='submit' disabled={isSubmitting}>Reset Password</Button>
                    </div>
                </LoginFormContainer>
            )}
        </Formik>
    );
};
