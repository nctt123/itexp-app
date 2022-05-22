import moment from "moment";


export const formatDate = (dateString) => {
    return moment(dateString).format('YYYY/MM/DD');
};



export const getYears = () => {
    const end = new Date().getFullYear();
    const range = 42;
    const begin = end - range;

    var years = [];
    for (let i = end; i > begin; i--) {
        years.push({
            label: `${i}`,
            value: i
        })
    }
    return years;
};

export const getMonths = () => {

    var months = [];
    for (let i = 1; i < 13; i++) {
        months.push({
            label: `${i < 10 ? '0' : ''}${i}`,
            value: i
        });
    }
    return months;
};

export const getDays = (year, month) => {
    const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();

    var days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            label: `${i < 10 ? '0' : ''}${i}`,
            value: i
        });
    }
    return days;
};
