'use strict';

angular.module('feedbacks')

    //Patients service used for communicating with the patients REST endpoints

    .factory('Feedbacks', ['$resource',
        function($resource) {
            return $resource('api/feedbacks/:feedbackId', {
                feedbackId: '@_id'
            }, {
                    update: {
                        method: 'PUT'
                    }
                });
        }
    ])
