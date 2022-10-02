import React, { useState, useEffect } from 'react'

function SuggestionsBar() {

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        setSuggestions(randomPhrase(5))
    }, [])

    let suggestedWords = [
        "How are you?",
        "What's up?",
        "How's it going?",
        "Are you OK?",
        "What is your Name?",
        "Are you Happy?",
        "Are you Happy?",
        "Are you Happy?",
    ]

    let randomPhrase = (amount) => {
        let words = []
        for (let i = 0; i++; i < amount) {
            words.push(suggestedWords[Math.floor(Math.random() * suggestedWords.length)])
        }
        return words
    }


    return (
        <div className="w-full max-w-full bg-gray-200 h-fit p-2">
            <h3 className="text-lg font-bold">Suggestions:</h3>
            <div className="flex w-full max-w-full gap-2 overflow-x-scroll">
                {
                    suggestedWords.map((item) => {
                        return (
                            <h3 className="px-2 py-1 whitespace-nowrap min-w-fit h-fit">
                                {item}
                            </h3>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default SuggestionsBar