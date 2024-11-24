package jm.aerocompare.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AirplaneDTO {
    private String model;
    private String manufacturer;
    private Integer yearManufactured;
    private String type;
    private Integer seats;
    private Integer rangeKm;
    private Integer maxSpeedKmh;
}
