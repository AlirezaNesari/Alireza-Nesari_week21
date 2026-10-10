import Image from "next/image";

import styles from "./Products.module.css";

const COLUMNS = ["نام کالا", "موجودی", "قیمت", "شناسه کالا", "عملیات"];

export default function ProductsTable({ products, onEdit, onDelete }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.id}</td>
              <td>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.editButton}
                    onClick={() => onEdit(product)}
                  >
                    <Image src="/images/edit.png" alt="edit" width={20} height={20} />
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onDelete(product)}
                  >
                    <Image src="/images/trash.png" alt="trash" width={20} height={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length}>محصولی پیدا نشد.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}