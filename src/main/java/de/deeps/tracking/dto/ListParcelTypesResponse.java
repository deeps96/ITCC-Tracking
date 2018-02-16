package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListParcelTypesResponse {

    private List<String> parcelTypes;

    public ListParcelTypesResponse(List<String> parcelTypes) {
        setParcelTypes(parcelTypes);
    }
}
