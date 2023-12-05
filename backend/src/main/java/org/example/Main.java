package org.example;

import org.example.model.Client;
import org.hibernate.cfg.Configuration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);

        test();
    }

    @GetMapping("/api/clients")
    public static String test() {
        var sessionFactory = new Configuration().configure().buildSessionFactory();
        var session = sessionFactory.openSession();

        session.beginTransaction();
        List<Client> clients = session.createQuery("from Client", Client.class).list();
        session.getTransaction().commit();

        session.close();
        sessionFactory.close();

        return clients.toString();



//        var sessionFactory = new Configuration().configure().buildSessionFactory();
//        var session = sessionFactory.openSession();
//
//        Client client = new Client();
//        client.setLogin("testLogin");
//        client.setPassword("testPassword");
//        client.setPhoneNumber("1234567890");
//        client.setEmail("test@example.com");
//        client.setBalance(new BigDecimal("100.00"));
//        session.beginTransaction();
//        session.save(client);
//        session.getTransaction().commit();
//
//        session.close();
//        sessionFactory.close();
    }
}