package com.example.leadadminback.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/restapi")
@CrossOrigin(origins="http://localhost:3000")
public class LoginController {
    private final UserRepository userRepository;
    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private static final String SECRET_KEY = "LeadAdmin";

    @Autowired
    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/test")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {

            String token = generateToken(user.getUsername(), user.getPassword(), user.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);
        } else {
            // Authentication failed
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    @PostMapping({"/signup"})
    public User signupForm(@RequestBody User user) {
        return userRepository.save(user);
    }
    @GetMapping("/login")
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(userRepository.findAll(),HttpStatus.OK);
    }

    public static String generateToken(String username, String password, String role) {
        String token = username + ":" + password + ":" + role;

        byte[] secretKeyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKeyBytes, HMAC_ALGORITHM);

        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            mac.init(secretKeySpec);
            byte[] macBytes = mac.doFinal(token.getBytes(StandardCharsets.UTF_8));

            return Base64.getEncoder().encodeToString(macBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace(); // Handle the exception as per your application's requirements
        }

        return null;
    }

}
