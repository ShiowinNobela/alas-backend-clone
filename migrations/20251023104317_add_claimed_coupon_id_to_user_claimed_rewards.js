exports.up = async function(knex) {
    await knex.schema.alterTable('user_claimed_rewards', (table) => {
        table
            .integer('claimed_coupon_id')
            .notNullable()
            .after('reward_id')
            .comment('Stores the coupon the user received at the time of claiming the reward');
    });
}

exports.down = async function(knex) {
    await knex.schema.alterTable('user_claimed_rewards', (table) => {
        table.dropColumn('claimed_coupon_id');
    });
}
