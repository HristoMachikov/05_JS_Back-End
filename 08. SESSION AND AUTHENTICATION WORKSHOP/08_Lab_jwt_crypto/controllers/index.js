
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
    }, difficultyLevels:
        [
            { level: 1, levelName: "Very Easy" },
            { level: 2, levelName: "Easy" },
            { level: 3, levelName: "Medium (Standard 3x3)" },
            { level: 4, levelName: "Intermediate" },
            { level: 5, levelName: "Expert" },
            { level: 6, levelName: "Hardcore" }
        ],
    options: (elem) => {
        return [
            { index: 1, title: '1 - Very Easy', selected: 1 === elem.difficulty },
            { index: 2, title: '2 - Easy', selected: 2 === elem.difficulty },
            { index: 3, title: '3 - Medium (Standard 3x3)', selected: 3 === elem.difficulty },
            { index: 4, title: '4 - Intermediate', selected: 4 === elem.difficulty },
            { index: 5, title: '5 - Expert', selected: 5 === elem.difficulty },
            { index: 6, title: '6 - Hardcore', selected: 6 === elem.difficulty }
        ]
    }
    // },
    // difficultyLevels: (res) => {
    //     let difficultyLevelsArr = [
    //         { level: 1, levelName: "Very Easy" },
    //         { level: 2, levelName: "Easy" },
    //         { level: 3, levelName: "Medium (Standard 3x3)" },
    //         { level: 4, levelName: "Intermediate" },
    //         { level: 5, levelName: "Expert" },
    //         { level: 6, levelName: "Hardcore" }
    //     ];
    //     res.locals.difficultyLevels = difficultyLevelsArr;
    // }
};
