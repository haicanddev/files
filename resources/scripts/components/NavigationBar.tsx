import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw from 'twin.macro';
import styled from 'styled-components';
import http from '@/api/http';
import { medusaColors } from '@/medusa/medusaColors';
import { PiUserBold } from 'react-icons/pi';
import { HiServerStack } from 'react-icons/hi2';
import { MdOutlineAdminPanelSettings, MdOutlineLogout } from 'react-icons/md';
import MedusaNavLink from '@/medusa/components/MedusaNavLink';
import hexToRGB from '@/medusa/functions/hexToRGB';

const NavigationWrapper = styled.div`
    ${tw`w-20 flex flex-col justify-between items-center py-5 shadow h-screen`};
    background: ${hexToRGB(medusaColors.nav.background, 1)};
`;

export default () => {
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);

    const onTriggerLogout = () => {
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    const { pathname } = useLocation();

    return (
        <NavigationWrapper>
            <div>
                <img src={medusaColors.logo} alt='Medusa Logo' className='w-16' />
            </div>
            <div>
                <MedusaNavLink>
                    <SearchContainer />
                </MedusaNavLink>
                <MedusaNavLink>
                    <NavLink
                        className={`flex flex-col items-center justify-center ${
                            (pathname.startsWith('/server') || pathname === '/') && 'active'
                        }`}
                        to={'/'}
                        exact
                    >
                        <HiServerStack size={24} />
                        Servers
                    </NavLink>
                </MedusaNavLink>
                {rootAdmin && (
                    <MedusaNavLink>
                        <a href={'/admin'} rel={'noreferrer'} className='flex flex-col items-center justify-center'>
                            <MdOutlineAdminPanelSettings size={24} />
                            Admin
                        </a>
                    </MedusaNavLink>
                )}
                <MedusaNavLink>
                    <NavLink className='flex flex-col items-center justify-center' to={'/account'}>
                        <PiUserBold size={24} />
                        Account
                    </NavLink>
                </MedusaNavLink>
            </div>
            <div>
                <MedusaNavLink onClick={onTriggerLogout}>
                    <MdOutlineLogout size={24} />
                    Logout
                </MedusaNavLink>
            </div>
        </NavigationWrapper>
    );
};
