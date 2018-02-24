package de.deeps.tracking.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Location {

    private City city;
    private String country, road;

    public Location() {}
}
