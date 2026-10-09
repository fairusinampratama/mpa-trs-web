<?php
// Reviewed main-domain entrypoint. No request input selects files or commands.
use Illuminate\Http\Request;
ini_set('display_errors', '0');
define('LARAVEL_START', microtime(true));
$base = '/home/mapp5848/mpa-trs/production';
$marker = $base.'/shared/active-release';
$revision = is_file($marker) && filesize($marker) <= 41 ? trim(file_get_contents($marker)) : '';
if (!preg_match('/\A[a-f0-9]{40}\z/D', $revision)) {
    http_response_code(503);
    header('Retry-After: 60');
    exit('Website temporarily unavailable.');
}
$release = $base.'/releases/'.$revision.'/application';
$completion = $base.'/releases/'.$revision.'/COMPLETE.json';
$completed = is_file($completion) && filesize($completion) <= 512
    ? json_decode(file_get_contents($completion), true) : null;
if (realpath($release) !== $release || !is_file($release.'/vendor/autoload.php') || !is_file($base.'/shared/.env')
    || !is_array($completed) || ($completed['revision'] ?? null) !== $revision) {
    http_response_code(503);
    exit('Website temporarily unavailable.');
}
require $release.'/vendor/autoload.php';
$app = require $release.'/bootstrap/app.php';
$app->useEnvironmentPath($base.'/shared');
$app->useStoragePath($base.'/shared/storage');
$app->handleRequest(Request::capture());
