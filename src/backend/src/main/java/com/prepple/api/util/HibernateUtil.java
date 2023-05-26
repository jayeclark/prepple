package com.prepple.api.util;

import com.prepple.api.configuration.Database;
import com.prepple.api.configuration.ServiceConfig;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {

    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            // Create the SessionFactory from hibernate.cfg.xml
            return new Configuration()
                    .setProperty("url", ServiceConfig.getDbUrl(Database.POSTGRES))
                    .setProperty("jdbcUrl", ServiceConfig.getDbUrl(Database.POSTGRES))
                    .setProperty("username", ServiceConfig.getDbUsername(Database.POSTGRES))
                    .setProperty("password", ServiceConfig.getDbPassword(Database.POSTGRES))
                    .configure()
                    .buildSessionFactory(
                    new StandardServiceRegistryBuilder().build() );
        }
        catch (Throwable ex) {
            // Make sure you log the exception, as it might be swallowed
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

}