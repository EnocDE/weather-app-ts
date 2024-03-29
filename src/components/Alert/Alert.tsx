import { ReactNode } from "react"
import styles from "./Alert.module.css"

export default function Error({children}  : {children: ReactNode}) {
  return (
    <div className={styles.error}>
      <p className={styles.message}>{children}</p>
    </div>
  )
}
