package com.prepple.api.configuration;

import com.zaxxer.hikari.HikariDataSource;
import org.hibernate.Hibernate;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;

@Configuration
@PropertySource("application-${spring.profiles.active}.properties")
public class DataSourceConfig {

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "app.datasource")
    public DataSource getDataSource() {
        return DataSourceBuilder.create()
                .username(ServiceConfig.getDbUsername(Database.POSTGRES))
                .password(ServiceConfig.getDbPassword(Database.POSTGRES))
                .type(HikariDataSource.class)
                .build();
    }
}