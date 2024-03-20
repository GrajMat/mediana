const expenses = {
    "2023-01": {
        "01": {
            "food": [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
            "fuel": [210.22]
        },
        "09": {
            "food": [11.9],
            "fuel": [190.22]
        }
    },
    "2023-03": {
        "07": {
            "food": [20, 11.9, 30.20, 11.9]
        },
        "04": {
            "food": [10.20, 11.50, 2.5],
            "fuel": []
        }
    },
    "2023-04": {}
}


const get_median_of_first_week_expenses = (expenses) => {

    const categories = []
    const expenses_to_first_sunday = []

    const get_first_sun_in_month = (y, m) => {
        const first_day_of_month = new Date(y, m - 1, 1)
        const first_day_of_week = first_day_of_month.getDay()
        const first_sunday_index = 7 - first_day_of_week

        if (first_day_of_week === 0) {
            return 0 + 1
        } else {
            return first_sunday_index + 1;
        }
    }


    const do_calculate = (month, day) => {
        const y = Number(month.slice(0, 4))
        const m = Number(month.slice(5))
        const d = Number(day)
        const date = new Date(y, m - 1, d)
        const first_sun_number = get_first_sun_in_month(y, m)
        if (date.getDate() <= first_sun_number) {
            return true

        } else {
            return false
        }
    }


    const median = (sorted_array) => {
        const length = sorted_array.length;

        if (length % 2 !== 0) {
            return sorted_array[Math.floor(length / 2)];
        }
        else {
            const mid_ndex = length / 2;
            return (sorted_array[mid_ndex - 1] + sorted_array[mid_ndex]) / 2;
        }
    }


    const get_categories = () => {
        for (let month in expenses) {
            for (let day in expenses[month]) {
                if (do_calculate(month, day)) {
                    for (let category in expenses[month][day]) {
                        if (!categories.includes(category)) categories.push(category)
                    }
                }
            }
        }
    }
    get_categories()


    for (let month in expenses) {
        for (let day in expenses[month]) {
            if (do_calculate(month, day)) {
                for (let i = 0; i < categories.length; i++) {
                    const expenses_in_category = expenses[month][day][categories[i]];
                    if (expenses_in_category) {
                        for (let i = 0; i < expenses_in_category.length; i++) {
                            expenses_to_first_sunday.push(expenses_in_category[i]);
                        }
                    }
                }
            }
        }
    }

    expenses_to_first_sunday.sort((a, b) => a - b);
    // console.log(expenses_to_first_sunday);
    const median_value = median(expenses_to_first_sunday);
    return median_value
}
console.log(get_median_of_first_week_expenses(expenses))