let controllers = []

async function generateSbertEmbedding(data) {
    try {
        controllers.forEach(controller => {
            controller.abort()
        })
        const controller = new AbortController()
        const signal = controller.signal
        const response = await fetch('https://api-inference.huggingface.co/models/ai-forever/sbert_large_nlu_ru', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal
        });
        return await response.json();
    } catch (error) {

    }
}

// function cosineSimilarity(embedding1, embedding2) {
//     if (embedding1.length !== embedding2.length) {
//         throw new Error("Vectors must have the same length");
//     }
//     let dotProduct = 0;
//     let magnitude1 = 0;
//     let magnitude2 = 0;
//
//     for (let i = 0; i < embedding1.length; i++) {
//         dotProduct += embedding1[i] * embedding2[i];
//         magnitude1 += Math.pow(embedding1[i], 2);
//         magnitude2 += Math.pow(embedding2[i], 2);
//     }
//
//     magnitude1 = Math.sqrt(magnitude1);
//     magnitude2 = Math.sqrt(magnitude2);
//
//     if (magnitude1 === 0 || magnitude2 === 0) {
//         return 0; // Handle zero vectors
//     }
//
//     return dotProduct / (magnitude1 * magnitude2);
// }

function cosineSimilarity(A, B) {
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;

    for(let i = 0; i < A.length; i++) {
        dotProduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    return dotProduct / (mA * mB);
}


const getPvkEmbeddings = async (options) => {
    const bodies = []
    options.forEach((option) => {
        bodies.push(option.description)
    })
    return await generateSbertEmbedding({inputs: bodies})
}

async function findClosestMatch(searchString, embeddedData, options) {
    const embeddedSearch = await generateSbertEmbedding(searchString)
    try {
        const matches = []

        embeddedData.forEach(((embedding, index) => {
            const similarity = cosineSimilarity(embeddedSearch[0][0], embedding[0][0]);
            matches.push([similarity, index]);
        }))
        matches.sort((a, b) => b[0] - a[0])
        const topMatches = matches.slice(0, 5)
        const topOptions = []
        topMatches.forEach(match => {
            topOptions.push({...options[match[1]], score: match[0]});
        })
        return topOptions;
    } catch (error) {
        console.error('Ошибка в поиске:', error);
    }
}


export { getPvkEmbeddings, findClosestMatch }