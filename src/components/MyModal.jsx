import React from 'react';
import {useMutation} from 'react-query';
import { deleteUser } from './getData';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const MyModal=({modal,setModal,username,avatar_id,setLoggedInUser})=> {
    console.log('modal:',username,avatar_id)
  
  const toggle = () => setModal(!modal);
  const toggleDelete = () => {
    console.log("Törlendő:",username,avatar_id)
    mutationDelete.mutate({username:username,avatar_id:avatar_id})
  }

  const mutationDelete = useMutation(deleteUser,{
    onError: (error) =>{
        console.log(error)
    },
    onSuccess: (data) =>{
        console.log(data.data)
        setLoggedInUser({})
    }
  })

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Warning!</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your user profile?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleDelete}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
