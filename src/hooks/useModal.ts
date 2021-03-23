import { useState } from 'react';

export type UseModalType = {
  isVisible: boolean;
  closeModal: () => void;
  showModal: () => void;
};

const useModal = (): UseModalType => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return { isVisible, closeModal, showModal };
};

export default useModal;
