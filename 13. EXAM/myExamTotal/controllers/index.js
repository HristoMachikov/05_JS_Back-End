module.exports = {
    handleErrors: (err, res, cubeBody) => {
        let errorsArr = [];
        for (const prop in err.errors) {
            errorsArr.push(err.errors[prop].message);
        }
        res.locals.globalErrors = errorsArr;
    },
    handleError: (err, res) => {
        res.locals.globalError = err;
    },
    options: (elem) => {
        return [
            { index: 1, val: 'default', title: 'Select category...', selected: this.val === elem.category },
            { index: 2, val: 'advertising', title: 'Advertising', selected: "advertising" === elem.category },
            { index: 3, val: 'benefits', title: 'Benefits', selected: "benefits" === elem.category },
            { index: 4, val: 'car', title: 'Car', selected: 'car' === elem.category },
            { index: 5, val: 'equipment', title: 'Equipment', selected: 'equipment' === elem.category },
            { index: 6, val: 'fees', title: 'Fees', selected: 'fees' === elem.category },
            { index: 7, val: 'home-office', title: 'Home Office', selected: 'home-office' === elem.category },
            { index: 8, val: 'insurance', title: 'Insurance', selected: 'insurance' === elem.category },
            { index: 9, val: 'interest', title: 'Interest', selected: 'interest' === elem.category },
            { index: 10, val: 'Labor', title: 'Labor', selected: 'Labor' === elem.category },
            { index: 11, val: 'maintenance', title: 'Maintenance', selected: 'maintenance' === elem.category },
            { index: 12, val: 'materials', title: 'Materials', selected: 'materials' === elem.category },
            { index: 13, val: 'meals-and-entertainment', title: 'Meals and Entertainment', selected: 'office-supplies' === elem.category },
            { index: 14, val: 'office-supplies', title: 'Office Supplies', selected: 'office-supplies' === elem.category },
            { index: 15, val: 'other', title: 'Other', selected: 'other' === elem.category },
            { index: 16, val: 'professional-services', title: 'Professional Services', selected: 'professional-services' === elem.category },
            { index: 17, val: 'rent', title: 'Rent', selected: 'rent' === elem.category },
            { index: 18, val: 'taxes', title: 'Taxes', selected: 'taxes' === elem.category },
            { index: 19, val: 'travel', title: 'Travel', selected: 'travel' === elem.category },
            { index: 20, val: 'utilities', title: 'Utilities', selected: 'utilities' === elem.category }
        ]
    },
    dateToString: (date) => {
        return date.toDateString() + ', ' + date.toLocaleTimeString();
    }
};