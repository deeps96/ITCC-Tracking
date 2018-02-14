package de.deeps.tracking.model.data;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Location {

    private City city;
    private int roadNumber;
    private String country, road;
}
