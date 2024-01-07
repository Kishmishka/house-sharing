package org.example.controller;

import org.example.hibernateConnector.HibernateSessionController;
import org.example.model.House;
import org.example.model.RentedHouse;
import org.example.response.ErrorMessageResponse;
import org.example.response.ResponseMessage;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/rented-houses")
@CrossOrigin(origins = "*")
@SuppressWarnings("unused")
public class RentedHouseController {
    private record RentedHouses(List<RentedHouse> rentedHouses) {
    }

    @Autowired
    private HibernateSessionController sessionController;

    @RequestMapping(value = "/rented", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRentedHousesByPeriod(@RequestParam(value = "period", required = false) String period,
                                                     @RequestParam(value = "start-period-date", required = false) String startPeriodDate) {
        try (var session = HibernateSessionController.openSession()) {
            DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

            if (period == null) {
                List<RentedHouse> houses = session.createQuery("from Rented_House", RentedHouse.class).list();
                return new ResponseEntity<>(new RentedHouses(houses), HttpStatus.OK);
            }

            if (!period.contains("day") && !period.contains("month") && !period.contains("year")) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "Request must contains 'day', 'month' or 'year'"), HttpStatus.BAD_REQUEST);
            }
            if (startPeriodDate == null) {
                startPeriodDate = LocalDateTime.now().format(dateTimeFormat);
            }

            LocalDateTime startDateTime = LocalDate.parse(startPeriodDate, DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay();

            String endDate;
            if (period.contains("day")) {
                endDate = startDateTime.minusDays(1).format(dateTimeFormat);
            } else if (period.contains("month")) {
                endDate = startDateTime.minusMonths(1).format(dateTimeFormat);
            } else {
                endDate = startDateTime.minusYears(1).format(dateTimeFormat);
            }

            LocalDateTime endDateTime = LocalDateTime.parse(endDate, dateTimeFormat);

            var query = session.createQuery("FROM Rented_House WHERE rentalStartDate BETWEEN :startDate AND :endDate", RentedHouse.class);
            query.setParameter("endDate", startDateTime);
            query.setParameter("startDate", endDateTime);

            var houses = query.list();
            if (houses.isEmpty()) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(new RentedHouseController.RentedHouses(houses), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Long getUserTransactionsCount(Long id)
    {
        try (var session = HibernateSessionController.openSession()) {
            String transactionsCountQuery = "SELECT COUNT(*) FROM Rented_House WHERE idClient = :id";
            var queryTransactionsCount = session.createQuery(transactionsCountQuery, Long.class);
            queryTransactionsCount.setParameter("id", id);

            return queryTransactionsCount.uniqueResult();
        }
        catch (Exception e) {
            return null;
        }
    }

    private BigDecimal getUserAvgMoney(Long id) {
        try (var session = HibernateSessionController.openSession()) {
            String avgMoneyQuery = "SELECT AVG(totalAmount) FROM Rented_House WHERE idClient = :id";
            var queryAvgMoney = session.createQuery(avgMoneyQuery, Double.class);
            queryAvgMoney.setParameter("id", id);

            return new BigDecimal(queryAvgMoney.uniqueResult().toString());
        }
        catch (Exception e) {
            return null;
        }
    }

    private RentedHouse getUserLastBiggestDeal(Long id) {
        try (var session = HibernateSessionController.openSession()) {
            String lastBiggestDealQuery = "from Rented_House where idClient = :id and totalAmount = (" +
                    "select max(totalAmount) from Rented_House where idClient = :id) " +
                    "order by totalAmount desc";
            var queryLastBiggestDeal = session.createQuery(lastBiggestDealQuery, RentedHouse.class);
            queryLastBiggestDeal.setParameter("id", id);
            queryLastBiggestDeal.setMaxResults(1);

            return queryLastBiggestDeal.uniqueResult();
        }
        catch (Exception e) {
            return null;
        }
    }

    private BigDecimal getUserTotalMoney(Long id) {
        try (var session = HibernateSessionController.openSession()) {
            String totalMoneyQuery = "SELECT SUM(totalAmount) FROM Rented_House WHERE idClient = :id";
            var queryTotalMoney = session.createQuery(totalMoneyQuery, BigDecimal.class);
            queryTotalMoney.setParameter("id", id);

            return queryTotalMoney.uniqueResult();
        }
        catch (Exception e) {
            return null;
        }
    }

    private Long getUserTotalRentalPeriod(Long id) {
        try (var session = HibernateSessionController.openSession()) {
            String totalRentalPeriodQuery = "SELECT SUM(rentalDuration) FROM Rented_House WHERE idClient = :id";
            var queryTotalRental = session.createQuery(totalRentalPeriodQuery, Long.class);
            queryTotalRental.setParameter("id", id);

            return queryTotalRental.uniqueResult();
        }
        catch (Exception e) {
            return null;
        }
    }

    private Long getUserCurrentTransactionsNumber(Long id) {
        try (var session = HibernateSessionController.openSession()) {
            String totalCurrentTransactionsNumberQuery = "SELECT COUNT(*) FROM Rented_House WHERE idClient = :id " +
                                             "AND rentalEndDate > CURRENT_TIMESTAMP";
            var queryTotalRental = session.createQuery(totalCurrentTransactionsNumberQuery, Long.class);
            queryTotalRental.setParameter("id", id);

            return queryTotalRental.uniqueResult();
        }
        catch (Exception e) {
            return null;
        }
    }


    @RequestMapping(value = "/rented-user-info/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserAvgInfo(@PathVariable("id") Long id) {
        try (var session = HibernateSessionController.openSession()) {
            record UserInfo(Long transactionsCount, Long currentTransactionsNumber, BigDecimal avgMoney,
                            RentedHouse lastBiggestDeal, BigDecimal totalMoney, Long totalRentalPeriod) {
                // кол-во сделок
                // текущее кол-во домов в аренде
                // средняя сумма сделки
                // самая крупная сделка
                // все потрачено денег
                // общий срок аренды
            }

            // кол-во сделок
            var transactionsCount = getUserTransactionsCount(id);
            // текущее кол-во домов в аренде
            var currentTransactionsNumber = getUserCurrentTransactionsNumber(id);
            // средняя сумма сделки
            var avgMoney = getUserAvgMoney(id);
            // самая крупная сделка
            var lastBiggestDeal = getUserLastBiggestDeal(id);
            // всего потрачено денег
            var totalMoney = getUserTotalMoney(id);
            // общий срок аренды
            var totalRentalPeriod = getUserTotalRentalPeriod(id);

            return new ResponseEntity<>(new UserInfo(transactionsCount, currentTransactionsNumber, avgMoney, lastBiggestDeal, totalMoney, totalRentalPeriod), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserHousesInfo(@PathVariable("id") Long id) {
        try (var session = HibernateSessionController.openSession()) {
            DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

            String userHousesInfoQuery = "SELECT r FROM Rented_House r WHERE r.idClient = :id AND " +
                    "r.rentalEndDate > :yearAgo";
            var queryTotalRental = session.createQuery(userHousesInfoQuery, RentedHouse.class);
            queryTotalRental.setParameter("id", id);
            queryTotalRental.setParameter("yearAgo", LocalDateTime.now().minusYears(1));

            var houses = queryTotalRental.list();

            return new ResponseEntity<>(new RentedHouses(houses), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/create-deal", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createDeal(@RequestBody RentedHouse newDeal) {
        if (newDeal.getIdHouse() == null || newDeal.getIdClient() == null
                || newDeal.getRentalDuration() == null || newDeal.getTotalAmount() == null) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "Request must contains 'idHouse', 'idClient', 'rentalStartDate', 'rentalDuration', 'rentalEndDate' and 'totalAmount'"), HttpStatus.BAD_REQUEST);
        }

        try (var session = HibernateSessionController.openSession()) {
            DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");
            // проверка что дом свободен
            var freeHouses = session.createNativeQuery("select * from FreeHouse where id = :id", House.class)
                    .setParameter("id", newDeal.getIdHouse())
                    .uniqueResult();

            if (freeHouses == null) {
                return new ResponseEntity<>(ResponseMessage.DEAL_ALREADY_EXISTS.getJSON(), HttpStatus.CONFLICT);
            }

            LocalDateTime currentDateTime;
            if (newDeal.getRentalStartDate() == null) {
                currentDateTime = LocalDateTime.now();
                newDeal.setRentalStartDate(Timestamp.valueOf(currentDateTime));
                newDeal.setRentalEndDate(Timestamp.valueOf(currentDateTime.plusDays(newDeal.getRentalDuration())));
            }
            else {
                currentDateTime = newDeal.getRentalStartDate().toLocalDateTime();
                newDeal.setRentalEndDate(Timestamp.valueOf(currentDateTime.plusDays(newDeal.getRentalDuration())));
            }

            session.beginTransaction();
            session.persist(newDeal);
            session.getTransaction().commit();

            return new ResponseEntity<>(newDeal, HttpStatus.CREATED);

        }
        catch (ConstraintViolationException e) {
            return new ResponseEntity<>(ResponseMessage.DEAL_ALREADY_EXISTS.getJSON(), HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/edit-deal", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editDeal(@RequestBody RentedHouse newDeal) {
        if (newDeal.getIdHouse() == null || newDeal.getIdClient() == null
                || newDeal.getRentalDuration() == null || newDeal.getTotalAmount() == null) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "Request must contains 'idHouse', 'idClient', 'rentalStartDate', 'rentalDuration', 'rentalEndDate' and 'totalAmount'"), HttpStatus.BAD_REQUEST);
        }

        try (var session = HibernateSessionController.openSession()) {
            DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

            LocalDateTime currentDateTime;
            if (newDeal.getRentalStartDate() == null) {
                currentDateTime = LocalDateTime.now();
                newDeal.setRentalStartDate(Timestamp.valueOf(currentDateTime));
                newDeal.setRentalEndDate(Timestamp.valueOf(currentDateTime.plusDays(newDeal.getRentalDuration())));
            }
            else {
                currentDateTime = newDeal.getRentalStartDate().toLocalDateTime();
                newDeal.setRentalEndDate(Timestamp.valueOf(currentDateTime.plusDays(newDeal.getRentalDuration())));
            }

            session.beginTransaction();
            session.merge(newDeal);
            session.getTransaction().commit();

            return new ResponseEntity<>(newDeal, HttpStatus.CREATED);

        }
        catch (ConstraintViolationException e) {
            return new ResponseEntity<>(ResponseMessage.DEAL_ALREADY_EXISTS.getJSON(), HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
