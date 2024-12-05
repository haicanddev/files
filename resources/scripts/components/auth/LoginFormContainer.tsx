import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';
import hexToRGB from '@/medusa/functions/hexToRGB';
import { medusaColors } from '@/medusa/medusaColors';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidLockOpen } from 'react-icons/bi';
import Tooltip from '../elements/tooltip/Tooltip';
import { TbLogin2 } from 'react-icons/tb';
import Footer from '@/medusa/components/Footer';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};
`;

const FormWrapper = styled.div`
    ${tw`flex rounded-xl overflow-hidden mx-3 md:mx-0`};
    background: linear-gradient(
        to right bottom,
        ${hexToRGB(medusaColors.auth.bg1, 0.4)},
        ${hexToRGB(medusaColors.auth.bg2, 1)}
    );
    box-shadow: 1px 2px 10px ${hexToRGB(medusaColors.auth.bg1, 0.2)};

    & .auth-side {
        ${tw`flex-shrink-0 py-2 w-16 flex flex-col justify-between items-center py-10 px-px`};
        background: ${hexToRGB(medusaColors.bblack2, 1)};

        & .auth-link {
            ${tw`w-10 h-10 my-1 flex flex-col items-center justify-center text-xs font-bold cursor-pointer rounded-lg duration-300`};

            background: ${hexToRGB(medusaColors.nav.link.background, 0.2)};
            color: ${hexToRGB(medusaColors.nav.link.background, 1)};

            &:hover {
                background: ${hexToRGB(medusaColors.nav.link.background, 0.27)};
                color: ${hexToRGB(medusaColors.nav.link.background, 1)};
            }
        }
    }

    & .auth-container {
        ${tw`w-full p-10 md:p-20`};

        & h2 {
            ${tw`pb-10 text-3xl text-center font-bold`};
            color: ${hexToRGB(medusaColors.white, 0.9)};
        }
    }
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => {
    const { pathname } = useLocation();

    return (
        <Container>
            <FlashMessageRender />
            <Form {...props} ref={ref}>
                <FormWrapper>
                    <div className='auth-side'>
                        <img src={medusaColors.logo} alt='Medusa Logo' className='w-14 mx-auto' />
                        {pathname === '/auth/login' ? (
                            <Tooltip content='Password recovery' placement={'top'}>
                                <Link to={'/auth/password'} className='auth-link'>
                                    <BiSolidLockOpen size={20} />
                                </Link>
                            </Tooltip>
                        ) : (
                            <Tooltip content='Back to login' placement={'top'}>
                                <Link to={'/auth/login'} className='auth-link'>
                                    <TbLogin2 size={20} />
                                </Link>
                            </Tooltip>
                        )}
                    </div>
                    <div className='auth-container'>
                        {title && <h2>{title}</h2>}
                        {props.children}
                    </div>
                </FormWrapper>
            </Form>
            <Footer>
                &copy; 2015 - {new Date().getFullYear()}&nbsp;
                <a rel={'noopener nofollow noreferrer'} href={'https://pterodactyl.io'} target={'_blank'}>
                    Pterodactyl Software
                </a>
            </Footer>
        </Container>
    );
});
