import {getCookie} from "./cookieHandler.js";

let controller = new AbortController()

async function query(data) {
    try {
        controller.abort()
        controller = new AbortController()
        const signal = controller.signal
        const response = await fetch(
            "http://localhost:8081/get-sentences-vectors", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${getCookie("jwt")}`,
                    "Content-type": "application/json"
                },
                signal
            }
        );
        const result = await response.json();
        if (result.status === 200) {
            return result.data
        }
    } catch (error) {}
}

async function findClosestMatch(searchString, options) {
    try {
        const sentences = []
        options.forEach(option => {
            sentences.push(option.description.toLowerCase())
        })
        const matches = await query({"inputs": {
                "source_sentence": searchString,
                "sentences": sentences
            }})
        if (matches !== undefined) {
            const similarities = []
            matches.forEach((match, index) => {
                similarities.push({score: match, ...options[index]})
            })
            similarities.sort((a, b) => b.score - a.score)
            return similarities.slice(0, 7);
        }
        return []
    } catch (error) {}
}

export { findClosestMatch };