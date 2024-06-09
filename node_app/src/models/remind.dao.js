import { getWordInfoSql, getUserWorkbookLevelSql, getWordsUnderUserLevelSql, 
    getUserRemindListSql, todayRemindListSql, getNewestRemindListSql, 
    updateWordsCntSql,
    getWordsCntDataSql,
    updateWordsCntZeroSql,
    updateWordsLevelSql} from "./remind.sql";
import { pool } from "../config/db.config";

// 사용자 퀴즈북 레벨 조회
export const getUserQuizbookLevelDao = async (user_id) => {
try {
    const db = await pool.getConnection();
    const [quizbookLevel] = await db.query(getUserWorkbookLevelSql, [user_id]); // 사용자의 퀴즈북 레벨 조회
    const [wordsList] = await db.query(getWordsUnderUserLevelSql, quizbookLevel[0].quizbook); // 레벨보다 낮은 모든 단어를 조회
    db.release();
    return wordsList;
} catch ( error ) {
    return error;
}
}

// 사용자가 시도한 누적 단어를 조회
export const getWordsInfoDao = async (user_id) => {
try {
    const db = await pool.getConnection();
    const [userRemindList] = await db.query(getUserRemindListSql, [user_id]);
    const remindList = await Promise.all(userRemindList.map(async (item) => {
        const [info] = await db.query(getWordInfoSql, [item.words_id]);
        return { item, info };
    }))
    db.release();
    return remindList;
} catch ( error ) {
    return error;
}
}

// 사용자가 시도한 당일 단어를 조회
export const getTodayRemindDao = async (user_id) => {
try {
    const db = await pool.getConnection();
    const [userRemindList] = await db.query(todayRemindListSql, [user_id]);
    const remindList = await Promise.all(userRemindList.map(async (item) => {
        const [info] = await db.query(getWordInfoSql, [item.words_id]);
        return { item, info };
    }))
    db.release();
    return remindList;
} catch ( error ) {
    return error;
}
}

// 사용자가 시도한 단어를 최신순 조회
export const getNewestRemindDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(getNewestRemindListSql, user_id);
        console.log(userRemindList);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return {item, info};
        }))
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}

// 사용자가 시도한 단어를 가나다순 조회
export const getAlphaRemindDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(getUserRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }))

        remindList.sort((a, b) => a.info.word.localCompare(b.info.word));
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}


// 오늘 시도한 단어를 최신순으로 조회
import { todayNewestRemindListSql } from './remind.sql';
export const getTodayNewestRemindDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(todayNewestRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }))
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}


// 누적 시도한 단어를 최신순으로 조회
import { accNewestRemindListSql } from "./remind.sql";
export const getAccNewestRemindDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(accNewestRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }));
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}


// 오늘 시도한 단어중 정답을 조회
import { todayCorrectRemindListSql } from './remind.sql';
export const getTodayCorrectRemindListDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(todayCorrectRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }));
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}


// 오늘 시도한 단어중 오답을 조회
import { todayIncorrectRemindListSql } from './remind.sql';
export const getTodayIncorrectRemindListDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(todayIncorrectRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }));
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}


// 누적 시도한 단어중 정답을 조회
import { accCorrectRemindListSql } from "./remind.sql";
export const getAccCorrectRemindListDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(accCorrectRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }));
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}

// 누적 시도한 단어중 오답을 조회
import { accIncorrectRemindListSql } from "./remind.sql";
import { alphaService } from "../services/remind.service";
export const getAccIncorrectRemindListDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(accIncorrectRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }));
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}


export const getTodayAlphaRemindListDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(todayRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }));

        remindList.sort(alphaService);
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}

export const getAccAlphaRemindListDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(getUserRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }));

        remindList.sort(alphaService);
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}


// Words 테이블 cnt 값 늘리기
// 많이 틀리면 레벨 올림
// 틀린 사람이 10명이 넘으면 레벨 ++ 
// 틀릴 때마다 그 단어에 cnt ++ 해서 (cnt = 해당 단어를 틀린 사람 수)
// cnt 10 되면 해당 단어 레벨 ++ 하고 cnt 0 초기화
export const updateWordsCntDao = async (words_id) => {
    try {
        const db = await pool.getConnection();
        console.log("1");   

        const [updateWordsCntData] = await db.query(updateWordsCntSql, [words_id]);

        const wordsCntData = await db.query(getWordsCntDataSql, [words_id]);

        console.log("wordsCntData: ", wordsCntData[0][0].cnt);

        if(wordsCntData[0][0].cnt >= 10) {
            // cnt 0으로 초기화
            // 레벨 ++
            await db.query(updateWordsLevelSql, [words_id]);
        }

        const newWordsCntData = await db.query(getWordsCntDataSql, [words_id]);

        console.log('newWordsCntData: ', newWordsCntData[0][0]);

        db.release();
        return newWordsCntData[0][0];
    } catch ( error ) {
        console.log(error);
        return error;
    }
}

/*
// DB 갱신을 위한 DAO
import { countWords } from './remind.sql';
export const updateWordsLevelDao = async () => {
    try {
        const db = await pool.getConnection();
        const [wordsList] = await db.query(await db.query(` UPDATE Words
        SET level = CASE
                        WHEN words_id IN (
                            SELECT words_id
                            FROM Remind
                            GROUP BY words_id
                            HAVING COUNT(*) >= 10 AND
                                   SUM(CASE WHEN grade = 0 THEN 1 ELSE 0 END) / COUNT(*) >= 0.7
                        ) THEN level + 1
                        WHEN words_id IN (
                            SELECT words_id
                            FROM Remind
                            GROUP BY words_id
                            HAVING COUNT(*) >= 10 AND
                                   SUM(CASE WHEN grade = 0 THEN 1 ELSE 0 END) / COUNT(*) < 0.7
                        ) THEN level - 1
                        ELSE level
                    END
        WHERE words_id IN (
            SELECT words_id
            FROM Remind
            GROUP BY words_id
            HAVING COUNT(*) >= 10
        );
    `));

        // const wordsId = wordsList.map(word => word.words_id);
        // console.log(wordsId);
        // if (wordsId.length > 0) {
        //     await db.query(`
        //     UPDATE Words
        //     SET level = level + 1
        //     WHERE words_id IN (?);
        // `, [wordsId])
        // }
        // console.log(wordsList);
        db.commit();
    } catch ( error ) {
        return error;
    }
}
*/