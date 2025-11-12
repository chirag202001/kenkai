import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'talent-interests.json');

export async function persistTalentInterest(email: string) {
	try {
		await fs.mkdir(DATA_DIR, { recursive: true });
		let existing: { email: string; date: string }[] = [];
		try {
			const raw = await fs.readFile(DATA_FILE, 'utf-8');
			existing = JSON.parse(raw);
			if (!Array.isArray(existing)) existing = [];
		} catch {
			existing = [];
		}
		if (!existing.some(e => e.email === email)) {
			existing.push({ email, date: new Date().toISOString() });
			await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2));
		}
	} catch (err) {
		console.warn('Failed to persist talent interest (non-fatal):', err);
	}
}

export async function sendTalentInterestEmail(email: string) {
	const host = process.env.SMTP_HOST;
	const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;
	const to = process.env.TALENT_INTEREST_TO;
	const from = process.env.TALENT_INTEREST_FROM || to || user || 'no-reply@localhost';

	if (!host || !user || !pass || !to) {
		console.log('Talent interest email logged (SMTP not configured):', email);
		return;
	}

	try {
		const transporter = nodemailer.createTransport({
			host,
			port,
			secure: port === 465,
			auth: { user, pass }
		});

		await transporter.sendMail({
			from,
			to,
			subject: 'New Talent Interest Submission',
			text: `A new talent interest was submitted: ${email}`,
			html: `<p>A new talent interest was submitted:</p><p><strong>${email}</strong></p><p>Timestamp: ${new Date().toISOString()}</p>`
		});
	} catch (err) {
		console.warn('Failed to send talent interest email (non-fatal):', err);
	}
}

export function getTalentInterestFilePath() {
	return DATA_FILE;
}
