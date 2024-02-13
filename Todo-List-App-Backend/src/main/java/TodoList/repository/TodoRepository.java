package TodoList.repository;

import TodoList.entity.AppUser;
import TodoList.entity.Todo;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByAppUser(AppUser appUser, Sort sort);

    List<Todo> findAllByAppUserAndContentContaining(AppUser appUser, String query);
}
