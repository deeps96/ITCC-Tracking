package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.ActionDescription;
import de.deeps.tracking.model.dbobjects.ParcelEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionDescriptionRepository extends MongoRepository<ActionDescription, String> {

    ActionDescription findByAction(String action);
}
