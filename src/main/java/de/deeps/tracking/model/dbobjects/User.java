package de.deeps.tracking.model.dbobjects;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Getter
@Setter
public class User {

    private String department, email, hashedPassword, forename, id, lastname,roleID;

    public User(String department, String email, String hashedPassword, String forename, String lastname) {
        setDepartment(department);
        setEmail(email);
        setHashedPassword(hashedPassword);
        setForename(forename);
        setLastname(lastname);
    }
}
