var Users = require('../models/users');
var Student = require('../models/student');
var Universitydetails = require('../models/universitydetails');
var Promise = require("bluebird");


exports.postUsers = function (req, res) {
    var users = new Users({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        father_name: req.body.father_name,
        user_id: req.body.user_id,
        created_at: new Date(),
    });

    users.save(function (err, response) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({
                success: true,
                body: response
            })
        }
    })
}


exports.postStudent = function (req, res) {
    var student = new Student({
        student_id: req.body.student_id,
        stream: req.body.stream,
        section: req.body.section,
        university_id: req.body.university_id,
        created_at: new Date()
    });

    student.save(function (err, response) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({
                success: true,
                body: response
            })
        }
    })
}
exports.postUniversitydetails = function (req, res) {
    var universitydetails = new Universitydetails({
        university_id: req.body.university_id,
        university: req.body.university,
        state: req.body.state,
        created_at: new Date(),

    });
    universitydetails.save(function (err, response) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({
                success: true,
                body: response
            })
        }
    })
}


exports.getUsers = function (req, res) {
    Users.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}

exports.getStudent = function (req, res) {
    Student.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}

//Use of promise to get the data in an array
exports.getAlldetails = function (req, res) {
    var name = req.params.name;
    Users.find({ name: name }).exec()
        .then(function (user) {
            var detailsarray = [];
            return Student.find({}).exec()
                .then(function (student) {

                    return Universitydetails.find({}).exec()
                        .then(function (universitydetails) {

                            var test1 = universitydetails.map(function (university) {
                                //for (let university of universitydetails) { 
                                var test2 = user.map(function (list) {
                                    //   for (let list of user) {
                                    var test3 = student.map(function (details) {
                                        // for (let details of student) {
                                        if (details.student_id == list.user_id) {
                                            if (details.university_id == university.university_id) {

                                                let array = {};

                                                array.name = list.name;
                                                array.father_name = list.father_name;
                                                array.email = list.email;
                                                array.address = list.address;
                                                array.phone_number = list.phone_number;
                                                array.student_id = details.student_id;
                                                array.stream = details.stream;
                                                array.section = details.section;
                                                array.universityName = university.university;
                                                array.university_state = university.state;
                                                detailsarray.push(array);
                                            }
                                        }
                                        return details;
                                    });
                                    return list;
                                });
                                return university;
                            });
                            return res.json(detailsarray);
                        })

                })
        })
}


//Use of promise to get the data in an array
exports.promiseuse = function (req, res) {
    var stream = req.params.stream;
    console.log("should be stream" + stream);
    Student.find({ stream: stream }).exec()
        .then(function (student) {
            console.log(student);
            var userarray = [];
            return Users.find({}).exec()
                .then(function (user) {
                    console.log(user);
                    for (let list of user) {
                        for (let details of student) {
                            if (details.student_id == list.user_id) {
                                userarray.push(list.name);
                                console.log(userarray);

                            }

                        }
                    }
                    return res.json(userarray);
                })
        })
}


//get the deatils of universities on search
exports.regexsearch = function (req, res) {
    var reg = req.params.reg;
    regexp = new RegExp(reg);
    Universitydetails.find({ university: regexp }).exec()
        .then(function (universitydetails) {
            var namesarray = [];
            return Student.find({}).exec()
                .then(function (student) {
                    return Users.find({}).exec()
                        .then(function (users) {


                            var label1 = universitydetails.map(function (university) {
                                var label2 = users.map(function (list) {
                                    var label3 = student.map(function (details) {
                                        if (details.university_id == university.university_id) {
                                            console.log(details);
                                            if (details.student_id == list.user_id) {
                                                let array1 = {};
                                                array1.name = list.name;
                                                namesarray.push(array1);
                                            }
                                        }

                                        return details;

                                    });

                                    return list;
                                });
                                return university;

                            });
                            return res.json(namesarray);

                        })
                })
        })
}



