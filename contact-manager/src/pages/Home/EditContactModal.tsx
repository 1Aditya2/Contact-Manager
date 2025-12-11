import { Formik } from 'formik';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal'
import styles from './AddContactModal/AddContactModal.module.css';
import Input from '../../components/Input/Input';
import Selectbox from '../../components/Selectbox/Selectbox';
import { ContactFormValues, ContactSchema, stateOptions } from './helper';
import { delay } from '../../utils/helper';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { editContact } from '../../redux/contactsSlice';
import toast from 'react-hot-toast';
const EditContactModal = ({ isOpen, onClose, initialValues }: { isOpen: boolean; onClose: () => void; initialValues: ContactFormValues }) => {
    const dispatch = useAppDispatch();
    return (
        <Modal title='Edit Contact' isOpen={isOpen} onClose={onClose}>
            <Formik
                initialValues={initialValues}
                validationSchema={ContactSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await delay(2000);
                    dispatch(editContact(values));
                    toast.success('Contact edited successfully!');
                    onClose();
                }}
            >
                {({ values, errors, touched, setFieldValue, handleReset, isSubmitting, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <Input
                                    label="Name"
                                    required
                                    value={values.name}
                                    onChange={(v) => setFieldValue("name", v)}
                                    placeholder="Enter name"
                                    error={touched.name && errors.name ? (errors.name as string) : undefined}
                                />
                            </div>
                            <div className={styles.col}>
                                <Input
                                    label="Contact No."
                                    required
                                    value={values.contact}
                                    onChange={(v) => setFieldValue("contact", v)}
                                    placeholder="Enter contact no."
                                    error={touched.contact && errors.contact ? (errors.contact as string) : undefined}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col}>
                                <Input
                                    label="Email"
                                    required
                                    value={values.email}
                                    onChange={(v) => setFieldValue("email", v)}
                                    placeholder="Enter email"
                                    error={touched.email && errors.email ? (errors.email as string) : undefined}
                                />
                            </div>

                            <div className={styles.col}>
                                <Input
                                    label="Address Line 1"
                                    required
                                    value={values.address1}
                                    onChange={(v) => setFieldValue("address1", v)}
                                    placeholder="Enter address"
                                    error={touched.address1 && errors.address1 ? (errors.address1 as string) : undefined}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.col}>
                                <Input
                                    label="Address Line 2 (Optional)"
                                    value={values.address2 || ''}
                                    onChange={(v) => setFieldValue("address2", v)}
                                    placeholder="Enter address"
                                    error={touched.address2 && errors.address2 ? (errors.address2 as string) : undefined}
                                />
                            </div>

                            <div className={styles.col}>
                                <label className={styles.selectLabel}>State&nbsp;{<span className={styles.required}>*</span>}</label>
                                <Selectbox
                                    options={stateOptions}
                                    value={values.state}
                                    onChange={(v) => setFieldValue("state", v)}
                                    placeholder="Enter State"
                                />
                                {touched.state && errors.state && (
                                    <div className={styles.errorText}>{errors.state as string}</div>
                                )}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <Input
                                label="Pincode"
                                required
                                value={values.pincode}
                                onChange={(v) => setFieldValue("pincode", v)}
                                placeholder="Enter pincode"
                                error={touched.pincode && errors.pincode ? (errors.pincode as string) : undefined}
                            />
                        </div>
                        <div className={styles.bottomBar}>
                            <Button variant='outline' onClick={() => { handleReset(); onClose(); }}>
                                Cancel
                            </Button>
                            <Button type="submit"
                                disabled={isSubmitting}>
                                Edit Contact
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </Modal>
    )
}

export default EditContactModal;