package org.example.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Rented_House")
public class RentedHouse {
    @Id
    @Column(name = "id_house")
    private Long idHouse;

    @Id
    @Column(name = "id_client")
    private Long idClient;

    @Column(name = "rental_duration", nullable = false)
    private Integer rentalDuration;

    @Column(name = "total_amount", nullable = false, precision = 8, scale = 2)
    private BigDecimal totalAmount;

    public Long getIdHouse() {
        return idHouse;
    }

    public void setIdHouse(Long idHouse) {
        this.idHouse = idHouse;
    }

    public Long getIdClient() {
        return idClient;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public Integer getRentalDuration() {
        return rentalDuration;
    }

    public void setRentalDuration(Integer rentalDuration) {
        this.rentalDuration = rentalDuration;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
