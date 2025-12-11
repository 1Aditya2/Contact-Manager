import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { bulkDeleteContacts, deleteContact } from '../../../redux/contactsSlice';
import { delay } from '../../../utils/helper';
import styles from './DeleteContact.module.css';
import toast from 'react-hot-toast';
const DeleteContact = ({ isOpen, onClose, count = 0, id }: { isOpen: boolean; onClose: () => void; count?: number; id: number|number[]; }) => {
    const dispatch = useAppDispatch();
    const [loader, setLoader] = useState(false);
    const handleDelete = async () => {
        setLoader(true);
        await delay(3000);
        if (typeof id === 'number') {
            dispatch(deleteContact(id));
            toast.success('Contact deleted successfully!');
        } else {
            dispatch(bulkDeleteContacts(id));
            toast.success('Contacts deleted successfully!');
        }
        setLoader(false);
        onClose();
    };

    return (
        <Modal title={`Delete Contact${count === 0 ? '' : `(${count})`}`} isOpen={isOpen} onClose={onClose} size='sm'>
            <div className={styles.deleteContactBody}>
                <p>Are you sure you want to delete {count === 0 ? 'this':count} contact{count <= 1 ? '':'s'}? This action cannot be undone.</p>
            </div>
            <div className={styles.bottomBar}>
                <Button variant='outline' onClick={() => { onClose(); }}>
                    Cancel
                </Button>
                <Button onClick={handleDelete} variant='danger' type="submit"
                    disabled={loader}>
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteContact