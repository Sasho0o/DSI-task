const { check } = require("express-validator");

exports.validateEmployee = [
    check('firstname', 'Firstname must be more than 3 and less than 15 characters long')
        .exists()
        .isLength({ min: 3 ,max: 15 })
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
    check('lastname', 'Lastname must be more than 3 and less than 15 characters long')
        .exists()
        .isLength({ min: 3, max: 15 })
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
    check('phone', 'Phone number must be more than 9 and less than 15 numbers long')
        .exists()
        .isLength({ min: 10, max: 14 })
        .isNumeric(),
    check('address', 'Address must be more than 4 and less than 60 numbers long')
        .exists()
        .isLength({ min: 4, max: 60 }),
    check('department', 'Department must be selected')
        .exists(),
    check('position', 'Position must be selected')
        .exists(),
    check('salary', 'Salary must be a number')
        .exists()
        .matches(/^[0-9]*$/),
  ];

