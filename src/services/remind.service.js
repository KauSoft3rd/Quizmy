// 정렬 알고리즘
export const alphaService = (a, b) => {
    // wordsList.sort((a, b) => a.info[0].word.localCompare(b.info[0].word));
    const wordA = a.info[0].word.toUpperCase();
    const wordB = b.info[0].word.toUpperCase();

    if ((wordA.charCodeAt(0) < 128 && wordB.charCodeAt(0) < 128) ||
        (wordA.charCodeAt(0) >= 128 && wordB.charCodeAt(0) >= 128)) {
        return wordA.localeCompare(wordB);
    }

    if (wordA.charCodeAt(0) < 128) return -1;
    if (wordB.charCodeAt(0) < 128) return 1;
    return 0;
}