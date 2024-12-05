import React, { useState } from 'react';
import { Subuser } from '@/state/server/subusers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import RemoveSubuserButton from '@/components/server/users/RemoveSubuserButton';
import EditSubuserModal from '@/components/server/users/EditSubuserModal';
import Can from '@/components/elements/Can';
import { useStoreState } from 'easy-peasy';
import tw from 'twin.macro';
import { Box } from '@/medusa/components/Box';
import { Title } from '@/medusa/components/Title';
import { TbAuth2Fa } from 'react-icons/tb';
import CopyOnClick from '@/components/elements/CopyOnClick';

interface Props {
    subuser: Subuser;
}

export default ({ subuser }: Props) => {
    const uuid = useStoreState((state) => state.user!.data!.uuid);
    const [visible, setVisible] = useState(false);

    const firstLetter = String(subuser.email.substring(0, 1));

    return (
        <Box>
            <EditSubuserModal subuser={subuser} visible={visible} onModalDismissed={() => setVisible(false)} />
            <div className='flex flex-shrink-0 items-center'>
                <div className='user-avatar'>{firstLetter}</div>
                <CopyOnClick text={subuser.email}>
                    <Title isSmall>
                        {subuser.email.length > 25 ? subuser.email.substring(0, 25) + '...' : subuser.email}
                    </Title>
                </CopyOnClick>
            </div>

            <div className='user-desc'>
                {subuser.uuid !== uuid && (
                    <>
                        <div css={tw`ml-4`}>
                            <p css={tw`font-medium text-center`}>
                                {subuser.permissions.filter((permission) => permission !== 'websocket.connect').length}
                            </p>
                            <p className='user-desc-title'>Permissions</p>
                        </div>
                        <div>
                            {subuser.twoFactorEnabled ? (
                                <div className='flex flex-col items-center justify-center'>
                                    <TbAuth2Fa size={22} className='fa-enabled' />
                                    <p className='fa-enabled'>Enabled</p>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center'>
                                    <TbAuth2Fa size={22} className='fa-disabled' />
                                    <p className='fa-disabled'>Disabled</p>
                                </div>
                            )}
                        </div>
                        <Can action={'user.update'}>
                            <button
                                type={'button'}
                                aria-label={'Edit subuser'}
                                className='menu-element'
                                onClick={() => setVisible(true)}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                        </Can>
                        <Can action={'user.delete'}>
                            <RemoveSubuserButton subuser={subuser} />
                        </Can>
                    </>
                )}
            </div>
        </Box>
    );
};
