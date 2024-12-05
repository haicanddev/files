import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import { useLocation } from 'react-router';
import Spinner from '@/components/elements/Spinner';
import routes from '@/routers/routes';
import { IoClose, IoMenu } from 'react-icons/io5';
import ToggleButton from '@/medusa/components/ToggleMenu';

export default () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='w-full flex'>
            {/* className={`h-screen ${isOpen ? 'flex fixed md:sticky top-0 left-0' : 'hidden'} z-50`} */}
            <div className={`h-screen z-50 fixed lg:sticky top-0 left-0 ${!isOpen ? 'hidden lg:flex' : null}`}>
                <div className='flex flex-row'>
                    <NavigationBar />
                    {location.pathname.startsWith('/account') && (
                        <SubNavigation>
                            <div>
                                {routes.account
                                    .filter((route) => !!route.name)
                                    .map(({ path, name, exact = false }) => (
                                        <NavLink
                                            key={path}
                                            to={`/account/${path}`.replace('//', '/')}
                                            exact={exact}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {name}
                                        </NavLink>
                                    ))}
                            </div>
                        </SubNavigation>
                    )}
                </div>
            </div>

            <div className='absolute top-0 right-1 z-40 lg:hidden' onClick={() => setIsOpen(!isOpen)}>
                <ToggleButton>{!isOpen ? <IoMenu size={24} /> : <IoClose size={24} />}</ToggleButton>
            </div>

            <div className='mt-20 lg:mt-0 mx-auto w-full'>
                <TransitionRouter>
                    <React.Suspense fallback={<Spinner centered />}>
                        <Switch location={location}>
                            <Route path={'/'} exact>
                                <DashboardContainer />
                            </Route>
                            {routes.account.map(({ path, component: Component }) => (
                                <Route key={path} path={`/account/${path}`.replace('//', '/')} exact>
                                    <Component />
                                </Route>
                            ))}
                            <Route path={'*'}>
                                <NotFound />
                            </Route>
                        </Switch>
                    </React.Suspense>
                </TransitionRouter>
            </div>
        </div>
    );
};
