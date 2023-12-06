package org.example.controller;

import org.example.model.Client;
import org.hibernate.cfg.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@SuppressWarnings("unused")
public class ClientController {
    @GetMapping("/all")
    public String GetAllClients() {
        var sessionFactory = new Configuration().configure().buildSessionFactory();
        var session = sessionFactory.openSession();

        session.beginTransaction();
        List<Client> clients = session.createQuery("from Client", Client.class).list();
        session.getTransaction().commit();

        session.close();
        sessionFactory.close();

        return "{ \"clients\" : " + clients.toString() + "}";
    }

    @GetMapping("/{id}")
    public String getClientById(@PathVariable("id") Long id) {
        var sessionFactory = new Configuration().configure().buildSessionFactory();
        var session = sessionFactory.openSession();

        session.beginTransaction();
        var client = session.get(Client.class, id);
        session.getTransaction().commit();

        session.close();
        sessionFactory.close();

        return "{ \"client\" : " + client.toString() + "}";
    }

    @GetMapping("/login")
    public String getClientByLoginAndPassword(@RequestParam("login") String login, @RequestParam("password") String password) {
        var sessionFactory = new Configuration().configure().buildSessionFactory();
        var session = sessionFactory.openSession();

        session.beginTransaction();
        var query = session.createQuery("from Client where login = :login and password = :password", Client.class);
        query.setParameter("login", login);
        query.setParameter("password", hashPassword(password));
        var client = query.uniqueResult();
        session.getTransaction().commit();

        session.close();
        sessionFactory.close();

        if (client != null) {
            return "{ \"client\" : " + client + "}";
        } else {
            return "{ \"message\" : \"Client not found\"}";
        }
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Client> CreateClient(@RequestParam("login") String login, @RequestParam("password") String password, @RequestParam("phoneNumber") String phoneNumber, @RequestParam("email") String email, @RequestParam("balance") BigDecimal balance) {
        var sessionFactory = new Configuration().configure().buildSessionFactory();
        var session = sessionFactory.openSession();

        var newClient = new Client();
        newClient.setLogin(login);
        newClient.setPassword(hashPassword(password));
        newClient.setPhoneNumber(phoneNumber);
        newClient.setEmail(email);
        newClient.setBalance(balance);

        session.beginTransaction();
        session.persist(newClient);
        session.getTransaction().commit();

        session.close();
        sessionFactory.close();
        return new ResponseEntity<>(newClient, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public String deleteClientById(@PathVariable("id") Long id) {
        var sessionFactory = new Configuration().configure().buildSessionFactory();
        var session = sessionFactory.openSession();

        session.beginTransaction();
        var client = session.get(Client.class, id);
        if (client != null) {
            session.remove(client);
        }
        session.getTransaction().commit();

        session.close();
        sessionFactory.close();

        return "{ \"message\" : \"Client deleted\"}";
    }

    private String hashPassword(String password) {
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return null;
    }

    private String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if(hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
