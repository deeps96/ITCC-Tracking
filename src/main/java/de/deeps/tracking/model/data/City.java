package de.deeps.tracking.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class City {

    private String name, zipCode;

    public City() {}
}
