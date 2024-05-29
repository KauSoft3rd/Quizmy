export const alphaService = async (a, b) => {
    // const wordA = a.info[0].word;
    // const wordB = b.info[0].word;
    // return wordA.localeCompare(wordB, 'ko', { sensitivity: 'base' });

    const wordA = a.info[0].word;
    const wordB = b.info[0].word;
    const isEnglishA = /^[A-Za-z]/.test(wordA);
    const isEnglishB = /^[A-Za-z]/.test(wordB);
    if (isEnglishA && isEnglishB) return wordA.localeCompare(wordB, 'en', { sensitivity: 'base' });
    if (isEnglishA && !isEnglishB) return -1;
    if (!isEnglishA && isEnglishB) return 1;
    return wordA.localeCompare(wordB, 'ko', { sensitivity: 'base' });
}