exports.up = async function(knex) {
    await knex.schema.alterTable('coupons', (table) => {
        table.boolean('is_loyalty_reward').defaultTo(false).after('times_used');
    });
}

exports.down = async function(knex) {
    await knex.schema.alterTable('coupons', (table) => {
        table.dropColumn('is_loyalty_reward');
    });
}
