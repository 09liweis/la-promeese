export function getCurrentDate(rawDate) {
    let date;
    if (typeof rawDate != 'undefined') {
        date = new Date(rawDate);
    } else {
        date = new Date();   
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1 > 9) ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = (date.getDate() > 9) ? date.getDate() : '0' + date.getDate();
    return year + '-' + month + '-' + day;
}

export function getDateDifferent(date) {
    var date1 = new Date(date);
    var currentDate = new Date();
    var timeDiff = Math.abs(date1.getTime() - currentDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays;
}

export function getNewDateDes(id) {
    var newDateDes = '获批时间至';
    if (id != '') {
        switch (id) {
            case '7': //签证申请
                newDateDes = '获批时间至';
                break;
            case '8': //移民申请
                newDateDes = '登陆时间';
                break;
            case '9':
                newDateDes = '入职时间';
                break;
            case '53':
            case '54':
            case '55':
            case '75': //过期签证
            case '47': //小签
            case '76':
            case 'LMIA+境外工签':
            case '77':
            case '父母探亲':
            case '78':
            case '旅游签':
                newDateDes = '准签信出信时间';
                break;
            case '76':
                newDateDes = '获批时间至';
                break;
            case '79':
            case '80':
                newDateDes = '获批时间';
                break;
            case '护照补办':
            case '59':
                newDateDes = '预约时间';
                break;
            case '调档':
            case '74':
                newDateDes = '掉档信出信时间';
                break;
            default:
                newDateDes = '获批时间至';
        }
    }
    return newDateDes;
}

export function checkNeedExtraVisa(id) {
    const subServices = ['53', '54', '55', '76'];
    return subServices.indexOf(id) != -1;
}

export function getExtraVisaDes(id) {
    let des = '';
    switch (id) {
        case '53':
        case '54':
        case '55':
            des = '签证获批至';
            break;
        case '76':
        case 'LMIA+境外工签':
            des = 'LMIA获批时间至';
            break;
        default:
            des = '';
    }
    return des;
}

export function getColor(id) {
    let color = '';
    switch(id) {
        case '1':
        case '材料欠缺':
            color = 'has-text-info';
            break;
        case '放弃申请':
            color = 'has-text-danger';
            break;
        case '申请递交':
            color = 'has-text-success';
            break;
        default:
            color = '';
            break;
    }
    return color;
}

export function parseSearchParams(search) {
    let params = {};
    search.replace('?', '').split('&').map((param) => {
        const array = param.split('=');
        params[array[0]] = array[1];
    });
    
    if (typeof params.page == 'undefined') {
        params.page = 1;
    } else {
        params.page = params.page;
    }
    return params;
}

export function getSearchLink(search) {
    let query = '';
    delete search['page'];
    Object.keys(search).map((key) => {
        query += '&' + key + '=' + search[key];
    });
    return query;
}

export function getDateColor(date, type) {
    if (type == 'visa') {
        let visaColor = '';
        let visaDiffDate = getDateDifferent(date);
        if (date > getCurrentDate()) {
            visaColor = (visaDiffDate < 90) ? 'has-text-success' : '';
        } else {
            visaColor = 'has-text-brown';
        }
        return visaColor;   
    } else {
        let passColor = '';
        let passDiffDate = getDateDifferent(date);
        if (date > getCurrentDate()) {
            if (passDiffDate <= 180) {
                passColor = 'has-text-brown';
            }
            if (passDiffDate <=  30) {
                passColor = 'has-text-danger';
            }
            if (passDiffDate > 180) {
                passColor = '';
            }
        } else {
            passColor = 'has-text-danger';
        }
        return passColor;
    }
}