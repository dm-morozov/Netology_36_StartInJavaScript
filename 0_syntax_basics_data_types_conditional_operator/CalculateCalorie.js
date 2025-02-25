const calcSummaryRate = function (dailyRation) {

    /*
     * Необходимо посчитать сумму всех потреблённых калорий за день,
     * используя данные пользователя - калории, потреблённые на завтрак,
     * обед, ужин, полдник, перекус. Причём мы не можем гарантировать, что
     * все пользователи нашего приложения производят приём пищи абсолютно
     * одинаково. Кто-то может обедать и ужинать, но не завтракать.
     * А кто-то может завтракать, осуществлять перекусы, обедать,
     * но не ужинать. А кто-то вообще по-другому выстраивает график
     * приёма пищи на день для себя.
     * 
     * Результат подсчёта суммы необходимо присвоить в этот же объект свойству
     * summary.
     */

    let summary = 0;

    for (const key in dailyRation) {
        if (typeof dailyRation[key] === 'number') {
            summary += dailyRation[key];
        }
    }

    dailyRation.summary = summary;
    return dailyRation;
  };


let mondayRation = {
    breakfast: 1240,
    lunch: 765,
    dinner: 564,
};

mondayRation = calcSummaryRate(mondayRation);

console.log(mondayRation.summary);

const tuesdayRation = {
    breakfast: 780,
    "coffee-break": 115,
    lunch: 975,
    "afternoon-tea": 230,
    dinner: 441,
    summary: 0,
};

calcSummaryRate(tuesdayRation);

console.log(tuesdayRation.summary);