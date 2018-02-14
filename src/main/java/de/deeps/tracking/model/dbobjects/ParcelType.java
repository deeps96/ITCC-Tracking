package de.deeps.tracking.model.dbobjects;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.IllegalFormatException;

@Document(collection = "parcel-types")
@Getter
@Setter
public class ParcelType {

    @Getter(AccessLevel.PRIVATE) private static final int KEY_LENGTH = 2;

    private String id, key, name;

    public void setKey(String key) {
        if (!validateKey(key)) {
            throw new IllegalArgumentException("The key needs to have exactly " + getKEY_LENGTH() + " digits!");
        }
        setBasicKey(key);
    }

    private boolean validateKey(String key) {
        return key.matches("\\d{" + getKEY_LENGTH() + "}");
    }

    private void setBasicKey(String key) {
        this.key = key;
    }
}
