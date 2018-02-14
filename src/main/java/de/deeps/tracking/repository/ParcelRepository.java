package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.ParcelEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParcelRepository extends MongoRepository<ParcelEntry, String> {

    ParcelEntry findByTrackingNumber(String trackingNumber);
}
