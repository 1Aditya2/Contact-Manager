import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactFormValues } from "../pages/Home/helper";
import { generateId } from "../utils/helper";

interface ContactsState {
  list: ContactFormValues[];
}

const initialState: ContactsState = {
  list: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactFormValues>) => {
      const id = generateId();
      const data = { ...action.payload, id };
      state.list.unshift(data);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
    editContact: (state, action: PayloadAction<ContactFormValues>) => {
      const { id: contactId, ...rest } = action.payload;
      const updatedContacts = state.list.map((exp) => {
        return contactId === exp.id ? { id: contactId, ...rest } : { ...exp };
      });
      state.list = updatedContacts;
    },
    bulkDeleteContacts: (state, action: PayloadAction<number[]>) => {
      state.list = state.list.filter((c) => !action.payload.includes(c.id));
    },
  },
});

export const { addContact, deleteContact, bulkDeleteContacts, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;
