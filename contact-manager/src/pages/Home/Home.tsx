import { useCallback, useMemo, useState } from 'react'
import Searchbar from '../../components/Searchbar/Searchbar'
import Table, { ContactRow } from '../../components/Table/Table'
import styles from './Home.module.css'
import Button from '../../components/Button/Button'
import AddContactModal from './AddContactModal/AddContactModal'
import { Edit, Trash2 } from "lucide-react";
import EditContactModal from './EditContactModal'
import DeleteContact from './DeleteContact/DeleteContact'
import { useAppSelector } from '../../hooks/reduxHooks'
import { ContactFormValues, initialContactFormValues } from './helper'
const Home = () => {
  const contacts = useAppSelector((state) => state.contacts.list);
  const [search, setSearch] = useState('');
  const [addContact, setAddContact] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [deleteContact, setDeleteContact] = useState(false);
  const [currentRow, setCurrentRow] = useState<ContactFormValues>(initialContactFormValues);
  const [bulk, setBulk] = useState(false);
  const [multiIds, setMultiIds] = useState<number[]>([]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(({ name, email }) => {
      return name.toLowerCase().includes(search.toLowerCase()) || email.toLowerCase().includes(search.toLowerCase());
    })
  }, [contacts, search]);

  const handleDelete = useCallback(({ id }: ContactRow) => {
    setDeleteContact(true);
    setBulk(false);
    const rowData = filteredContacts.find((each) => each.id === id) || initialContactFormValues;
    setCurrentRow(rowData);
  }, [filteredContacts]);

  const handleEdit = useCallback(({ id }: ContactRow) => {
    setEditContact(true);
    const rowData = filteredContacts.find((each) => each.id === id) || initialContactFormValues;
    setCurrentRow(rowData);
  }, [filteredContacts]);

  const rowActions = useMemo(() => {
    return [
      {
        label: <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '24px', height: '24px', borderRadius: '2px' }}>
            <Edit size={14} color={'#006EFA'} />
          </div>
          <p style={{ color: '#64748B' }}>Edit</p>
        </div>,
        key: 'edit',
        onClick: handleEdit
      },
      {
        label: <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '24px', height: '24px', borderRadius: '2px' }}>
            <Trash2 size={14} color={'#E11D48'} />
          </div>
          <p style={{ color: '#64748B' }}>Delete</p>
        </div>,
        key: 'delete',
        onClick: handleDelete
      }
    ]
  }, [handleDelete, handleEdit]);

  const handleRowSelection = (ids: number[]) => {
    setMultiIds(ids);
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.contactManagerContainer}>
        <p className={styles.contactManagerHeading}>Contact Manager</p>
        <div className={styles.contactBody}>
          <div className={styles.searchAndButtonCont}>
            <Searchbar value={search} onChange={setSearch} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {multiIds.length !== 0 && <Button onClick={() => { setDeleteContact(true); setBulk(true); }}>Bulk Delete</Button>}
              <Button onClick={() => setAddContact(true)}>Add Contact</Button>
            </div>
          </div>
          <Table onSelectionChange={handleRowSelection} actions={rowActions} rows={filteredContacts} />
        </div>
      </div>
      {addContact && <AddContactModal isOpen={addContact} onClose={() => setAddContact(false)} />}
      {editContact && <EditContactModal isOpen={editContact} onClose={() => setEditContact(false)} initialValues={currentRow} />}
      {deleteContact && <DeleteContact count={bulk ? multiIds.length : 0} isOpen={deleteContact}
        onClose={() => setDeleteContact(false)}
        id={bulk ? multiIds : currentRow.id} />}
    </div>
  )
}

export default Home