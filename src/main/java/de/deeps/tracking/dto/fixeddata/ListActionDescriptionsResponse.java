package de.deeps.tracking.dto.fixeddata;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListActionDescriptionsResponse {

    private List<String> actionDescriptions;

    public ListActionDescriptionsResponse(List<String> actionDescriptions) {
        setActionDescriptions(actionDescriptions);
    }
}
