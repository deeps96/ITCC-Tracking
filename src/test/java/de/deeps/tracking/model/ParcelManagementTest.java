package de.deeps.tracking.model;

import de.deeps.tracking.model.data.City;
import de.deeps.tracking.model.data.Location;
import de.deeps.tracking.model.dbobjects.ParcelEntry;
import de.deeps.tracking.model.dbobjects.ParcelType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
class ParcelManagementTest {

    private ParcelEntry parcelEntry;
    private ParcelManagement parcelManagement;
    private ParcelType parcelType;

    @BeforeEach
    void setUp() {
        setUpParcelEntry();
        setUpParcelType();
        setUpParcelManagement();
    }

    private void setUpParcelManagement() {
        setParcelManagement(new ParcelManagement());
    }

    private void setUpParcelEntry() {
        City cityA = new City();
        cityA.setZipCode("01234");
        City cityB = new City();
        cityB.setZipCode("54321");
        Location departure = new Location();
        departure.setCity(cityA);
        Location destination = new Location();
        destination.setCity(cityB);
        setParcelEntry(new ParcelEntry(departure, destination, 0L));
    }

    private void setUpParcelType() {
        ParcelType type = new ParcelType();
        type.setKey("10");
        type.setId("abcdefgh");
        setParcelType(type);
    }

    @Test
    void completeParcelInformation() {
        getParcelManagement().completeParcelInformation(getParcelEntry(), getParcelType(), 12345);
        assertEquals(getParcelType().getId(), getParcelEntry().getParcelTypeID());
        assertEquals(getParcelEntry().getTrackingNumber(), "100123454321010170123450");
    }
}