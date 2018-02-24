//database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
     patName: {
        type: String,
        default: '',
        trim: true
    },
      feedbackHyegine: {
        type: String
    },
      feedbackAmbience: {
        type: String
    },
      feedbackExperience: {
        type: String
    },
     feedbackHandling: {
        type: String
    },
     feedbackManners: {
        type: String
    },
     feedbackCommunication: {
        type: String
    },
});

mongoose.model('Feedback', FeedbackSchema);
