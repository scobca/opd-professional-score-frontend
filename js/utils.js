function levenshteinDistance(str1, str2) {
    const lenStr1 = str1.length;
    const lenStr2 = str2.length;

    const dp = Array(lenStr1 + 1).fill(0).map(() => Array(lenStr2 + 1).fill(0));

    for (let i = 0; i <= lenStr1; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= lenStr2; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= lenStr1; i++) {
        for (let j = 1; j <= lenStr2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
        }
    }

    return dp[lenStr1][lenStr2];
}

const getPvkEmbeddings = async (options) => {
    const sentences = []
    options.forEach(option => {
        sentences.push(option.description)
    })
    try {
        const response = await fetch('http://localhost:5000/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sentences: sentences
            }),
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

function findClosestMatch(query, options) {
    const dictionary = []
    const distances = []
    options.forEach(option => {
        dictionary.push(option.description.toLowerCase())
    })
    let minDistance = Infinity;
    let closestWord = null;

    dictionary.forEach((word, index) => {
        const distance = levenshteinDistance(query, word);
        distances.push({score: 1 / (distance + 1), ...options[index]});
    })
    distances.sort((a, b) => b.score - a.score);

    return distances.slice(0, 5);
}

export { getPvkEmbeddings, findClosestMatch }