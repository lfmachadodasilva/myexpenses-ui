import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

interface ButtonComponentProps {
    id: any;
    label: string;
}

interface RadioButtonComponentProps {
    onChange: (value: any) => void;
    defaultButton: any;
    buttons: ButtonComponentProps[];
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = (props: RadioButtonComponentProps) => {
    return (
        <ToggleButtonGroup size='sm' onChange={props.onChange} type='radio' name='radio'>
            {props.buttons.map(button => (
                <ToggleButton type='radio' name='radio' value={button.id} variant='light' defaultChecked>
                    {props.defaultButton === button.id ? (
                        <FaCheckSquare className='mr-1' size={16} />
                    ) : (
                        <FaRegSquare className='mr-1' size={16} />
                    )}
                    {button.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default RadioButtonComponent;
