import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { KeyboardEvent, ChangeEvent, ReactNode } from 'react'
import style from './SearchableLayout.module.css'

export default function SearchableLayout({ children }: {
    children: ReactNode
}) {
    const router = useRouter();
    const [keyword, setKeyword] = useState<string | string[]>('');

    const q = router.query.q;
    
    useEffect(() => {
        setKeyword(q || "");
    }, [q])

    const handleUpdateKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/search?q=${keyword}`)
        }
    }

    const handleSubmit = () => {
        if (!keyword || q === keyword) {
            return;
        }
        router.push(`/search?q=${keyword}`)
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                  type="text"
                  value={keyword}
                  onKeyDown={handleKeyDown}
                  onChange={handleUpdateKeyword}
                  placeholder='검색어를 입력해주세요'
                />
                <button
                    onClick={handleSubmit}
                >
                    검색
                </button>
            </div>
            {children}
        </div>
    )
}