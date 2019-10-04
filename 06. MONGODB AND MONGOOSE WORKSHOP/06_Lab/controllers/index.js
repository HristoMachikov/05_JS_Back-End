module.exports = (err, res, cubeBody) => {
    let errorsArr = [];
    for (const prop in err.errors) {
        errorsArr.push(err.errors[prop].message);
    }
    res.locals.globalErrors = errorsArr;
};
