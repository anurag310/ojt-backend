

const nodemailer = require("nodemailer");

exports.sendEmail = (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, // Use port 465 for SSL
            secure: true,
            auth: {
              user: "anuragbasu402@gmail.com", // Replace with your email
              pass: "dtke dvym yene hrdl", // Use the App Password generated for your email
            },
          });
        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: "anuragbasu402@gmail.com",
        //         password :"dtke dvym yene hrdl"// Use your Gmail account password or App Password here
        //     }
        // });

        const mailOptions = {
            from: "anuragbasu402@gmail.com",
            to: req.body.email,
            
            subject: 'Password Reset Request',
            html: `<p>Hi ${req.body.email},</p><p>Please copy the link to reset your password: <a href="http://localhost:7000/api/resetpassword">Reset Password</a></p>`,
    };
       

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(400).json({ message: "Email delivery error" });
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).json({ message: "Success" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
