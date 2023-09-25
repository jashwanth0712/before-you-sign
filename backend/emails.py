import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os
load_dotenv()

def send_reminder_emails(email_list, sig_id):
    # configure the SMTP server of sender(for now sasha's gmail)
    smtp_username = os.getenv("EMAIL") 
    smtp_password = os.getenv("GMAIL_PASSWORD")
    email_subject = 'Reminder: Signature Request'
    email_body = f'Dear recipient,\nThis is a reminder about the signature request {sig_id}.'

    # email_list = ['alteek05@gmail.com','madatisasank@gmail.com','jashwanth0712@gmail.com','cs20b1007@iiitdm.ac.in']

    try:
        # make a connection
        smtp_conn = smtplib.SMTP('smtp.gmail.com', 587)
        smtp_conn.starttls()
        smtp_conn.login(smtp_username, smtp_password)
        print("emails:" , email_list)
        # Loop through the email addresses and send reminder emails
        for email in email_list:
            
            msg = MIMEMultipart()
            msg['From'] = smtp_username
            msg['To'] = email
            msg['Subject'] = email_subject
            msg.attach(MIMEText(email_body, 'plain'))
            smtp_conn.sendmail(smtp_username, email, msg.as_string())

        # Close the connection
        smtp_conn.quit()
        print("Reminder emails sent successfully\n")
        return True
    
    except Exception as e:
        print("Error: unable to send email due to exception: ", e)
        return False