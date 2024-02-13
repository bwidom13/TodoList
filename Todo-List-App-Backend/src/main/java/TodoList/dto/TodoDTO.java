package TodoList.dto;

import TodoList.entity.Todo;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TodoDTO {
    private Long id;
    private String content;
    private boolean completed;
    private LocalDateTime dueDate;
    private LocalDateTime dateCreated;

    public TodoDTO(Todo todo){
        this.id = todo.getId();
        this.content = todo.getContent();
        this.completed = todo.isCompleted();
        this.dueDate = todo.getDueDate();
        this.dateCreated = todo.getDateCreated();
    }
}
