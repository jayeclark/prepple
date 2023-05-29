package com.prepple.api.configuration;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;

/**
 * Configuration class for database connection. URL is derived from
 * active profile properties file and username and password are derived from env
 * variables
 */
@Configuration
@PropertySource("application-${spring.profiles.active}.properties")
public class DataSourceConfig {

    /**
     * Creates a data source definition from information in app.properties and
     * environment variables
     * 
     * @return DataSource The primary data source that will be used by the Spring
     *         app
     */
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