package de.deeps.tracking.model.dbobjects;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transportation-modes")
@Getter
@Setter
public class TransportationMode {

    private String id, mode;

}
