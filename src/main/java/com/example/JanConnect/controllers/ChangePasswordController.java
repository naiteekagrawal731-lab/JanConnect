package com.example.JanConnect.controllers;


import com.example.JanConnect.dtos.requestDtos.ChangePasswordRequest;
import com.example.JanConnect.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/changepassword")
public class ChangePasswordController {

    private final UserService userService;

    public ChangePasswordController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> changeUserPassword(@RequestBody ChangePasswordRequest request){
        return userService.changeUserPassword(request);
    }

}
