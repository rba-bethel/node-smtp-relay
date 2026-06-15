# SMTP Test Relay

Lightweight SMTP relay that accepts incoming SMTP on port 25252 and forwards messages using a configured SMTP transport.

**Files:**
- `relay.js`: SMTP server + relay implementation (listens on port 25252).
- `main.js`: small test sender that connects to localhost:25252 and sends a sample message.
- `package.json`: project metadata and `start` script (`npm run start` runs `relay.js`).

**Requirements:**
- Node.js (14+)
- Install dependencies: `npm install`

**Environment variables (for `relay.js`):**
- `HOST` — outbound SMTP host (default: `smtp-mail.outlook.com`)
- `PORT` — outbound SMTP port (default: `587`)
- `SECURE` — set to `1` to enable secure connection (TLS)
- `USER` — SMTP username (if required)
- `PASSWORD` — SMTP password (if required)

**Run the relay:**

```
# USER=test@bethelgen.com PASSWORD=pass
npm run start
# or
node relay.js
```

**Send a test email:**

```
npm run test
# or
node main.js
```

`main.js` is configured to connect to `localhost` on port `25252` (the relay) so you can run the relay locally and then run `main.js` to exercise forwarding.

**Notes:**
- Logs from the relay include parsed From/To/Subject and summary of relay result.
- `relay.js` uses `mailparser` to parse incoming messages and `nodemailer` to forward them.

If you'd like, I can also add example env export lines or a `.env` sample.
