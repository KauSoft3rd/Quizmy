export const LevelandPercentDTO = (point, level) => {

    console.log("point: ", point);

    let percent;
    let levelName;

    if ( level == 1 ) {
        percent = (point/100)*100+"%";
        levelName = 'Bronze';
    }
    else if ( level == 2 ) {
        percent = ((point-100)/200)*100+"%";
        levelName = 'Silver';
    }
    else if ( level == 3 ) {
        percent = ((point-200)/400)*100+"%";
        levelName = 'Gold';
    }
    else if ( level == 4 ) {
        percent = ((point-400)/800)*100+"%";
        levelName = 'Platinum';
    }
    else if ( level == 5 ) {
        percent = ((point-800)/1600)*100+"%";
        levelName = 'Diamond';
    }
    else if ( level == 6 ) {
        percent = ((point-1600)/3200)*100+"%";
        levelName = 'Ruby';
    }


    return {
        "point": point,
        "level": levelName,
        "percent": percent
    };
};