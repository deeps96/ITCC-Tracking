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
    @Indexed(name = "createdTimestampIndex", expireAfterSeconds = EXPIRES_AFTER_SECONDS)
    private Date createdTimestamp;

    private String email, token;

    public AuthorizationToken(String email, String token) {
        setCreatedTimestamp(new Date());
        setEmail(email);
        setToken(token);
    }
}
