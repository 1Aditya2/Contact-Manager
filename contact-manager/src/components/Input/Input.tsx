import styles from "./Input.module.css";
import clsx from "clsx";

type Props = {
  label?: string;
  required?: boolean;
  error?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  disabled?: boolean;
};

export default function Input({
  label,
  required,
  error,
  value,
  placeholder,
  onChange,
  type = "text",
  name,
  disabled = false,
}: Props) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(styles.input, error && styles.errorInput)}
      />

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}
