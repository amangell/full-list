exports.seed = function (knex) {
  return knex('users')
    .del() // Clear existing data
    .then(() => {
      return knex('users').insert([
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
      ]);
    });
};

