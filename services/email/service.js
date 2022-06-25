const Mailgen = require('mailgen');

class EmailService {
  constructor(sender) {
    this.sender = sender;
    this.link = 'http://localhost:3000';
    this.mailgen = new Mailgen({
      theme: 'default',
      product: {
        name: 'My App',
        link: this.link,
      },
    });
  }
  createEmailTemplate(username, token) {
      const email = {
      body: {
        name: username,
        intro: 'Welcome to My App!',
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
            color: '#22BC66', 
            text: 'Confirm your account',
            link: `${this.link}/api/auth/verify-email/${token}`,
          },
        },
      },
    };
    return this.mailgen.generate(email);
  }

  async sendEmail(email, username, token) {
    const emailTemplate = this.createEmailTemplate(username, token);
    const message = {
      to: email,
      subject: 'Welcome to my App',
      html: emailTemplate,
    };
    const result = await this.sender.send(message);
    return result
  
  }
}

module.exports = EmailService;
