import nodemailer from "nodemailer";

// USE THE CREDENTIALS YOU JUST PROVIDED DIRECTLY
export const mailTransporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c5586a508e5e4a",
        pass: "236f15e79c4686"
    }
});

export const sendEmail = async (to, subject, html) => {
    try {
        const info = await mailTransporter.sendMail({
            from: '"My Backend App" <no-reply@test.com>',
            to: to,
            subject: subject,
            html: html
        });
        console.log("✅ Message sent! Message ID: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};