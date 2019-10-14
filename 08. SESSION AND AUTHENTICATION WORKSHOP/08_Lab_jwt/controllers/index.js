
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
        ]
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
