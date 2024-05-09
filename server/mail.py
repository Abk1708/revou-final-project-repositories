from flask import render_template, url_for
from flask_mail import Mail, Message

mail = Mail()

def send_verification_email(user_email, token):
    verification_link = url_for("auth.confirm_email", token=token, _external=True)
    html_content = render_template('auth/templates/email_verification_template.html', verification_link=verification_link)
    msg = Message('Confirm Your Email', sender='your-email@example.com', recipients=[user_email])
    msg.html = html_content
    mail.send(msg)
