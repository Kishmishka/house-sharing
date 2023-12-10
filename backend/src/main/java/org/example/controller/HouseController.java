package org.example.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.hibernateConnector.HibernateSessionController;
import org.example.model.House;
import org.example.response.ErrorMessageResponse;
import org.example.response.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/houses")
@SuppressWarnings({"unused"})
public class HouseController {
    @Autowired
    private HibernateSessionController sessionController;

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetAllHouses() {
        class Houses {
            public final List<House> houses;

            public Houses(List<House> houses) {
                this.houses = houses;
            }
        }

        try (var session = HibernateSessionController.openSession()) {
            List<House> houses = session.createQuery("from House", House.class).list();
            return new ResponseEntity<>(new Houses(houses), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/all/sort-price", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetSortHouses(@RequestBody String order) {
        try (var session = HibernateSessionController.openSession()) {
            var orderMap = new ObjectMapper().readValue(order, Map.class);

            String orderBy = (String)orderMap.get("order_by");
            if (orderBy == null) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "JSON must contains 'order_by'"), HttpStatus.BAD_REQUEST);
            }

            var query = session.createQuery("from House order by pricePerDay " + orderBy, House.class);
            var houses = query.getResultList();

            if (houses == null) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(houses, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/free", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetFreeHouses() {
        class Houses {
            public final List<House> houses;

            public Houses(List<House> houses) {
                this.houses = houses;
            }
        }

        try (var session = HibernateSessionController.openSession()) {
            List<House> houses = session.createNativeQuery("select * from FreeHouse", House.class).list();
            return new ResponseEntity<>(new Houses(houses), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/free/sort-price", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetFreeSortHouses(@RequestBody String order) {
        try (var session = HibernateSessionController.openSession()) {
            var orderMap = new ObjectMapper().readValue(order, Map.class);

            String orderBy = (String)orderMap.get("order_by");
            if (orderBy == null) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "JSON must contains 'order_by'"), HttpStatus.BAD_REQUEST);
            }

            var query = session.createNativeQuery("select * from FreeHouse order by price_per_day " + orderBy, House.class);
            var houses = query.list();

            if (houses == null) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(houses, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/free/sort-district", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetFreeHousesByDistrict(@RequestBody String district) {
        try (var session = HibernateSessionController.openSession()) {
            var districtMap = new ObjectMapper().readValue(district, Map.class);

            String foundDistrict = (String)districtMap.get("district");
            if (foundDistrict == null) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "JSON must contains 'district'"), HttpStatus.BAD_REQUEST);
            }

            var query = session.createNativeQuery("select * from FreeHouse where district ILIKE '" + foundDistrict + "'", House.class);
            var houses = query.list();

            if (houses == null) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(houses, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/free/sort-district-and-order", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetFreeHousesByDistrictAndOrder(@RequestBody String districtAndOrder) {
        try (var session = HibernateSessionController.openSession()) {
            var districtAndOrderMap = new ObjectMapper().readValue(districtAndOrder, Map.class);

            String district = (String)districtAndOrderMap.get("district");
            String order = (String)districtAndOrderMap.get("order_by");
            if (district == null || order == null) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "JSON must contains 'district' and 'order_by'"), HttpStatus.BAD_REQUEST);
            }

            var query = session.createNativeQuery("select * from FreeHouse where district ILIKE '" + district + "' order by price_per_day " + order, House.class);
            var houses = query.list();

            if (houses == null) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(houses, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/free/comfort-class", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetFreeHousesByComfortClass(@RequestBody String comfortClass) {
        try (var session = HibernateSessionController.openSession()) {
            var comfortClassMap = new ObjectMapper().readValue(comfortClass, Map.class);

            String foundComfortClass = (String)comfortClassMap.get("comfort_class");
            if (foundComfortClass == null) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "JSON must contains 'comfort_class'"), HttpStatus.BAD_REQUEST);
            }

            var query = session.createNativeQuery("select * from FreeHouse where comfort_class ILIKE '" + foundComfortClass + "'", House.class);
            var houses = query.list();

            if (houses == null) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(houses, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/free/comfort-class/sort-district", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetFreeHousesByComfortClassAndDistrict(@RequestBody String comfortClassAndDistrict) {
        try (var session = HibernateSessionController.openSession()) {
            var comfortClassAndDistrictMap = new ObjectMapper().readValue(comfortClassAndDistrict, Map.class);

            String district = (String)comfortClassAndDistrictMap.get("district");
            String comfortClass = (String)comfortClassAndDistrictMap.get("comfort_class");
            if (district == null || comfortClass == null) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "JSON must contains 'district' and 'comfort_class'"), HttpStatus.BAD_REQUEST);
            }

            var query = session.createNativeQuery("select * from FreeHouse where district ILIKE '" + district + "' and comfort_class ILIKE '" + comfortClass + "'", House.class);
            var houses = query.list();

            if (houses == null) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(houses, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/free/comfort-class/sort-district-and-order", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetFreeHousesByComfortClassAndDistrictAndOrder(@RequestBody String comfortClassAndDistrictAndOrder) {
        try (var session = HibernateSessionController.openSession()) {
            var comfortClassAndDistrictAndOrderMap = new ObjectMapper().readValue(comfortClassAndDistrictAndOrder, Map.class);

            String district = (String)comfortClassAndDistrictAndOrderMap.get("district");
            String comfortClass = (String)comfortClassAndDistrictAndOrderMap.get("comfort_class");
            String order = (String)comfortClassAndDistrictAndOrderMap.get("order_by");
            if (district == null || order == null || comfortClass == null) {
                return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, "JSON must contains 'district', 'comfort_class' and 'order_by'"), HttpStatus.BAD_REQUEST);
            }

            var query = session.createNativeQuery("select * from FreeHouse where district ILIKE '" + district + "' and comfort_class ILIKE '" + comfortClass + "' order by price_per_day " + order, House.class);
            var houses = query.list();

            if (houses == null) { // if houses not found
                return new ResponseEntity<>(ResponseMessage.HOUSES_NOT_FOUND.getJSON(), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(houses, HttpStatus.OK);
        }
        catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(new ErrorMessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
