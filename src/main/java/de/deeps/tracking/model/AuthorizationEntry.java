package de.deeps.tracking.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "authorization-data")
@Getter
@Setter
public class AuthorizationEntry {

    private String foreName, lastName, emailAddress, hashedPassword;

}
