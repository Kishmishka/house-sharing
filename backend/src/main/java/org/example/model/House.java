package org.example.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "House")
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "photo_link")
    private String photoLink;

    @Column(name = "address", nullable = false, length = 150)
    private String address;

    @Column(name = "parking_spaces_count", nullable = false)
    private Integer parkingSpacesCount = 0;

    @Column(name = "price_per_day", nullable = false, precision = 8, scale = 2)
    private BigDecimal pricePerDay;

    @Column(name = "district", nullable = false, length = 100)
    private String district;

    @Column(name = "comfort_class", nullable = false, length = 100)
    private String comfortClass;

    @Column(name = "description")
    private String description;

    @Column(name = "discount_price", precision = 8, scale = 2)
    private BigDecimal discountPrice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getParkingSpacesCount() {
        return parkingSpacesCount;
    }

    public void setParkingSpacesCount(Integer parkingSpacesCount) {
        this.parkingSpacesCount = parkingSpacesCount;
    }

    public BigDecimal getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(BigDecimal pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getComfortClass() {
        return comfortClass;
    }

    public void setComfortClass(String comfortClass) {
        this.comfortClass = comfortClass;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(BigDecimal discountPrice) {
        this.discountPrice = discountPrice;
    }
}