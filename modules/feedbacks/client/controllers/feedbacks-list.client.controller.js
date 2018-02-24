'use strict';

var feedbacksApp = angular.module('feedbacks');

feedbacksApp.controller('FeedbacksController', ['$scope', 'Feedbacks',
    function($scope, Feedbacks) {

        $scope.feedbackList = [];
        $scope.feedback = [];
        $scope.disabled = false;

        var refresh = function() {
            $scope.feedbackList = Feedbacks.query();
            $scope.feedback = [];
            $scope.disabled = false;
        };

        refresh();

        // Create new Appt Type
        $scope.addFeedback = function() {

            // Create new Appt Type object
            var feedback = new Feedbacks({
                 patName: $scope.feedback.patName,
                feedbackHyegine: $scope.feedback.feedbackHyegine,
                feedbackAmbience: $scope.feedback.feedbackAmbience,
                feedbackExperience: $scope.feedback.feedbackExperience,
                 feedbackHandling: $scope.feedback.feedbackHandling,
                  feedbackManners: $scope.feedback.feedbackManners,
                   feedbackCommunication: $scope.feedback.feedbackCommunication,
               

            });
 console.log(feedback);
            // Redirect after save
            feedback.$save(function(response) {

                // Clear form fields
                $scope.feedback.patNmae = '';
                $scope.feedback.feedbackHyegine = '';
                $scope.feedback.feedbackAmbience = '';
                $scope.feedback.feedbackExperience = '';
                $scope.feedback.feedbackExHandling = '';
                $scope.feedback.feedbackManners = '';
                $scope.feedback.feedbackCommunication = '';

                refresh();

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing procedure
        $scope.remove = function(feedback) {
            if (confirm('Are you sure you want to delete this feedback?')) {
                if (feedback) {

                    feedback.$remove();

                    for (var i in this.feedbackList) {
                        if (this.feedbackList[i] === feedback) {
                            this.feedbackList.splice(i, 1);
                        }
                    }
                } else {
                    this.feedback.$remove(function() {

                    });
                }
            }
        };

        // Update existing Personal
        $scope.update = function(updtfeedback) {

            var feedback = updtfeedback;

            feedback.$update(function() {
                refresh();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
                console.log(errorResponse.data.message);
            });
        };

        $scope.edit = function(feedback) {

            for (var i in this.feedbackList) {
                if (this.feedbackList[i] === feedback) {
                    $scope.feedback = feedback;
                }
            }

            $scope.disabled = true;
        };

        $scope.deselect = function() {
            $scope.feedback = [];
            $scope.disabled = false;
        };

    }
]);