package AuthServer;

import AuthServer.entity.AppUser;
import AuthServer.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ConfigurationProperties(prefix = "address")
public class TodoListAppAuthorizationServerApplication {
	private String frontend= "http://localhost:3000";
	public void setFrontend(String frontend) {
		this.frontend = frontend;
	}

	public static void main(String[] args) {
		SpringApplication.run(TodoListAppAuthorizationServerApplication.class, args);
	}

//	@Bean
//	ApplicationRunner applicationRunner(UserRepository userRepo, PasswordEncoder encoder){
//		return args -> {
//			userRepo.save(new AppUser("user", encoder.encode("password")));
//			userRepo.save(new AppUser("person", encoder.encode("safe123")));
//		};
//	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/oauth2/authorize")
						.allowedOrigins(frontend)
						.allowedHeaders("Authorization", "Accept", "response_type", "client_id", "redirect_uri", "scope")
						.allowedMethods("GET")
						.allowCredentials(true);
				registry.addMapping("/login")
						.allowedOrigins(frontend)
						.allowedHeaders("Authorization", "Accept")
						.allowedMethods("GET", "POST")
						.allowCredentials(true);
				registry.addMapping("/oauth2/token")
						.allowedOrigins(frontend)
						.allowedHeaders("Content-Type","Authorization")
						.allowedMethods("POST")
						.allowCredentials(true);
				registry.addMapping("/oauth2/revoke")
						.allowedOrigins(frontend)
						.allowedHeaders("Content-Type","Authorization")
						.allowedMethods("POST")
						.allowCredentials(true);
				registry.addMapping("/connect/logout")
						.allowedOrigins(frontend)
						.allowedHeaders("Content-Type","Authorization")
						.allowedMethods("GET, POST")
						.allowCredentials(true);
				registry.addMapping("/out")
						.allowedOrigins(frontend)
						.allowedHeaders("Content-Type","Authorization")
						.allowedMethods("GET, POST")
						.allowCredentials(true);
			}
		};
	}

}
