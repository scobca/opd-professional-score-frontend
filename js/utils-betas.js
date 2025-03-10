let controllers = []

async function generateSbertEmbedding(text) {
    try {
        if (controller) {
            controller.abort()
        }
        controller = new AbortController()
        const signal = controller.signal
        const response = await fetch('https://api-inference.huggingface.co/models/ai-forever/sbert_large_nlu_ru', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text),
            signal
        });
        const embedding = await response.json()
        console.log(embedding)
        return embedding[0]// Возвращает вектор предложения
    } catch (error) {

    }
}

async function fetchWithDifferentBodies(bodies) {
    try {
        controllers.forEach(controller => {
            controller.abort()
        })
        const promises = bodies.map(body => {
            const controller = new AbortController()
            const signal = controller.signal
            return fetch('https://api-inference.huggingface.co/models/ai-forever/sbert_large_nlu_ru', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer TOKEN',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                signal
            });
        });

        const responses = await Promise.all(promises);
        return await Promise.all(responses.map(response => response.json()));
    } catch (error) {
    }
}

function dotProduct(a, b) {
    return a.reduce((sum, val, idx) => sum + val * b[idx], 0);
}

function magnitude(vector) {
    return Math.sqrt(vector.reduce((sum, val) => sum + val ** 2, 0));
}

function cosineSimilarity(a, b) {
    return dotProduct(a, b) / (magnitude(a) * magnitude(b));
}

const getPvkEmbeddings = async (options) => {
    const bodies = []
    options.forEach((option) => {
        bodies.push(option.description)
    })
    return await fetchWithDifferentBodies(bodies)
}

async function findClosestMatch(searchString, embeddedData, options) {
    const embeddedSearch = await generateSbertEmbedding(searchString)
    try {
        let closestMatch = null;
        let maxSimilarity = -Infinity;

        embeddedData.forEach(((embedding, index) => {
            if (index !== 0) {
                const similarity = cosineSimilarity(embeddedSearch, embedding);
                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    closestMatch = index;
                }
            }
        }))

        console.log(options[closestMatch+1].description)
        return options[closestMatch+1];
    } catch (error) {
        console.error('Ошибка в поиске:', error);
    }
}


export { getPvkEmbeddings, findClosestMatch }