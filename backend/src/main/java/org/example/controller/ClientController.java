package org.example.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.hibernateConnector.HibernateSessionController;
import org.example.model.Client;
import org.example.response.ErrorMessageResponse;
import org.example.response.ResponseMessage;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
@SuppressWarnings("unused")
public class ClientController {
    private record Clients(List<Client> clients) {
    }
    @Autowired
    private HibernateSessionController sessionController;

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllClients() {
        try (var session = HibernateSessionController.openSession()) {
            List<Client> clients = session.createQuery("from Client", Client.class).list();
            if (clients == null) {
                return new ResponseEntity<>(ResponseMessage.CLIENTS_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(new Clients(clients), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getClientById(@PathVariable("id") Long id) {
        try (var session = HibernateSessionController.openSession()) {
            var client = session.get(Client.class, id);

            if (client == null) {
                return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getClientByLoginAndPassword(@RequestBody String loginData) {
        if (!loginData.contains("login") || !loginData.contains("password")) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "Request must contains 'login' and 'password'"), HttpStatus.BAD_REQUEST);
        }

        try (var session = HibernateSessionController.openSession()) {
            var loginDataMap = new ObjectMapper().readValue(loginData, Map.class);

            String login = (String)loginDataMap.get("login");
            String password = (String)loginDataMap.get("password");

            var query = session.createQuery("from Client where login = :login and password = :password", Client.class);
            query.setParameter("login", login);
            query.setParameter("password", hashPassword(password));
            var client = query.uniqueResult();

            if (client == null) { // if client not found
                query = session.createQuery("from Client where login = :login", Client.class);
                query.setParameter("login", login);
                client = query.uniqueResult();
                if (client != null) { // if client found
                    return new ResponseEntity<>(ResponseMessage.INCORRECT_PASSWORD.getJSON(), HttpStatus.UNAUTHORIZED);
                }
                return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createClient(@RequestBody Client newClient) {
        if (newClient.getLogin() == null ||  newClient.getPassword() == null
        || newClient.getPhoneNumber() == null) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "Request must contains 'login', 'password' and 'phoneNumber'"), HttpStatus.BAD_REQUEST);
        }
        if (newClient.getStatus() == null) {
            newClient.setStatus("user");
        }
        if (!newClient.getStatus().equalsIgnoreCase("user")
                && !newClient.getStatus().equalsIgnoreCase("admin")) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "Status must be 'user' or 'admin'"), HttpStatus.BAD_REQUEST);
        }

        try (var session = HibernateSessionController.openSession()) {
            session.beginTransaction();
            newClient.setPassword(hashPassword(newClient.getPassword())); // hash password
            session.persist(newClient);
            session.getTransaction().commit();
        }
        catch (ConstraintViolationException e) {
            return new ResponseEntity<>(ResponseMessage.LOGIN_OR_PHONE_NUMBER_ALREADY_EXISTS.getJSON(), HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(newClient, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/hesoyam", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMoneyToClient(@RequestBody String idClient) {
        try (var session = HibernateSessionController.openSession()) {
            var idMap = new ObjectMapper().readValue(idClient, Map.class);
            Long id = new ObjectMapper().convertValue(idMap.get("id"), Long.class);

            var random = new Random();

            var client = session.get(Client.class, id);
            if (client == null) {
                return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            session.beginTransaction();
            var newBalance = BigDecimal.valueOf(random.nextDouble() * 999.99 + 0.11); // [0.1; 1000.0]
            client.setBalance(client.getBalance().add(newBalance));
            session.merge(client);
            session.getTransaction().commit();

            return new ResponseEntity<>(client, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/edit", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editClient(@RequestBody Client editClient) {
        if (editClient.getLogin() == null || editClient.getPassword() == null || editClient.getPhoneNumber() == null
                || editClient.getBalance() == null || editClient.getStatus() == null) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "Request must contains 'login', 'password', 'phoneNumber', 'balance' and 'status'"), HttpStatus.BAD_REQUEST);
        }

        try (var session = HibernateSessionController.openSession()) {
            Client oldClient = session.get(Client.class, editClient.getId());
            if (oldClient.equals(editClient)) {
                return new ResponseEntity<>(ResponseMessage.NO_DIFFERENCE_BETWEEN_DATA.getJSON(), HttpStatus.CONFLICT);
            }

            try {
                var methods = oldClient.getClass().getMethods();
                for (var method : methods) {
                    if (method.getName().startsWith("get") && method.getParameterTypes().length == 0 && !void.class.equals(method.getReturnType())) {
                        if (!Objects.equals(method.invoke(oldClient), method.invoke(editClient))) {
                            var setterName = method.getName().replace("get", "set");
                            var setter = Client.class.getMethod(setterName, method.getReturnType());
                            setter.invoke(oldClient, method.invoke(editClient));
                        }
                    }
                }

            } catch (Exception e) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            session.beginTransaction();
            session.merge(oldClient);
            session.getTransaction().commit();

            return new ResponseEntity<>(oldClient, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteClient(@RequestBody String idClient) {
        try (var session = HibernateSessionController.openSession()) {
            var idMap = new ObjectMapper().readValue(idClient, Map.class);
            Long id = new ObjectMapper().convertValue(idMap.get("id"), Long.class);
            Client deletedClient = session.get(Client.class, id);
            if (deletedClient == null) {
                return new ResponseEntity<>(ResponseMessage.CLIENT_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            session.beginTransaction();
            session.remove(deletedClient);
            session.getTransaction().commit();

            return new ResponseEntity<>(ResponseMessage.DELETED_SUCCESSFULLY.getJSON(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String hashPassword(String password) {
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hash);
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
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
