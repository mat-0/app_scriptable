
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: envelope;
// Message Many

/**
 * The script is peculiar in that it presents the Messages UI before with the contents and reci-
 * pients filled in but doesn't send it right away – the user must manually press the send button.
 *
 * It can be modified to attach images/files as per the Message object documentation.
 */

const RECIPIENTS = [
	// strings with phone numbers
];
const CONTENT = '';

const msg = new Message();
msg.recipients = RECIPIENTS;
msg.body = CONTENT;
msg.send();
