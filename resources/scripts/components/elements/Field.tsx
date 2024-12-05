import React, { forwardRef } from 'react';
import { Field as FormikField, FieldProps } from 'formik';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import { IconType } from 'react-icons';
import { InputGroup } from '@/medusa/components/InputGroup';
import InputInfo from '@/medusa/components/InputInfo';

interface OwnProps {
    name: string;
    light?: boolean;
    labelLight?: boolean;
    label?: string;
    description?: string;
    validate?: (value: any) => undefined | string | Promise<any>;
    icon?: boolean;
    iconType?: IconType;
}

type Props = OwnProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>;

const Field = forwardRef<HTMLInputElement, Props>(
    (
        { id, name, light = false, labelLight = false, icon, iconType: Icon, label, description, validate, ...props },
        ref
    ) => (
        <FormikField innerRef={ref} name={name} validate={validate}>
            {({ field, form: { errors, touched } }: FieldProps) => (
                <div>
                    {label && (
                        <Label htmlFor={id} isLight={labelLight}>
                            {label}
                        </Label>
                    )}
                    {icon ? (
                        <InputGroup>
                            {Icon && <Icon size={22} className='icon' />}
                            <Input
                                id={id}
                                {...field}
                                {...props}
                                icon={icon}
                                isLight={light}
                                hasError={!!(touched[field.name] && errors[field.name])}
                            />
                        </InputGroup>
                    ) : (
                        <Input
                            id={id}
                            {...field}
                            {...props}
                            icon={icon}
                            isLight={light}
                            hasError={!!(touched[field.name] && errors[field.name])}
                        />
                    )}

                    {touched[field.name] && errors[field.name] ? (
                        <InputInfo isError>
                            {(errors[field.name] as string).charAt(0).toUpperCase() +
                                (errors[field.name] as string).slice(1)}
                        </InputInfo>
                    ) : description ? (
                        <InputInfo>{description}</InputInfo>
                    ) : null}
                </div>
            )}
        </FormikField>
    )
);
Field.displayName = 'Field';

export default Field;
