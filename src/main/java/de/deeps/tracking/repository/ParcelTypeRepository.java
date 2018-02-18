package de.deeps.tracking.repository;

import de.deeps.tracking.model.dbobjects.ParcelType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParcelTypeRepository extends MongoRepository<ParcelType, String> {

    ParcelType findByName(String name);
    ParcelType findByKey(String key);
    List<ParcelType> findByRemoved(boolean removed);
}
