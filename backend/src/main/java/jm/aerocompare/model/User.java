package jm.aerocompare.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String name;
    private String surname;

    @Email(message = "{errors.invalid_email}")
    private String email;

    private String password;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime created;

    //    @ElementCollection(targetClass=ERole.class)
    @Enumerated(EnumType.STRING)
//    @CollectionTable(name="user_role")
    @Column(name = "role")
    private ERole role;

//    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
//    public RefreshToken refreshToken;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
