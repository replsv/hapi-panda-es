'use strict';

const Joi = require('@hapi/joi');
const PandaEs = require('panda-es-orm');

// define a log tag
const LogTag = 'PandaEsORM';

// define validation schemas for loggers
const esConnectionSchema = Joi.object({
    host: Joi.any().default('http://localhost:9200/').required()
}).unknown();
const loggerSchema = Joi.object({
    level: Joi.number().default(10).required()
}).strict();

module.exports = {

    /**
     * Register method.
     * @param server
     * @param options
     * @returns {Promise.<void>}
     */
    async register (server, options) {

        // Reference: https://github.com/replsv/panda-es-orm#configuration
        options.elasticsearch = await esConnectionSchema.validate(options.elasticsearch);
        options.logger = await loggerSchema.validate(options.logger);

        const connect = async (params) => {

            const exposed = new PandaEs.orm(params);

            await exposed.connect();

            server.decorate('server', 'pandaEs', PandaEs); // expose the entire plugin
            server.decorate('server', 'pandaEsOrm', exposed); // expose only the ORM instance

            server.log([LogTag, 'info'], 'ES connection created | ' + JSON.stringify(exposed.options));
        };

        server.events.on('stop', () => {

            server.log([LogTag, 'info'], 'Server stopped');
        });

        await connect(options);
    },

    /**
     * Export package.
     */
    pkg: require('../../package.json')
};
