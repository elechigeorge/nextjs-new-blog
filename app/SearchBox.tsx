'use client'

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react"

function SearchBox() {
    const [input, setInput] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!input) return;

        router.push(`/search?term=${input}`)

    }
    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto border-b flex justify-between items-center px-5">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="search news articles." className="w-full h-14 rounded-sm placeholder-gray-500 text-gray-500 outline-none bg-transparent dark:text-blue-400 flex-1" />
            <button
                type="submit"
                disabled={!input}
                className="disabled:text-gray-50 disabled:bg-gray-400 bg-slate-900 px-6 py-2 rounded-sm text-gray-100 dark:bg-gray-400 dark:text-blue-400"
            >Search
            </button>
        </form>
    )
}

export default SearchBox