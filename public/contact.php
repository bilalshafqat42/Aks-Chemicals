<?php
/**
 * AKS Chemicals enquiry form handler.
 *
 * Runs on any PHP host (Hostinger shared hosting included). The static site
 * posts the contact form here; this emails it to the sales inbox.
 *
 * SETUP: change the two addresses below.
 *  - ENQUIRY_TO   the inbox that should receive enquiries (several: comma separated)
 *  - ENQUIRY_FROM a mailbox that EXISTS on this domain in Hostinger (hPanel > Emails).
 *                 Hostinger rejects or spam-folders mail "from" an address it doesn't host.
 */

const ENQUIRY_TO   = 'info@akschemicals.com';
const ENQUIRY_FROM = 'website@akschemicals.com';
const SITE_NAME    = 'AKS Chemicals';
const MAX_PER_HOUR = 10;  // submissions allowed per visitor per hour

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($status, $body)
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function fail($status, $error)
{
    respond($status, ['ok' => false, 'error' => $error]);
}

/** Trim, drop control characters (keeping newlines when multiline) and cap the length. */
function clean($value, $max, $multiline = false)
{
    if (!is_string($value)) {
        return '';
    }
    $pattern = $multiline ? '/[\x00-\x09\x0B-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]/u';
    $value = trim((string) preg_replace($pattern, '', $value));
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

/** Simple per-IP limit stored in the server's temp folder. Fails open if storage isn't writable. */
function rate_limited($clientKey)
{
    $file = rtrim(sys_get_temp_dir(), '/') . '/aks_enquiry_' . hash('sha256', $clientKey . __FILE__);
    $now = time();
    $fh = @fopen($file, 'c+');
    if (!$fh) {
        return false;
    }
    flock($fh, LOCK_EX);
    $hits = json_decode((string) stream_get_contents($fh), true);
    $hits = array_values(array_filter(is_array($hits) ? $hits : [], function ($t) use ($now) {
        return is_int($t) && $t > $now - 3600;
    }));
    $limited = count($hits) >= MAX_PER_HOUR;
    if (!$limited) {
        $hits[] = $now;
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($hits));
    }
    flock($fh, LOCK_UN);
    fclose($fh);
    return $limited;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed.');
}

// Only accept submissions from this site's own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '')) {
    fail(403, 'Invalid submission.');
}

// Honeypot: hidden from people, bots fill it in. Pretend success so they get no signal.
if (clean($_POST['website'] ?? '', 200) !== '') {
    respond(200, ['ok' => true]);
}

$name    = clean($_POST['name'] ?? '', 120);
$company = clean($_POST['company'] ?? '', 160);
$email   = clean($_POST['email'] ?? '', 200);
$process = clean($_POST['process'] ?? '', 80);
$brief   = clean($_POST['brief'] ?? '', 4000, true);

if ($name === '') {
    fail(422, 'Please add your name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'Please add a valid email address.');
}
if ($process === '') {
    fail(422, 'Please choose a process.');
}

// Behind Hostinger's CDN every visitor can share the CDN's address, so key the
// limit on the forwarded client address too. A bot can fake that header to dodge
// the limit, but the honeypot still applies; locking out real visitors is worse.
$forwarded = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')[0]);
$clientKey = ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|' . substr($forwarded, 0, 64);

if (rate_limited($clientKey)) {
    fail(429, 'Too many enquiries from this connection. Please try again later.');
}

$body = implode("\n", [
    'New enquiry from the ' . SITE_NAME . ' website',
    '',
    'Name:     ' . $name,
    'Company:  ' . ($company !== '' ? $company : '-'),
    'Email:    ' . $email,
    'Process:  ' . $process,
    '',
    'What they need:',
    $brief !== '' ? $brief : '-',
]);

$subject = 'Website enquiry: ' . $process . ' (' . ($company !== '' ? $company : $name) . ')';
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

// Every value used in a header has been stripped of line breaks above,
// and $email has passed FILTER_VALIDATE_EMAIL, so no header injection.
$headers = implode("\r\n", [
    'From: ' . SITE_NAME . ' Website <' . ENQUIRY_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = @mail(ENQUIRY_TO, $encodedSubject, $body, $headers);

if (!$sent) {
    error_log('AKS enquiry: mail() failed for ' . $email);
    fail(502, "We couldn't send your enquiry.");
}

respond(200, ['ok' => true]);
