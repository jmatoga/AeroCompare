package jm.aerocompare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "airplanes")
public class Airplane {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String model;
    private String manufacturer;
    private Integer yearManufactured;
    private String type;
    private Integer seats;
    private Integer rangeKm;
    private Integer maxSpeedKmh;

    @ManyToOne
    @JoinTable(name = "airline_airplanes",
            joinColumns = @JoinColumn(name = "airplane_id"),
            inverseJoinColumns = @JoinColumn(name = "airline_id")
    )
    private Airline airline;
}
