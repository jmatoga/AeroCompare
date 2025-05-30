package jm.aerocompare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private Integer flightNumber;

    @ManyToOne
    @JoinColumn(name = "departure_airport_id", referencedColumnName = "id", nullable = false)
    private Airport departureAirport;

    @ManyToOne
    @JoinColumn(name = "arrival_airport_id", referencedColumnName = "id", nullable = false)
    private Airport arrivalAirport;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private Integer priceForAdult;
    private Integer priceForChild;
    private Integer priceForHandLuggage;
    private Integer priceForCheckedLuggage;
    private Integer seatsLeft;
    private String bookingLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "class")
    private EClass eClass;

    @ManyToOne
    @JoinColumn(name = "airplane_id", referencedColumnName = "id", nullable = false)
    private Airplane airplane;
}
