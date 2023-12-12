package org.example.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Rented_House")
@SuppressWarnings("unused")
public class RentedHouse {
    @Id
    @Column(name = "id_house", nullable = false)
    private Long idHouse;

    @Id
    @Column(name = "id_client", nullable = false)
    private Long idClient;

    @Column(name = "rental_start_date", nullable = false)
    private Date rentalStartDate;

    @Column(name = "rental_duration", nullable = false)
    private Integer rentalDuration;

    @Column(name = "rental_end_date", nullable = false)
    private Date rentalEndDate;

    @Column(name = "total_amount", nullable = false, precision = 8, scale = 2)
    private BigDecimal totalAmount;

    public Long getHouse() {
        return idHouse;
    }

    public void setHouse(Long house) {
        this.idHouse = house;
    }

    public Long getClient() {
        return idClient;
    }

    public void setClient(Long client) {
        this.idClient = client;
    }

    public Date getRentalStartDate() {
        return rentalStartDate;
    }

    public void setRentalStartDate(Date rentalStartDate) {
        this.rentalStartDate = rentalStartDate;
    }

    public Integer getRentalDuration() {
        return rentalDuration;
    }

    public void setRentalDuration(Integer rentalDuration) {
        this.rentalDuration = rentalDuration;
    }

    public Date getRentalEndDate() {
        return rentalEndDate;
    }

    public void setRentalEndDate(Date rentalEndDate) {
        this.rentalEndDate = rentalEndDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
