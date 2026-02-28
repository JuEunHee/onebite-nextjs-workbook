import Link from 'next/link'
import { ReactNode } from 'react';
import styles from './GlobalLayout.module.css'

export default function Page({ children }: {
    children: ReactNode
}) {
    return (
        <div className={styles.appContainer}>
            <header>
                <Link href={'/'}>
                    ONEBITE CINEMA
                </Link>
            </header>

            {children}

            <footer className={styles.footer}>
                &copy; 2026 ONEBITE CINEMA. All rights reserved.
            </footer>
        </div>
    )
}