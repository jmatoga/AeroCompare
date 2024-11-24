package jm.aerocompare.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AirportDTO {
    private String name;
    private String city;
    private String country;
    private String iata_code;
}
