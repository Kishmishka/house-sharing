package org.example.controller;

import org.example.hibernateConnector.HibernateSessionController;
import org.example.model.Client;
import org.example.model.House;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/houses")
@SuppressWarnings("unused")
public class HouseController {
    @Autowired
    private HibernateSessionController sessionController;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public String GetAllHouses() {
        var session = HibernateSessionController.openSession();
        List<House> houses = session.createQuery("from House", House.class).list();
        session.close();

        return "{ \"houses\" : " + houses + "}";
    }
}
