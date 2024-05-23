export const alphaService = async (a, b) => {
    const wordA = a.info[0].word;
    const wordB = b.info[0].word;
    return wordA.localeCompare(wordB, 'ko', { sensitivity: 'base' });
}