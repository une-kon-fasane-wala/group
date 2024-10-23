import React, { useState } from 'react';
import { X } from 'lucide-react';

// Interface for Dialog props
interface DialogChildProps {
  openDialog: () => void;
  closeDialog: () => void;
  isOpen: boolean;
}

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // Clone children to pass open and close functions to the trigger and content
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<Partial<DialogChildProps>>, {
        openDialog,
        closeDialog,
        isOpen,
      });
    }
    return child;
  });

  return <>{clonedChildren}</>;
};

// Updated DialogTrigger component
export const DialogTrigger = ({
  children,
  openDialog,
}: {
  children: React.ReactNode;
  openDialog?: () => void;
}) => {
  return (
    <div onClick={openDialog} className="cursor-pointer">
      {children}
    </div>
  );
};

// Updated DialogContent component
export const DialogContent = ({
  children,
  className = '',
  isOpen,
  closeDialog,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  closeDialog?: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative bg-gray-900 p-4 rounded-lg shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${className}`}
      >
        <DialogClose onClose={closeDialog} />
        {children}
      </div>
    </div>
  );
};

// DialogHeader component
export const DialogHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};

// DialogTitle component
export const DialogTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};

// DialogClose component
export const DialogClose = ({ onClose }: { onClose?: () => void }) => {
  return (
    <button onClick={onClose} className="absolute top-2 right-2">
      <X className="h-6 w-6" />
    </button>
  );
};
