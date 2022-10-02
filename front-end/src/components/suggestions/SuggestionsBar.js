import React, { useState, useEffect } from 'react'

function SuggestionsBar({ sendMessage, setInputText }) {

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
        <div>
            <h3 className="text-lg font-bold">Suggestions:</h3>
            <div class="w-full max-w-full h-fit overflow-auto">
                <div class="flex flex-nowrap gap-2">
                    {
                        suggestedWords.map((item) => {
                            return (
                                    <h3 className="px-2 py-1 min-w-fit min-h-fit flex-none hover:bg-purple-100 hover:cursor-pointer hover:border-purple-300 border border-gray-300 rounded-lg" onClick={() => {
                                        setInputText(item)
                                    }} >
                                        {item}
                                    </h3>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SuggestionsBar