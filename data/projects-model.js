const db = require('./db-config');

module.exports = {
    get,
    getTasks,
    getResources,
    add,
    getProjectById,
    addTask,
    addResource
}

function get() {
    return db('projects');
}

function getProjectById(project_id) {
    return db('projects')
    .where({ id: project_id })
    .first();
}

function getTaskById(task_id) {
    return db('tasks')
    .where({ id: task_id })
    .first();
}

function getResourceById(resource_id) {
    return db('resources')
    .where({ id: resource_id })
    .first();
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
        return getProjectById(id)
    })
}

function addTask(taskData) {
    return db('tasks')
    .insert(taskData)
    .then(ids => {
        const [id] = ids;
        return getTaskById(id)
    })
}

function addResource(resourceData) {
    return db('resources')
    .insert(resourceData)
    .then(ids => {
        const [id] = ids;
        return getResourceById(id)
    })
}
