package de.deeps.tracking.dto;

import de.deeps.tracking.model.data.Location;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

@Getter
@Setter
public class CreateParcelParameter {

    @NotBlank
    private Location departure, destination;
    @NotBlank
    private long handOverTimestamp;
    @NotBlank
    private String parcelTypeName;
}
