package com.example.JanConnect;

import com.example.JanConnect.enums.Role;
import com.example.JanConnect.models.User;
import com.example.JanConnect.repos.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableMethodSecurity
public class JanConnectApplication {


    public static void main(String[] args) {
		SpringApplication.run(JanConnectApplication.class, args);
	}



}
