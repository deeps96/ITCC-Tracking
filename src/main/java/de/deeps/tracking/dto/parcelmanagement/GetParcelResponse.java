package de.deeps.tracking.dto.parcelmanagement;

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
