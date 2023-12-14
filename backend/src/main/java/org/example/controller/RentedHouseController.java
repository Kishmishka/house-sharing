package org.example.controller;

import org.example.hibernateConnector.HibernateSessionController;
import org.example.model.RentedHouse;
import org.example.response.ErrorMessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rented-houses")
@SuppressWarnings("unused")
public class RentedHouseController {
    private record RentedHouses(List<RentedHouse> rentedHouses) {
    }

    @Autowired
    private HibernateSessionController sessionController;

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllRentedHouses() {
        try (var session = HibernateSessionController.openSession()) {
            List<RentedHouse> rentedHouses = session.createQuery("from Rented_House", RentedHouse.class).list();
            return new ResponseEntity<>(new RentedHouseController.RentedHouses(rentedHouses), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
