package AuthServer;

import AuthServer.entity.AppUser;
import AuthServer.repository.UserRepository;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@ConfigurationProperties(prefix = "address")
public class controller {
    private UserRepository userRepository;
    private String frontend= "http://";
    public void setFrontend(String frontend) {
        this.frontend = frontend;
    }

    public controller(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public String test(){
        return frontend;
    }
}
