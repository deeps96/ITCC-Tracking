package de.deeps.tracking.model.dbobjects;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transportation-modes")
@Getter
@Setter
public class TransportationMode extends AbstractFixedData {

    private String id, mode;

    public TransportationMode() {}

    public TransportationMode(String mode) {
        setMode(mode);
    }
}
