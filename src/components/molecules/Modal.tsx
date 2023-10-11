import React, { ReactNode, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = memo(
  ({ isOpen, onClose, children }) => {

    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    const wrapperClass = classNames('fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out', {
      'overflow-hidden opacity-100 pointer-events-auto': isOpen,
      'opacity-0 pointer-events-none': !isOpen,
    });
      
    return (
      <div
        className={wrapperClass}
      >
        <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
      
        <div className="modal relative w-auto my-6 mx-auto max-w-3xl">
          <div className="modal-content bg-white shadow-lg rounded-lg p-4 min-w-[350px] min-h-[200px]" ref={selectRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;
