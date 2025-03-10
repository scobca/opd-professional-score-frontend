let controller = null

async function query(data) {
    try {
        if (controller) {
            controller.abort()
        }
        controller = new AbortController()
        const signal = controller.signal
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2",
            {
                headers: {
                    Authorization: "Bearer TOKEN",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
                signal
            }
        );
        const result = await response.json();
        return result;
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
            return similarities.slice(0, 5);
        }
        return []
    } catch (error) {}
}

export { findClosestMatch };