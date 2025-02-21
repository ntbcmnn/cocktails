import React from 'react';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  isLoading?: boolean;
  text: string;
  isDisabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children?: React.ReactNode;
}

const ButtonLoading: React.FC<Props> = ({
  isDisabled = false,
  isLoading = false,
  text,
  type = 'submit',
  onClick,
  children,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        disabled={isDisabled}
        className="btn btn-blue d-flex align-items-center"
      >
        <span className="me-2">{text}</span>
        {children}
        {isLoading ? <ButtonSpinner/> : null}
      </button>
    </div>
  );
};

export default ButtonLoading;