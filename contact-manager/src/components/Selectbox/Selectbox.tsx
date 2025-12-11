import React, { useEffect, useRef, useState } from "react";
import styles from "./Selectbox.module.css";
import clsx from "clsx";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  name?: string;
  id?: string;
  ariaLabel?: string;
  maxHeight?: number;
};

export default function Selectbox({
  options,
  value = null,
  onChange,
  placeholder = "Enter State",
  disabled = false,
  searchable = false,
  name,
  id,
  ariaLabel,
  maxHeight = 260,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [hoverIndex, setHoverIndex] = useState<number>(-1);

  const selectedOption = options.find((o) => o.value === value) ?? null;

  useEffect(() => {
    if (!open) {
      setFilter("");
      setHoverIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      const visible = filteredOptions;
      if ( ["ArrowDown","ArrowUp","Enter"].includes(e.key) ) {
        e.preventDefault();
      }
      if (e.key === "ArrowDown") {
        setHoverIndex((i) => Math.min(i + 1, visible.length - 1));
        scrollIntoView(hoverIndex + 1);
      } else if (e.key === "ArrowUp") {
        setHoverIndex((i) => Math.max(i - 1, 0));
        scrollIntoView(hoverIndex - 1);
      } else if (e.key === "Enter") {
        if (hoverIndex >= 0 && hoverIndex < visible.length) {
          const sel = visible[hoverIndex];
          handleSelect(sel);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, hoverIndex]);

  const scrollIntoView = (index: number) => {
    const list = listRef.current;
    if (!list || index < 0) return;
    const item = list.children[index] as HTMLElement | undefined;
    if (item) item.scrollIntoView({ block: "nearest" });
  };

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((v) => !v);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelect = (opt: Option) => {
    onChange(opt.value);
    setOpen(false);
  };

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(null);
    setOpen(false);
  };

  return (
    <div
      className={clsx(styles.container, disabled && styles.disabled)}
      ref={containerRef}
      id={id}
      data-testid="select-root"
    >
      <div
        className={clsx(styles.control, open && styles.controlOpen)}
        onClick={toggleOpen}
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-owns={`${id ?? name ?? "select"}-listbox`}
        aria-label={ariaLabel ?? placeholder}
      >
        {searchable ? (
          <input
            ref={inputRef}
            className={styles.input}
            placeholder={selectedOption ? selectedOption.label : placeholder}
            value={open ? filter : selectedOption?.label ?? ""}
            onChange={(e) => {
              setFilter(e.target.value);
              setHoverIndex(0);
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!open) setOpen(true);
            }}
            disabled={disabled}
            aria-controls={`${id ?? name ?? "select"}-listbox`}
          />
        ) : (
          <div className={clsx(styles.display, !selectedOption && styles.placeholder)}>
            {selectedOption ? selectedOption.label : placeholder}
          </div>
        )}
        <div className={styles.controls}>
          {selectedOption && !disabled && (
            <button
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear selection"
              type="button"
            >
              ✕
            </button>
          )}

          <div className={styles.chev} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
      {open && (
        <ul
          ref={listRef}
          id={`${id ?? name ?? "select"}-listbox`}
          role="listbox"
          className={styles.menu}
          style={{ maxHeight: maxHeight }}
        >
          {filteredOptions.length === 0 && (
            <li className={styles.empty}>No results</li>
          )}

          {filteredOptions.map((opt, idx) => {
            const active = idx === hoverIndex;
            const selected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                className={clsx(styles.option, active && styles.optionHover, selected && styles.optionSelected)}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(-1)}
                onClick={() => handleSelect(opt)}
              >
                <span className={styles.optionLabel}>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
