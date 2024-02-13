package TodoList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ConfigurationProperties(prefix = "address")
public class TodoListAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoListAppApplication.class, args);
	}

	private String frontend = "http://localhost:3000";

	public void setFrontend(String frontend) {
		this.frontend = frontend;
	}


	@Bean
	@Order(-102)
	public WebMvcConfigurer corsConfigurer() {
		WebMvcConfigurer config  = new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/user/register")
						.allowedOrigins(frontend)
						.allowedMethods("POST");
				registry.addMapping("/user/username")
						.allowedOrigins(frontend)
						.allowedMethods("GET");
				registry.addMapping("/data-api/todos")
						.allowedOrigins(frontend)
						.allowedHeaders("Authorization")
						.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE")
						.allowCredentials(true);
				registry.addMapping("/addTodo")
						.allowedOrigins(frontend)
						.allowedHeaders("Authorization","Content-Type")
						.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE")
						.allowCredentials(true);
				registry.addMapping("/todos")
						.allowedOrigins(frontend)
						.allowedHeaders("Authorization","Content-Type")
						.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE")
						.allowCredentials(true);
				registry.addMapping("/todos/find")
						.allowedOrigins(frontend)
						.allowedHeaders("Authorization","Content-Type")
						.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE")
						.allowCredentials(true);
			}
		};

		return config;
	}
}
