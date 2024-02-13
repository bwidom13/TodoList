package TodoList.config;

import TodoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration(proxyBeanMethods = false)
@ConfigurationProperties(prefix = "address")
public class SecurityConfig {
    private String frontend = "http://localhost:3000";
    private String authServer = "https://todo-list-auth-server.cfapps.us10-001.hana.ondemand.com";
    private String clientId ="";

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    private String secret = "";

    public void setAddress(String frontend) {
        this.frontend = frontend;
    }
    public void setAuthServer(String authServer) {
        this.authServer = authServer;
    }

    @Autowired
    public UserRepository userRepo;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                UserDetails user = userRepo.findByUsername(username);
                if(user == null)
                    throw new UsernameNotFoundException("Invalid Username");
                return user;
            }
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf->csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(
                        (authorizeHttpRequests) ->
                        authorizeHttpRequests.requestMatchers(HttpMethod.POST, "/data-api/users")
                                .permitAll())
                .authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.POST, "/user/register")
                                .permitAll()
                )
                .authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.GET, "/user/username")
                                .hasAuthority("SCOPE_getTodos")
                )
                .authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.GET, "/data-api/todos/**")
                                .hasAuthority("SCOPE_getTodos")
                ).authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.PATCH, "/data-api/todos/**")
                                .hasAuthority("SCOPE_updateTodos")
                ).authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.PUT, "/data-api/todos/**")
                                .hasAuthority("SCOPE_updateTodos")
                ).authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.DELETE, "/data-api/todos/**")
                                .hasAuthority("SCOPE_deleteTodos")
                ).authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.POST, "/data-api/todos/**")
                                .hasAuthority("SCOPE_addTodos")
                ).authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.POST, "/addTodo")
                                .hasAuthority("SCOPE_addTodos")
                )
                .authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.GET, "/todos")
                                .hasAuthority("SCOPE_getTodos")
                ).authorizeHttpRequests(
                        (auth) -> auth.requestMatchers(HttpMethod.GET, "/todos/find")
                                .hasAuthority("SCOPE_getTodos")
                )
                .oauth2ResourceServer(oAuth2 -> oAuth2.opaqueToken(token -> token
                        .introspectionUri(authServer + "/oauth2/introspect")
                        .introspectionClientCredentials("todo-app-client", "secret")))
                .logout(logout -> {
                    logout.logoutSuccessUrl("https://todolist.cfapps.us10-001.hana.ondemand.com")
                            .logoutUrl("https://todolist.cfapps.us10-001.hana.ondemand.com");
                })
                .build();
    }
}
