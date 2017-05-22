package BackendServer.Listings.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Listings.Entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	//Thaer

}
