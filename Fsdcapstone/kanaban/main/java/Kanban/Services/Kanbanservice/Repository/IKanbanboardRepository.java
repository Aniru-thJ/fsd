package Kanban.Services.Kanbanservice.Repository;

import Kanban.Services.Kanbanservice.Domain.KanbanBoard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IKanbanboardRepository extends MongoRepository<KanbanBoard,Integer>
{

}
