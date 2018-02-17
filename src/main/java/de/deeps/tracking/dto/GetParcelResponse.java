package de.deeps.tracking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetParcelResponse {

    private Parcel parcel;

    public GetParcelResponse(Parcel parcel) {
        setParcel(parcel);
    }
}
