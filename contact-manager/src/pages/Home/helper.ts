import * as Yup from "yup";
import { Option } from "../../components/Selectbox/Selectbox";
export const ContactSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    contact: Yup.string()
        .trim()
        .matches(/^[0-9]+$/, "Contact must contain only digits")
        .min(7, "Enter a valid contact")
        .max(15, "Enter a valid contact")
        .required("Contact is required"),
    email: Yup.string().trim().email("Invalid email").required("Email is required"),
    address1: Yup.string().trim().required("Address is required"),
    address2: Yup.string().trim().notRequired(),
    state: Yup.string().nullable().required("State is required"),
    pincode: Yup.string()
        .trim()
        .matches(/^[0-9]{5,6}$/, "Pincode must be 5 or 6 digits")
        .required("Pincode is required"),
});
export const stateOptions: Option[] =
    [
        { value: "AP", label: "Andhra Pradesh" },
        { value: "BR", label: "Bihar" },
        { value: "GJ", label: "Gujarat" },
        { value: "HR", label: "Haryana" },
        { value: "KA", label: "Karnataka" },
        { value: "KL", label: "Kerala" },
        { value: "MP", label: "Madhya Pradesh" },
        { value: "PB", label: "Punjab" },
    ];
export type ContactFormValues = {
    id: number;
    name: string;
    contact: string;
    email: string;
    address1: string;
    address2?: string;
    state: string | null;
    pincode: string;
};
export const initialContactFormValues = {
    id: 0,
    name: '',
    contact: '',
    email: '',
    address1: '',
    state: '',
    pincode: ''
}