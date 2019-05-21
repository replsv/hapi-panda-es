'use strict';

const Joi = require('@hapi/joi');

// define some constants
const statusEventNew = 1,
    statusEventOld = 2,
    anonymousCustomerGroupId = 0;

// define validation
const schemaValidation = Joi
    .object()
    .label('EventValidation')
    .keys({
        id: Joi.string(),
        productId: Joi.number().required(),
        status: Joi.number().integer().valid(statusEventNew, statusEventOld).default(statusEventNew).required(),
        type: Joi.string().required(),
        customerId: Joi.string().required(),
        customerGroupId: Joi.number().integer().default(anonymousCustomerGroupId).required(),
        createdAt: Joi.date().timestamp()
    });

// export model configuration
module.exports = {
    name: 'EventModel',
    index: 'events',
    idKey: 'id',
    validation: schemaValidation,
    listeners: {
        before_validate: (evtData) => {

            if (!evtData.body.createdAt) {
                evtData.body.createdAt = Date.now();
            }

            if (!evtData.body.status) {
                evtData.body.status = statusEventNew;
            }
        }
    }
};