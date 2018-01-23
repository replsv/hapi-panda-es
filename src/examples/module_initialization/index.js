'use strict';

const collection = [
    require('./event'),
];

module.exports = async (server) => {

    const pandaEs = server.pandaEs;
    const models = {};

    // loop over models and initialize them
    collection.forEach((modelOptions) => {

        // attach model over the ORM instance
        models[modelOptions.name] = new pandaEs.model(
            modelOptions.name,
            modelOptions.index,
            modelOptions.type,
            modelOptions.idKey,
            modelOptions.validation
        );

        // attach listeners
        if (modelOptions.listeners) {
            Object.keys(modelOptions.listeners).forEach((evtId) => {

                const evtName = modelOptions.name.toLowerCase() + '_' + evtId;
                models[modelOptions.name].on(evtName, modelOptions.listeners[evtId]);
            })
        }
    });

    server.expose('models', models);
};