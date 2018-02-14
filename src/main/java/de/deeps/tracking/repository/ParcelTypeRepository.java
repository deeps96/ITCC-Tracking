package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.ParcelType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParcelTypeRepository extends MongoRepository<ParcelType, String> {

    ParcelType findByName(String name);
}
