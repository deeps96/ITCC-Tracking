package de.deeps.tracking.model.dbobjects;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedList;
import java.util.List;

@Document(collection = "roles")
@Getter
@Setter
public class Role {

    private List<String> privileges;
    private String name;

    public Role() {
        setPrivileges(new LinkedList<>());
    }
}
