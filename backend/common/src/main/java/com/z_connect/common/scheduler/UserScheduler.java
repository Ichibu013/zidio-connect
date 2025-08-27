package com.z_connect.common.scheduler;

import com.z_connect.common.repository.IUserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;

@Component
public class UserScheduler {

    private final IUserRepository userRepository;

    private final WebApplicationContext context;

    private static final long VERIFICATION_GRACE_PERIOD_MINUTES = 10;

    public UserScheduler(IUserRepository userRepository, WebApplicationContext context) {
        this.userRepository = userRepository;
        this.context = context;
    }

    @Scheduled(cron = "0 */10 * * * ?") // Runs every 10 minutes
    public void cleanupUnverifiedOtpUsers() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(VERIFICATION_GRACE_PERIOD_MINUTES);
        userRepository.deleteUnverifiedUsers(cutoffTime);
        System.out.println("Scheduled task: Deleted unverified OTP users older than " + VERIFICATION_GRACE_PERIOD_MINUTES + " minutes.");
    }

}
