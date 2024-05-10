from flask_mail import Mail, Message
from flask import Flask

def send_test_email():
    app = Flask(__name__)
    app.config['DEBUG'] = True  # Enable Flask debug mode to see verbose output
    app.config['MAIL_SERVER'] = 'smtp-mail.outlook.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = 'tech.for.village@outlook.com'
    app.config['MAIL_PASSWORD'] = 'Techforvillage123'

    mail = Mail(app)

    with app.app_context():
        msg = Message("Test Email",
                        sender="tech.for.village@outlook.com",
                        recipients=["alvidofaisal@gmail.com"],
                        body="This is a test email sent from Flask.")
        try:
            mail.send(msg)
            print("Email sent successfully!")
        except Exception as e:
            print(f"Failed to send email: {e}")

if __name__ == '__main__':
    send_test_email()
