import React, { useMemo, useState } from "react";
import styles from "./Table.module.css";
import clsx from "clsx";

export type ContactRow = {
  id: number;
  name: string;
  contact: string;
  email: string;
  address1: string;
  [k: string]: any;
};

export type RowAction<RowType = ContactRow> = {
  key: string;
  label: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  onClick?: (row: RowType) => void;
};

type Props<RowType = ContactRow> = {
  rows: RowType[];
  actions?: RowAction<RowType>[];
  onSelectionChange?: (selectedIds: number[]) => void;
  initialSelectedIds?: number[];
  caption?: string;
};
export default function Table<RowType extends { id: number }>({
  rows,
  actions = [],
  onSelectionChange,
  initialSelectedIds = [],
  caption,
}: Props<RowType>) {
  const [selected, setSelected] = useState<Record<number, true>>(
    () =>
      initialSelectedIds.reduce((acc, id) => {
        acc[id] = true;
        return acc;
      }, {} as Record<number, true>)
  );

  const selectedIds = useMemo(() => Object.keys(selected).map((each) => Number(each)), [selected]);
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  React.useEffect(() => {
    onSelectionChange?.(selectedIds);
  }, [selectedIds, onSelectionChange]);

  const toggleOne = (id: number) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected({});
    } else {
      const next: Record<number, true> = {};
      for (const r of rows) next[r.id] = true;
      setSelected(next);
    }
  };

  return (
    <div className={styles.tableWrap}>
      {caption && <div className={styles.caption}>{caption}</div>}

      <div className={styles.tableContainer}>
        <table className={styles.table} role="table" aria-label={caption ?? "Contacts table"}>
          <thead>
            <tr>
              <th className={styles.colCheckbox}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    aria-label={allSelected ? "Unselect all" : "Select all"}
                    checked={allSelected}
                    ref={(el) => {
                      if (!el) return;
                      el.indeterminate = someSelected;
                    }}
                    onChange={toggleAll}
                  />
                </label>
              </th>
              <th className={styles.colName}>Name</th>
              <th className={styles.colContact}>Contact</th>
              <th className={styles.colEmail}>Email</th>
              <th className={styles.colAddress}>Address</th>
              <th className={styles.colAction}>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const isChecked = !!selected[row.id];
              return (
                <tr key={row.id} className={clsx(styles.row, isChecked && styles.rowSelected)}>
                  <td className={styles.colCheckbox}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOne(row.id)}
                        aria-label={`Select ${("name" in row && (row as any).name) || row.id}`}
                      />
                    </label>
                  </td>

                  <td className={styles.colName}>
                    <div className={styles.cellPrimary}>{(row as any).name}</div>
                  </td>

                  <td className={styles.colContact}>
                    <div className={styles.cellSecondary}>{(row as any).contact}</div>
                  </td>

                  <td className={styles.colEmail}>
                    <div className={styles.cellSecondary}>{(row as any).email}</div>
                  </td>

                  <td className={styles.colAddress}>
                    <div className={styles.cellSecondary}>{(row as any).address1}</div>
                  </td>

                  <td className={styles.colAction}>
                    <div className={styles.actions}>
                      {actions.map((act) => {
                        return (
                            <span key={act.key} onClick={() => act.onClick?.(row)} className={styles.actionLabel}>{act.label}</span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileView}>
        {rows.length > 0 && (
          <div className={styles.mobileSelectAll}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                aria-label={allSelected ? "Unselect all" : "Select all"}
                checked={allSelected}
                ref={(el) => {
                  if (!el) return;
                  el.indeterminate = someSelected;
                }}
                onChange={toggleAll}
              />
              <span className={styles.mobileSelectAllText}>
                {allSelected ? "Unselect all" : "Select all"}
              </span>
            </label>
          </div>
        )}
        {rows.length === 0 ? (
          <div className={styles.empty}>No records</div>
        ) : (
          rows.map((row) => {
            const isChecked = !!selected[row.id];
            return (
              <div
                key={row.id}
                className={clsx(styles.mobileCard, isChecked && styles.mobileCardSelected)}
              >
                <div className={styles.mobileCardHeader}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(row.id)}
                      aria-label={`Select ${("name" in row && (row as any).name) || row.id}`}
                    />
                  </label>
                  <div className={styles.mobileCardName}>{(row as any).name}</div>
                </div>
                <div className={styles.mobileCardBody}>
                  <div className={styles.mobileCardRow}>
                    <span className={styles.mobileCardLabel}>Contact:</span>
                    <span className={styles.mobileCardValue}>{(row as any).contact}</span>
                  </div>
                  <div className={styles.mobileCardRow}>
                    <span className={styles.mobileCardLabel}>Email:</span>
                    <span className={styles.mobileCardValue}>{(row as any).email}</span>
                  </div>
                  <div className={styles.mobileCardRow}>
                    <span className={styles.mobileCardLabel}>Address:</span>
                    <span className={styles.mobileCardValue}>{(row as any).address1}</span>
                  </div>
                </div>
                <div className={styles.mobileCardActions}>
                  {actions.map((act) => {
                    return (
                      <span
                        key={act.key}
                        onClick={() => act.onClick?.(row)}
                        className={styles.actionLabel}
                      >
                        {act.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
