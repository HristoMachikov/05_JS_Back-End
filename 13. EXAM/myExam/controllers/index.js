
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
    // options: (elem) => {
    //     return [
    //         { index: 1, value: 'default', title="Select category...", selected: 1 === elem.category },
    //         { index: 1, value: 'advertising', title="", selected: 1 === elem.category },
    //         { index: 2, value: 'benefits', title="", selected: 2 === elem.category },
    //         { index: 3, value: 'car', title="", selected: 3 === elem.category },
    //         { index: 4, value: 'equipment', title="", selected: 4 === elem.category },
    //         { index: 5, value: 'fees', title="", selected: 5 === elem.category },
    //         { index: 7, value: 'home-office', title="", selected: 6 === elem.category },
    //         { index: 8, value: 'insurance', title="", selected: 7 === elem.category },
    //         { index: 9, value: 'Labor', title="", selected: 8 === elem.category },
    //         { index: 10, value: 'maintenance', title="", selected: 9 === elem.category },
    //         { index: 11, value: 'materials', title="", selected: 10 === elem.category },
    //         { index: 12, value: 'meals-and-entertainment', title="", selected: 11 === elem.category },
    //         { index: 13, value: 'office-supplies', title="", selected: 12 === elem.category },
    //         { index: 14, value: 'other', title="", selected: 13 === elem.category },
    //         { index: 15, value: 'professional-services', title="", selected: 14 === elem.category },
    //         { index: 16, value: 'rent', title="", selected: 15 === elem.category },
    //         { index: 17, value: 'taxes', title="", selected: 16 === elem.category },
    //         { index: 18, value: 'travel', title="", selected: 17 === elem.category },
    //         { index: 19, value: 'utilities', title="", selected: 18 === elem.category }
    //     ]
    // }
};
