import nodemailer from "nodemailer";

//automatisk mail vid registrering
export function registrationMailForCustomer(email: string, name: string) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Tack för att du registrera hos Renoveta",
    text: `Hej ${name}!
    Tack för din registrering hos Renoveta. 
  
    Så fort vi har kollat på ditt formulär återkommer vi med svar. 
    Du kommer att få ett mail om att du har fått svaret i din profil hos oss.
  
    Med vänliga hälsningar,
    Renoveta`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log("Email sent sucessfully" + info.response);
    }
  });
}

export function registrationMailForRenoveta() {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.MAIL_USERNAME,
    to: "renovetadev@outlook.com",
    subject: "En kund har skickat in formulär",
    text: `Hej Renoveta!
    Ännu en kund har registrerat sig hos er! 

    Gå in på er sida och behandla ärendet. 
  
    Med vänliga hälsningar,
    RenovetaDevTeam`,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log("Email sent sucessfully" + info.response);
    }
  });
}

export function customerHasIncomingResponse(email: string, name: string) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Du har fått svar från Renoveta",
    text: `Hej ${name}!
    Vår Renoveta Team har behandlat ditt ärende. 
  
    Logga in på din profil hos oss för att läsa mer.
  
    Med vänliga hälsningar,
    Renoveta`,
  };

  transporter.sendMail(emailOptions, function (err, info) {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log("Email sent sucessfully" + info.response);
    }
  });
}
