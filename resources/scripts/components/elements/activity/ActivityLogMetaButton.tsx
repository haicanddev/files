import React, { useState } from 'react';
import { ClipboardListIcon } from '@heroicons/react/outline';
import { Dialog } from '@/components/elements/dialog';
import Button from '@/medusa/components/Button';
import { StyledPre } from '@/medusa/components/StyledPre';

export default ({ meta }: { meta: Record<string, unknown> }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={'self-center md:px-4'}>
            <Dialog open={open} onClose={() => setOpen(false)} hideCloseIcon title={'Metadata'}>
                <StyledPre>{JSON.stringify(meta, null, 2)}</StyledPre>
                <Dialog.Footer>
                    <Button onClick={() => setOpen(false)} isText>
                        Close
                    </Button>
                </Dialog.Footer>
            </Dialog>
            <button
                aria-describedby={'View additional event metadata'}
                className={'p-2 transition-colors duration-100 text-white group-hover:text-gray-200'}
                onClick={() => setOpen(true)}
            >
                <ClipboardListIcon className={'w-5 h-5'} />
            </button>
        </div>
    );
};
