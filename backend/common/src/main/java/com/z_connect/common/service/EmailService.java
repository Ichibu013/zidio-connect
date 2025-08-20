package com.z_connect.common.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Map;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    private final SpringTemplateEngine templateEngine;

    public EmailService(JavaMailSender javaMailSender,
                        SpringTemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public void sendOTPEmail(String to, String OTP) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Email Verification Code - Zidio Connect");
        message.setText("Your verification code is: " + OTP);
        message.setFrom("no-reply-zidio-connect-backend@localhost");
        javaMailSender.send(message);
    }

    public void sendPasswordEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom("no-reply-zidio-connect-backend@localhost");
        message.setSubject("Password Reset Link - Zidio Connect");
        message.setText("To Reset your password, please click the following link to reset your password.\n" +
                "https://congenial-orbit-gv5j5jxj5vghpp65-3000.app.github.dev/auth/reset-password?token=" + token);
        javaMailSender.send(message);
    }

    public void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> model) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        Context context = new Context();
        context.setVariables(model);

        String html = templateEngine.process(templateName, context);

        helper.setTo(to);
        helper.setFrom("no-reply-zidio-connect-backend@localhost");
        helper.setSubject(subject);
        helper.setText(html, true);

        javaMailSender.send(message);
    }

}
