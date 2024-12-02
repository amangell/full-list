exports.up = function(knex) {
    return knex.schema.createTable('todos', (table) => {
      table.increments('id').primary(); // Auto-incremented ID for each task
      table.string('task').notNullable(); // The task description
      table.boolean('completed').defaultTo(false); // Mark as completed or not
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of when task is created
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('todos');
  };
  
