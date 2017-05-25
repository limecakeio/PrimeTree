package BackendServer.Listings.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Listings.Entities.Comment;

/**This interface is a JpaRepository for the Entity Comment with no extra method
 * @author Florian Kutz
 *
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
