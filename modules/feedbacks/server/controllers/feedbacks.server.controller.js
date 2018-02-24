'use strict';

/**
 * Module dependencies.
 */
var  path = require('path'),
    mongoose = require('mongoose'),
    Feedback = mongoose.model('Feedback'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
/**
 * Create a patient
 */
exports.create = function(req, res) {
    var feedback = new Feedback(req.body);
    feedback.user = req.user

    feedback.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(feedback);
            console.log("Success");
        }
    });
};

/**
 * Show the current patient
 */
exports.read = function(req, res) {
    res.json(req.feedback);
};

/**
 * Update a patient
 */
exports.update = function(req, res) {
    var feedback = req.feedback;

   feedback.patName = req.body.patName;
    feedback.feedbackHyegine = req.body.feedbackHyegine;
    feedback.feedbackAmbience = req.body.feedbackAmbience;
    feedback.feedbackExperience = req.body.feedbackExperience;
    feedback.feedbackHandling = req.body.feedbackHandling;
    feedback.feedbackManners = req.body.feedbackManners;
    feedback.feedbackCommunication = req.body.feedbackCommunication;
    
    feedback.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(feedback);
        }
    });
};

/**
 * Delete an patient
 */
exports.delete = function(req, res) {
    var feedback = req.feedback;

    feedback.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(feedback);
        }
    });
};

/**
 * List of Patients
 */
exports.list = function(req, res) {
    Feedback.find().sort('-created').populate('user', 'displayName').exec(function(err, feedbacks) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
           res.json(feedbacks);
        }
    });
};

/**
 * Patient middleware
 */
exports.feedbackByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Feedback is invalid'
        });
    }

    Feedback.findById(id).populate('user', 'displayName').exec(function(err, feedback) {
        if (err) {
            return next(err);
        } else if (!feedback) {
            return res.status(404).send({
                message: 'No Feedback with that identifier has been found'
            });
        }
        req.feedback = feedback;
        next();
    });
};
