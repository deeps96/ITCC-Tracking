package de.deeps.tracking.model.dbobjects;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "authorization-tokens")
@Getter
@Setter
public class AuthorizationToken {

    private static final int EXPIRES_AFTER_SECONDS = 600; //ten minutes

    @Field
    @Indexed(name = "lastEditTimestampIndex", expireAfterSeconds = EXPIRES_AFTER_SECONDS)
    private Date lastEditTimestamp;

    private String userID, token;

    public AuthorizationToken(String userID, String token) {
        refreshLastEditTimestamp();
        setUserID(userID);
        setToken(token);
    }

    public void refreshLastEditTimestamp() {
        setLastEditTimestamp(new Date());
    }
}
