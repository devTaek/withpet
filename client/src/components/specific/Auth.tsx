import { useState } from 'react';

import Login from './Login';
import Register from './Register';
import Modal from '../common/Modal';

interface AuthProps {
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({onClose}) => {
  const [showComponent, setShowComponent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      {isModalOpen &&
        <Modal onCloseBtn={onClose}>
          {showComponent
            ? <Register setShowComponent={setShowComponent} />
            : <Login setShowComponent={setShowComponent}/>
          }
        </Modal>
      }  
    </>
  );
}

export default Auth;
