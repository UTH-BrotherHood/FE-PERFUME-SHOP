import React from 'react';

interface ButtonProps {
    content: string;
    w?: string;
    h?: string;
    type: 'button' | 'submit' | 'reset';
    disable?: boolean; // New prop
}

function Button({ content, w = '40', h = '10', type, disable }: ButtonProps) {
    return (
        <button type={type} disabled={disable} className={`w-${w} h-${h} bg-primary font-bold uppercase text-white justify-center items-center flex text-sm`}>
            {content}
        </button>
    );
}

export default Button;
