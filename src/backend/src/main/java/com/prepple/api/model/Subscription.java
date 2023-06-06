package com.prepple.api.model;

/**
 * Types of subscriptions that a user may have
 * // TODO: Should we add NONE by default to all users? In that a user who is logged in should be able
 * to access anything that an anonymous user can access?
 */
public enum Subscription {
    NONE,
    FREEMIUM,
    BASIC,
    PREMIUM,
    RECRUITER_INDIVIDUAL,
    RECRUITER_ENTERPRISE,
    ADMIN,
    SUPERADMIN
}
