const db = require('./db-config');

module.exports = {
    get,
    getTasks,
    getResources
}

function get() {
    return db('projects');
}

function getTasks(project_id) {
    return db('tasks')
        .where({ projects_id: project_id })
        .join('projects', 'tasks.projects_id', 'projects.id')
        .select('projects.name AS Project',
            'projects.description AS ProjectDescription',
            'tasks.notes AS Task',
            'tasks.description AS TaskDescription',
            'tasks.completed AS Completed')
}

function getResources(project_id) {
    return db('projects_resources')
        .where({ projects_id: project_id })
        .join('resources', 'projects_resources.resources_id', 'resources.id')
        .select('resources.name', 'resources.description');
}

function add(projectData) {
    return db('projects')
    .insert(projectData, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id)
    })
}
