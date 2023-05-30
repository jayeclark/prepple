package com.prepple.api.configuration;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
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

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "app.datasource")
    public DataSourceProperties dataSourcePropertiesLocal() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties(prefix = "app.docker.datasource")
    public DataSourceProperties dataSourcePropertiesDocker() {
        return new DataSourceProperties();
    }

    /**
     * Creates a data source definition from information in app.properties and
     * environment variables
     * 
     * @return DataSource The primary data source that will be used by the Spring
     *         app
     */
    @Bean
    public DataSource getDataSource() {
        Boolean isAwsSamLocal = System.getenv("AWS_SAM_LOCAL") != null
                && (System.getenv("AWS_SAM_LOCAL")).equals("true");
        DataSourceProperties properties = isAwsSamLocal ? dataSourcePropertiesDocker() : dataSourcePropertiesLocal();
        properties.setUsername(ServiceConfig.getDbUsername(Database.POSTGRES));
        properties.setPassword(ServiceConfig.getDbPassword(Database.POSTGRES));
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }
}