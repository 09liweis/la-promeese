export function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1 > 9) ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate();
    return year + '-' + month + '-' + day;
}

export function getDateDifferent(date) {
    var date1 = new Date(date);
    var currentDate = new Date();
    var timeDiff = Math.abs(date1.getTime() - currentDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays;
}