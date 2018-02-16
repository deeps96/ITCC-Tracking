package de.deeps.tracking.model.dbobjects;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "action-descriptions")
@Getter
@Setter
public class ActionDescription {

    private String action, id;

}
