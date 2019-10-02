import nodemailer from 'nodemailer'
class Mailer {
	sendMessage(email, body){
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: 'antokarjeun@gmail.com',
			  pass: '01234limo'
			}
		  });
		  
		  var mailOptions = {
			from: 'antokarjeun@gmail.com',
			to: email,
			subject: 'No-Reply',
			html: '<h1>Meeber POS Activation Code</h1><p>Belows is your activation code!</p>'+body
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });
	}
}
export default new Mailer()