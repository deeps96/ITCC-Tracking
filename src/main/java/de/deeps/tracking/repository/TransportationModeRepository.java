package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.TransportationMode;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportationModeRepository extends MongoRepository<TransportationMode, String> {

    TransportationMode findByMode(String mode);
    List<TransportationMode> findByRemoved(boolean removed);
}
