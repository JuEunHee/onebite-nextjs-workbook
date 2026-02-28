'use client';

// next/router (pages router용) -> next/navigation (app router용)
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/search?q=${search}`)
        }
    }

    const handleSubmit = () => {
        router.push(`/search?q=${search}`)
    }

    return (
        <div>
            <input
                type="search"
                name={search}
                onChange={onChangeSearch}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit}>
                검색
            </button>
        </div>
    )
}