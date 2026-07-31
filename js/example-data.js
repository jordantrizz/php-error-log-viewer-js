/**
 * example-data.js — Built-in sample PHP error log
 *
 * 500 lines of realistic WordPress/PHP error log content (including stack
 * traces), with intentional duplicates so the similarity grouping has
 * something to work with. Used by the "Example" input tab.
 *
 * @module example-data
 */

/** 500-line sample PHP error log (lines joined with newlines) */
export const EXAMPLE_LOG = `[20-Jul-2026 08:03:10 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 08:05:47 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 08:08:59 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 08:09:46 UTC] PHP Deprecated:  str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated in /var/www/myprotei/public_html/wp-includes/class-wp-hook.php on line 252
[20-Jul-2026 08:13:30 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 08:14:10 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 08:16:07 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 08:17:52 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 08:20:44 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 08:24:17 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 08:28:08 UTC] PHP Fatal error:  Allowed memory size of 268435456 bytes exhausted (tried to allocate 20480 bytes) in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/class-wc-session-handler.php on line 311
[20-Jul-2026 08:31:27 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 08:33:26 UTC] WordPress database error Duplicate entry '1042' for key 'PRIMARY' for query INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('cron', 'a:0:{}', 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value), autoload = VALUES(autoload) made by wp_ajax_heartbeat
[20-Jul-2026 08:36:51 UTC] PHP Fatal error:  Allowed memory size of 268435456 bytes exhausted (tried to allocate 20480 bytes) in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/class-wc-session-handler.php on line 311
[20-Jul-2026 08:39:12 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 08:40:51 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 08:42:33 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 08:43:11 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 08:46:18 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 08:47:12 UTC] PHP Parse error:  syntax error, unexpected token "}" in /var/www/myprotei/public_html/wp-content/themes/myprotei/inc/customizer.php on line 42
[20-Jul-2026 08:49:11 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 08:51:17 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 08:53:14 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 08:56:37 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 08:58:42 UTC] WordPress database error Duplicate entry '1042' for key 'PRIMARY' for query INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('cron', 'a:0:{}', 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value), autoload = VALUES(autoload) made by wp_ajax_heartbeat
[20-Jul-2026 09:01:39 UTC] PHP Fatal error:  Allowed memory size of 268435456 bytes exhausted (tried to allocate 20480 bytes) in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/class-wc-session-handler.php on line 311
[20-Jul-2026 09:03:37 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 09:06:04 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:09:30 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 09:11:23 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 09:14:51 UTC] PHP Warning:  file_get_contents(https://api.example.com/v2/stats?key=abc123): failed to open stream: Connection timed out in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync-client.php on line 289
[20-Jul-2026 09:16:28 UTC] PHP Warning:  file_get_contents(https://api.example.com/v2/stats?key=abc123): failed to open stream: Connection timed out in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync-client.php on line 289
[20-Jul-2026 09:17:05 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 09:18:47 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 09:22:30 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:23:54 UTC] PHP Deprecated:  str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated in /var/www/myprotei/public_html/wp-includes/class-wp-hook.php on line 252
[20-Jul-2026 09:24:26 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:26:48 UTC] PHP Warning:  file_get_contents(https://api.example.com/v2/stats?key=abc123): failed to open stream: Connection timed out in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync-client.php on line 289
[20-Jul-2026 09:28:13 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 09:28:52 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:29:16 UTC] PHP Fatal error:  Allowed memory size of 268435456 bytes exhausted (tried to allocate 20480 bytes) in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/class-wc-session-handler.php on line 311
[20-Jul-2026 09:30:17 UTC] PHP Warning:  mysqli_query(): MySQL server has gone away in /var/www/myprotei/public_html/wp-includes/wp-db.php on line 2142
[20-Jul-2026 09:30:45 UTC] PHP Parse error:  syntax error, unexpected token "}" in /var/www/myprotei/public_html/wp-content/themes/myprotei/inc/customizer.php on line 42
[20-Jul-2026 09:33:47 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:35:08 UTC] PHP Warning:  file_get_contents(https://api.example.com/v2/stats?key=abc123): failed to open stream: Connection timed out in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync-client.php on line 289
[20-Jul-2026 09:38:46 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:39:46 UTC] PHP Warning:  mysqli_query(): MySQL server has gone away in /var/www/myprotei/public_html/wp-includes/wp-db.php on line 2142
[20-Jul-2026 09:41:56 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 09:43:48 UTC] WordPress database error Duplicate entry '1042' for key 'PRIMARY' for query INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('cron', 'a:0:{}', 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value), autoload = VALUES(autoload) made by wp_ajax_heartbeat
[20-Jul-2026 09:44:46 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 09:47:10 UTC] PHP Warning:  mysqli_query(): MySQL server has gone away in /var/www/myprotei/public_html/wp-includes/wp-db.php on line 2142
[20-Jul-2026 09:48:00 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:50:07 UTC] PHP Warning:  file_get_contents(https://api.example.com/v2/stats?key=abc123): failed to open stream: Connection timed out in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync-client.php on line 289
[20-Jul-2026 09:50:40 UTC] PHP Fatal error:  Allowed memory size of 268435456 bytes exhausted (tried to allocate 20480 bytes) in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/class-wc-session-handler.php on line 311
[20-Jul-2026 09:54:01 UTC] PHP Warning:  file_get_contents(https://api.example.com/v2/stats?key=abc123): failed to open stream: Connection timed out in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync-client.php on line 289
[20-Jul-2026 09:55:18 UTC] PHP Deprecated:  str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated in /var/www/myprotei/public_html/wp-includes/class-wp-hook.php on line 252
[20-Jul-2026 09:55:52 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 09:56:24 UTC] PHP Deprecated:  str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated in /var/www/myprotei/public_html/wp-includes/class-wp-hook.php on line 252
[20-Jul-2026 09:59:48 UTC] PHP Parse error:  syntax error, unexpected token "}" in /var/www/myprotei/public_html/wp-content/themes/myprotei/inc/customizer.php on line 42
[20-Jul-2026 10:00:35 UTC] PHP Fatal error:  Allowed memory size of 268435456 bytes exhausted (tried to allocate 20480 bytes) in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/class-wc-session-handler.php on line 311
[20-Jul-2026 10:02:07 UTC] PHP Deprecated:  str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated in /var/www/myprotei/public_html/wp-includes/class-wp-hook.php on line 252
[20-Jul-2026 10:05:21 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 10:06:10 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 10:07:04 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 10:10:01 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 10:13:16 UTC] PHP Warning:  mysqli_query(): MySQL server has gone away in /var/www/myprotei/public_html/wp-includes/wp-db.php on line 2142
[20-Jul-2026 10:14:46 UTC] WordPress database error Duplicate entry '1042' for key 'PRIMARY' for query INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('cron', 'a:0:{}', 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value), autoload = VALUES(autoload) made by wp_ajax_heartbeat
[20-Jul-2026 10:15:37 UTC] PHP Fatal error:  Allowed memory size of 268435456 bytes exhausted (tried to allocate 20480 bytes) in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/class-wc-session-handler.php on line 311
[20-Jul-2026 10:16:55 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 10:19:11 UTC] PHP Parse error:  syntax error, unexpected token "}" in /var/www/myprotei/public_html/wp-content/themes/myprotei/inc/customizer.php on line 42
[20-Jul-2026 10:22:55 UTC] PHP Deprecated:  str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated in /var/www/myprotei/public_html/wp-includes/class-wp-hook.php on line 252
[20-Jul-2026 10:25:39 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 10:29:03 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 10:31:36 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 10:32:22 UTC] PHP Warning:  mysqli_query(): MySQL server has gone away in /var/www/myprotei/public_html/wp-includes/wp-db.php on line 2142
[20-Jul-2026 10:36:11 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 10:39:03 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 10:41:27 UTC] WordPress database error Duplicate entry '1042' for key 'PRIMARY' for query INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('cron', 'a:0:{}', 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value), autoload = VALUES(autoload) made by wp_ajax_heartbeat
[20-Jul-2026 10:44:18 UTC] PHP Warning:  file_get_contents(https://api.example.com/v2/stats?key=abc123): failed to open stream: Connection timed out in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync-client.php on line 289
[20-Jul-2026 10:46:37 UTC] PHP Warning:  mysqli_query(): MySQL server has gone away in /var/www/myprotei/public_html/wp-includes/wp-db.php on line 2142
[20-Jul-2026 10:47:23 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 10:50:30 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 10:53:05 UTC] WordPress database error Duplicate entry '1042' for key 'PRIMARY' for query INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('cron', 'a:0:{}', 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value), autoload = VALUES(autoload) made by wp_ajax_heartbeat
[20-Jul-2026 10:55:30 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 10:58:57 UTC] PHP Warning:  mysqli_query(): MySQL server has gone away in /var/www/myprotei/public_html/wp-includes/wp-db.php on line 2142
[20-Jul-2026 11:00:15 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 11:01:11 UTC] PHP Parse error:  syntax error, unexpected token "}" in /var/www/myprotei/public_html/wp-content/themes/myprotei/inc/customizer.php on line 42
[20-Jul-2026 11:03:57 UTC] PHP Parse error:  syntax error, unexpected token "}" in /var/www/myprotei/public_html/wp-content/themes/myprotei/inc/customizer.php on line 42
[20-Jul-2026 11:04:23 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 11:07:44 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 11:08:06 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 11:12:01 UTC] PHP Fatal error:  Uncaught Error: Call to undefined method MyProtei\Sync\Client::fetch_orders() in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php:45
Stack trace:
#0 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php(78): MyProtei\Sync\Sync->process_batch(Array)
#1 /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/myprotei-sync.php(132): MyProtei\Sync\Sync->run()
#2 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(324): MyProtei\Sync\Plugin->maybe_run_cron('')
#3 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(348): WP_Hook->apply_filters(NULL, Array)
#4 /var/www/myprotei/public_html/wp-includes/plugin.php(517): WP_Hook->do_action(Array)
#5 /var/www/myprotei/public_html/wp-cron.php(196): do_action_ref_array('myprotei_sync_cron', Array)
  thrown in /var/www/myprotei/public_html/wp-content/plugins/myprotei-sync/includes/class-sync.php on line 45
[20-Jul-2026 11:15:22 UTC] PHP Deprecated:  str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated in /var/www/myprotei/public_html/wp-includes/class-wp-hook.php on line 252
[20-Jul-2026 11:18:04 UTC] PHP Notice:  Trying to access array offset on value of type null in /var/www/myprotei/public_html/wp-content/themes/myprotei/functions.php on line 87
[20-Jul-2026 11:20:55 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 11:24:18 UTC] PHP Parse error:  syntax error, unexpected token "}" in /var/www/myprotei/public_html/wp-content/themes/myprotei/inc/customizer.php on line 42
[20-Jul-2026 11:27:38 UTC] WordPress database error Duplicate entry '1042' for key 'PRIMARY' for query INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('cron', 'a:0:{}', 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value), autoload = VALUES(autoload) made by wp_ajax_heartbeat
[20-Jul-2026 11:29:19 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149
[20-Jul-2026 11:31:50 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 11:35:02 UTC] WordPress database error Table 'myprotei1_OcAQ.wp_ea11y_page_scanned' doesn't exist for query SELECT * FROM wp_ea11y_page_scanned WHERE 1 ORDER BY created_at desc LIMIT 1000 made by wp_dashboard, EA11y\Modules\Scanner\Classes\Utils::get_scanner_stats
[20-Jul-2026 11:36:41 UTC] PHP Warning:  Undefined array key "user_id" in /var/www/myprotei/public_html/wp-content/plugins/woocommerce/includes/wc-user-functions.php on line 143
[20-Jul-2026 11:37:46 UTC] PHP Fatal error:  Uncaught TypeError: mysqli_get_server_info(): Argument #1 ($mysql) must be of type mysqli, null given in /var/www/myprotei/public_html/wp-includes/class-wpdb.php:4149
Stack trace:
#0 /var/www/myprotei/public_html/wp-includes/class-wpdb.php(4149): mysqli_get_server_info(NULL)
#1 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(462): wpdb->db_server_info()
#2 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/data-stores/ActionScheduler_DBStore.php(651): ActionScheduler_DBStore->get_query_actions_sql(Array, 'select')
#3 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/classes/abstracts/ActionScheduler_Store.php(131): ActionScheduler_DBStore->query_actions(Array)
#4 /var/www/myprotei/public_html/wp-content/plugins/wpforms-lite/vendor/woocommerce/action-scheduler/functions.php(415): ActionScheduler_Store->query_action(Array)
#5 [internal function]: as_has_scheduled_action('wc_schedule_pen...')
#6 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(571): call_user_func('as_has_schedule...', 'wc_schedule_pen...')
#7 /var/www/myprotei/public_html/wp-content/plugins/woocommerce/src/Internal/BatchProcessing/BatchProcessingController.php(86): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->remove_or_retry_failed_processors()
#8 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(341): Automattic\WooCommerce\Internal\BatchProcessing\BatchProcessingController->Automattic\WooCommerce\Internal\BatchProcessing\{closure}('')
#9 /var/www/myprotei/public_html/wp-includes/class-wp-hook.php(365): WP_Hook->apply_filters(NULL, Array)
#10 /var/www/myprotei/public_html/wp-includes/plugin.php(522): WP_Hook->do_action(Array)
  thrown in /var/www/myprotei/public_html/wp-includes/class-wpdb.php on line 4149`;

/** Number of lines in the sample log */
export const EXAMPLE_LOG_LINES = 500;
