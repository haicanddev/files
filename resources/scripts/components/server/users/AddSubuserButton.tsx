import React, { useState } from 'react';
import EditSubuserModal from '@/components/server/users/EditSubuserModal';
import { CiCirclePlus } from 'react-icons/ci';
import { AddBox } from '@/medusa/components/AddBox';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <EditSubuserModal visible={visible} onModalDismissed={() => setVisible(false)} />
            <AddBox onClick={() => setVisible(true)}>
                <CiCirclePlus size={50} />
            </AddBox>
        </>
    );
};
