
// 50, 150, 350, 750, 1550
export const LevelandPercentDTO = (count, level) => {

    let percent;

    if ( level == 'Bronze' ) {
        percent = (count/50)*100+"%";
    }
    else if ( level == 'Silver' ) {
        percent = ((count-50)/100)*100+"%";
    }
    else if ( level == 'Gold' ) {
        percent = ((count-150)/200)*100+"%";
    }
    else if ( level == 'Platinum' ) {
        percent = ((count-350)/400)*100+"%";
    }
    else if ( level == 'Diamond' ) {
        percent = ((count-750)/800)*100+"%";
    }
    else if ( level == 'Ruby' ) {
        percent = ((count-1550)/1600)*100+"%";
    }

    return {
        "count": count, // 문제 개수
        "level": level,
        "percent": percent
    };
};