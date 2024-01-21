import React from 'react'
import { Modal, useDisclosure } from '@chakra-ui/react'

const useModal = (children: any, size = 'md') => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const modal = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      size={size}
    >
      {children}
    </Modal>
  )

  return { modal, onOpen, onClose }
}

export default useModal
