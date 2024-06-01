
// 50, 150, 350, 750, 1550
export const LevelandPercentDTO = (count, level) => {

    let percent;

    if ( level == 1 ) {
        percent = (count/50)*100;
    }
    else if ( level == 2) {
        percent = ((count-50)/100)*100;
    }
    else if ( level == 3 ) {
        percent = ((count-150)/200)*100;
    }
    else if ( level == 4 ) {
        percent = ((count-350)/400)*100;
    }
    else if ( level == 5 ) {
        percent = ((count-750)/800)*100;
    }
    else if ( level == 6 ) {
        percent = ((count-1550)/1600)*100;
    }

    return {
        "count": count, // 문제 개수
        "level": level,
        "percent": percent
    };
};
