// fetching and manipulating the general data (cases and hospitalisations)
async function fetchGenData() {
    const res = await fetch ("https://api.sledilnik.org/api/summary");
    const record = await res.json();

    // fetching the dates
    let dayTest     = record.testsToday.day;
    let dayHosp     = record.hospitalizedCurrent.day;
    let month       = record.testsToday.month;
    let year        = record.testsToday.year;

    // putting some html into variables
    let smallTotal      =   '<small class="total">skupaj</small>';
    let smallPositive   =   '<small class="positive">pozitivni</small>';
    let smallToday      =   '<small class="daily">na dan</small>';
    let smallIncr       =   '<small class="total">razlika</small>';

    let noData          =   '<span class="no-data">ni podatka</span>'

    // looping through the months to have a correct month name
    let monthName;
    switch (month) {
        case 1:
            monthName = 'januar'
            break;
        case 2:
            monthName = 'februar'
            break;
        case 3:
            monthName = 'marec'
            break;
        case 4:
            monthName = 'april'
            break;
        case 5:
            monthName = 'maj'
            break;
        case 6:
            monthName = 'junij'
            break;
        case 7:
            monthName = 'julij'
            break;
        case 8:
            monthName = 'avgust'
            break;
        case 9:
            monthName = 'september'
            break;
        case 10:
            monthName = 'oktober'
            break;
        case 11:
            monthName = 'november'
            break;
        case 12:
            monthName = 'december'
            break;
        default:
            dayName = month;
    }

    // date of the data for tab1 and tab3 (cases and hospitalisations)
    document.getElementById('date1').innerHTML              = dayTest   + '. ' + monthName + ' ' + year;
    document.getElementById('date3').innerHTML              = dayHosp   + '. ' + monthName + ' ' + year;

    // tests and active cases
    if (record.testsTodayHAT.subValues.positive > 0) {
        document.getElementById('tests-hat-positive').innerHTML = smallPositive     +  record.testsTodayHAT.subValues.positive.toLocaleString('sl-SI');
        document.getElementById('tests-pcr-positive').innerHTML = smallPositive     +  record.testsToday.subValues.positive.toLocaleString('sl-SI');
    } else {
        document.getElementById('tests-hat-positive').innerHTML = smallPositive     +  noData;
        document.getElementById('tests-pcr-positive').innerHTML = smallPositive     +  noData
    }

    document.getElementById('tests-hat-total').innerHTML    = smallTotal        + record.testsTodayHAT.value.toLocaleString('sl-SI');
    document.getElementById('tests-pcr-total').innerHTML    = smallTotal        + record.testsToday.value.toLocaleString('sl-SI');
    document.getElementById('7day-perc-positive').innerHTML = smallPositive     + record.casesAvg7Days.value.toLocaleString('sl-SI', {maximumFractionDigits: 1});

    // checking whether the 7 day average percentage has increased or decreased
    if (record.casesAvg7Days.diffPercentage > 0) {
        document.getElementById('7day-perc-incr').innerHTML = smallIncr         + '<span style="color: #bc0000;">' + record.casesAvg7Days.diffPercentage.toLocaleString('sl-SI', {maximumFractionDigits: 1}) + ' %' + '</span>';
    } else if (record.casesAvg7Days.diffPercentage < 0) {
        document.getElementById('7day-perc-incr').innerHTML = smallIncr         + '<span style="color: #20c01a;">' + record.casesAvg7Days.diffPercentage.toLocaleString('sl-SI', {maximumFractionDigits: 1}) + ' %' + '</span>';
    } else {
        document.getElementById('7day-perc-incr').innerHTML = smallIncr         + '<span style="color: #ffffff;">' + record.casesAvg7Days.diffPercentage.toLocaleString('sl-SI', {maximumFractionDigits: 1}) + ' %' + '</span>';
    }

    // hospitalisations and deaths
    document.getElementById('hospitalised-day').innerHTML   = smallToday    + record.hospitalizedCurrent.subValues.in.toLocaleString('sl-SI');
    document.getElementById('hospitalised-total').innerHTML = smallTotal    + record.hospitalizedCurrent.value.toLocaleString('sl-SI');
    document.getElementById('in-icu-day').innerHTML         = smallToday    + record.icuCurrent.subValues.in.toLocaleString('sl-SI');
    document.getElementById('in-icu-total').innerHTML       = smallTotal    + record.icuCurrent.value.toLocaleString('sl-SI');
    document.getElementById('deaths-day').innerHTML         = smallToday    + record.deceasedToDate.subValues.deceased.toLocaleString('sl-SI');
    document.getElementById('deaths-total').innerHTML       = smallTotal    + record.deceasedToDate.value.toLocaleString('sl-SI');
}
fetchGenData();

// fetching and manipulating the vaccination data
async function fetchVaxData() {
    const res = await fetch ("https://api.sledilnik.org/api/vaccinations");
    const record = await res.json();

    let secondToLast = record[record.length - 2];

    let dayVax = secondToLast.day;
    let monthVax = secondToLast.month;
    let yearVax = secondToLast.year;
    let smallDaily = '<small class="daily">na dan</small>';
    let smallTotal = '<small class="total">skupaj</small>';
    let administeredTotalToday = secondToLast.administered.today + secondToLast.administered2nd.today + secondToLast.administered3rd.today;

    // looping through the months to have a correct month name
    let monthVaxName;
    switch (monthVax) {
        case 1:
            monthVaxName = 'januar'
            break;
        case 2:
            monthVaxName = 'februar'
            break;
        case 3:
            monthVaxName = 'marec'
            break;
        case 4:
            monthVaxName = 'april'
            break;
        case 5:
            monthVaxName = 'maj'
            break;
        case 6:
            monthVaxName = 'junij'
            break;
        case 7:
            monthVaxName = 'julij'
            break;
        case 8:
            monthVaxName = 'avgust'
            break;
        case 9:
            monthVaxName = 'september'
            break;
        case 10:
            monthVaxName = 'oktober'
            break;
        case 11:
            monthVaxName = 'november'
            break;
        case 12:
            monthVaxName = 'december'
            break;
        default:
            monthVaxName = '';
    }

    // date of the data for tab2 (vaccinations)
    document.getElementById('date2').innerHTML = dayVax    + '. ' + monthVaxName + ' ' + yearVax;

    document.getElementById('1st-vax-day-administered').innerHTML   = smallDaily + secondToLast.administered.today.toLocaleString('sl-SI');
    document.getElementById('1st-vax-total-administered').innerHTML = smallTotal + secondToLast.administered.toDate.toLocaleString('sl-SI');

    document.getElementById('2nd-vax-day-administered').innerHTML   = smallDaily + secondToLast.administered2nd.today.toLocaleString('sl-SI');
    document.getElementById('2nd-vax-total-administered').innerHTML = smallTotal + secondToLast.administered2nd.toDate.toLocaleString('sl-SI');

    document.getElementById('3rd-vax-day-administered').innerHTML   = smallDaily + secondToLast.administered3rd.today.toLocaleString('sl-SI');
    document.getElementById('3rd-vax-total-administered').innerHTML = smallTotal + secondToLast.administered3rd.toDate.toLocaleString('sl-SI');

    document.getElementById('used-doses-day').innerHTML             = smallDaily + administeredTotalToday.toLocaleString('sl-SI');
    document.getElementById('used-doses-to-date').innerHTML         = smallTotal + secondToLast.usedToDate.toLocaleString('sl-SI');
}
fetchVaxData();
