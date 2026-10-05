# Aneeq Tahir Portfolio Backend

### Vercel Environment Variables
Add these under Vercel -> Project -> Settings -> Environment Variables:

GMAIL_USER = your Gmail address
GMAIL_APP_PASSWORD = your Google App Password
CONTACT_TO = inbox where you want to receive messages

The Gmail account must have 2-Step Verification enabled before creating an App Password.

Do not put the Gmail password or App Password inside the HTML or JavaScript.

### Image fix
The uploaded image was `Me1.jpeg` while the HTML used `me1.jpeg`. Vercel/Linux is case-sensitive, so this project uses `me1.jpeg` everywhere.
