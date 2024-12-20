package jm.aerocompare.model;

import com.vladmihalcea.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "history")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "stop_number", columnDefinition = "estop_number") // Używa typu PostgreSQL
    private EStopNumber stopNumber;

    @Type(value = ListArrayType.class)
    @Column(name = "departure_airport_id_list", columnDefinition = "uuid[]")
    private List<UUID> departureAirportIdList;

    @Type(value = ListArrayType.class)
    @Column(name = "arrival_airport_id_list", columnDefinition = "uuid[]")
    private List<UUID> arrivalAirportIdList;

    private LocalDate departureDate;
    private LocalDate ArrivalDate;

    @Type(value = ListArrayType.class)
    @Column(name = "airlines_id_list", columnDefinition = "uuid[]")
    private List<UUID> airlinesIdList;

    //    @Enumerated(EnumType.STRING)
    @Column(name = "classes_list", columnDefinition = "class_type[]") // Tablica ENUM w PostgreSQL
    private List<EClass> classesList;

    //    @Enumerated(EnumType.STRING)
    @Column(name = "departure_days", columnDefinition = "day_of_week[]") // Używa tablicy enum PostgreSQL
    private List<DayOfWeek> departureDays;

    private Integer minPrice;
    private Integer maxPrice;
    private LocalTime departureTimeStart;
    private LocalTime departureTimeEnd;
    private LocalTime arrivalTimeStart;
    private LocalTime arrivalTimeEnd;
    private Integer tripTime;
    private Integer passengersCount;
    private Integer childrenCount;
    private Integer infantsCount;
    private Integer handLuggageCount;
    private Integer baggageCount;
    private UUID userId;
}