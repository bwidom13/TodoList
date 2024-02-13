package TodoList.controller;

import TodoList.entity.AppUser;
import TodoList.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("https://todolist.cfapps.us10-001.hana.ondemand.com")
public class UserController {
    private UserRepository userRepo;
    private PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody AppUser appUser){
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        userRepo.save(appUser);
    }

    @GetMapping("/username")
    public String getUsername(Authentication authentication){
        return authentication.getName();
    }
}
