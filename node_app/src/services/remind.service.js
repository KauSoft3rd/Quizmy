export const alphaService = (a, b) => {
    const wordA = a.info[0].word;
    const wordB = b.info[0].word;

    // 알파벳인지 한글인지 확인하는 함수
    const isAlpha = (word) => /^[a-zA-Z]/.test(word);
    const isKorean = (word) => /^[가-힣]/.test(word);

    // 알파벳이 한글보다 우선순위가 높음
    if (isAlpha(wordA) && isKorean(wordB)) return -1;
    if (isKorean(wordA) && isAlpha(wordB)) return 1;

    // 둘 다 알파벳일 때
    if (isAlpha(wordA) && isAlpha(wordB)) {
        return wordA.toLowerCase().localeCompare(wordB.toLowerCase());
    }

    // 둘 다 한글일 때
    if (isKorean(wordA) && isKorean(wordB)) {
        return wordA.localeCompare(wordB);
    }

    // 알파벳도 한글도 아닐 때
    return wordA.localeCompare(wordB);
}
