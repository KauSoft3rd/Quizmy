
// 50, 150, 350, 750, 1550
export const LevelandPercentDTO = (count, level) => {

    let percent;

    if ( level == 'Bronze' ) {
        percent = (count/50)*100+"%";
    }
    else if ( level == 'Silver' ) {
        percent = ((point-50)/100)*100+"%";
    }
    else if ( level == 'Gold' ) {
        percent = ((point-150)/200)*100+"%";
    }
    else if ( level == 'Platinum' ) {
        percent = ((point-350)/400)*100+"%";
    }
    else if ( level == 'Diamond' ) {
        percent = ((point-750)/800)*100+"%";
    }
    else if ( level == 'Ruby' ) {
        percent = ((point-1550)/1600)*100+"%";
    }

    return {
        "count": count, // 문제 개수
        "level": level,
        "percent": percent
    };
};