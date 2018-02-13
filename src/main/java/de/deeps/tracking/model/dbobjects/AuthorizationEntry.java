package de.deeps.tracking.model.dbobjects;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "authorization-entries")
@Getter
@Setter
public class AuthorizationEntry {

    private String email, hashedPassword;

}
