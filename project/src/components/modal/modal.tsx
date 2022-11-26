import { ReactNode, useEffect } from 'react';

type Params = {
  onClose: () => void,
  children: ReactNode,
}

export function Modal({ children, onClose }: Params): JSX.Element {

  useEffect(() => {
    const handleCloseEscapeKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleCloseEscapeKeydown);

    return () => {
      document.removeEventListener('keydown', handleCloseEscapeKeydown);
    };
  }, [onClose]);

  const handleCloseClick = async () => {
    onClose();
  };

  return (
    <div className="modal__wrapper">
      <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
      <div className="modal__content">
        {children}
        <button
          onClick={handleCloseClick}
          className="modal__close-btn button-cross"
          type="button"
          aria-label="Закрыть"
        >
          <span className="button-cross__icon" />
          <span className="modal__close-btn-interactive-area" />
        </button>
      </div>
    </div>
  );
}
