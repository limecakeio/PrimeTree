package BackendServer.Listings.Entities;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.JSONObject;

import BackendServer.Listings.Constants;

@Entity
public class Comment {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
	
	private long authorId;
	
	private Date createDate;
	
	private String message;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getText() {
		return message;
	}

	public void setText(String text) {
		this.message = text;
	}

	public long getAuthorId() {
		return authorId;
	}

	public void setAuthorId(long authorId) {
		this.authorId = authorId;
	}

	public JSONObject toJSON() {
		JSONObject commentAsJSON=new JSONObject();
		commentAsJSON.accumulate(Constants.commentDataFieldCommentId, this.getId());
		commentAsJSON.accumulate(Constants.commentDataFieldUserId, this.getAuthorId());
		commentAsJSON.accumulate(Constants.commentDataFieldDate, this.getCreateDate());
		commentAsJSON.accumulate(Constants.commentDataFieldMessage, this.getText());
		return commentAsJSON;
	}

}
