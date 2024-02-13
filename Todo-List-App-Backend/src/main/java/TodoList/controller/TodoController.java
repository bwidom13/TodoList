package TodoList.controller;

import TodoList.dto.TodoDTO;
import TodoList.entity.AppUser;
import TodoList.entity.Todo;
import TodoList.repository.TodoRepository;
import TodoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.domain.Sort;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("https://todolist.cfapps.us10-001.hana.ondemand.com")
public class TodoController {

    @Autowired
    TodoRepository todoRepo;

    @Autowired
    UserRepository userRepo;

    @PostMapping("/addTodo")
    public void save(@RequestBody Todo newTodo, Authentication authentication){
        AppUser appUser = userRepo.findByUsername(authentication.getName());
        todoRepo.save(new Todo(null, newTodo.getContent(), false, newTodo.getDueDate(), LocalDateTime.now(), appUser));
    }

    @GetMapping("/todos")
    public List<TodoDTO> getTodosByUser(Authentication authentication, @RequestParam String sort, @RequestParam boolean includeCompleted){
        AppUser appUser = userRepo.findByUsername(authentication.getName());
        List<Todo> todos = todoRepo.findAllByAppUser(appUser, Sort.by(sort));
        if(!includeCompleted)
            todos = todos.stream().filter(todo -> !todo.isCompleted()).toList();
        return todos.stream().map(todo -> new TodoDTO(todo)).toList();
    }

    @GetMapping("/todos/find")
    public List<TodoDTO> getTodosWithSearchParameters(Authentication authentication, @RequestParam String query){
        AppUser appUser = userRepo.findByUsername(authentication.getName());
        List<Todo> todos = todoRepo.findAllByAppUserAndContentContaining(appUser, query);
        return todos.stream().map(TodoDTO::new).toList();
    }
}
