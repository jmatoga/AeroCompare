package jm.aerocompare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "airlines")
public class Airline {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String name;
    private String IATA_code;

    @ManyToMany
    @JoinTable(name = "airline_airplanes",
            joinColumns = @JoinColumn(name = "airline_id"),
            inverseJoinColumns = @JoinColumn(name = "airplane_id")
    )
    private List<Airplane> airplanes = new ArrayList<>();
}
