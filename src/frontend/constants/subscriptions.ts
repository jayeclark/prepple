export const subscriptionPlans = {
  Free: {
    NAME: "Free",
    MONTHLY_PRICE_IN_CENTS: 0,
    DESCRIPTION: ["Don't need instant AI feedback, long-term video storage, or micro-mentoring? Free tier is a great fit!"],
    FEATURES_LIST: [
      "Hundreds of common behavioral interview questions",
      "Interview prep planning tool",
      "Draft & save answer notes",
      "Record practice answers",
      "Save videos up to 90 days",
      "Unlimited social sharing",
      "Interactive video resumes for a fee"
    ]
  },
  Basic: {
    NAME: "Basic",
    MONTHLY_PRICE_IN_CENTS: 800,
    DESCRIPTION: ["In addition to the benefits of the free tier, you'll get access to instant AI feedback on answer plans and recordings,"
      + " up to 5 free interactive video resume pages, and a library of thousands of additional interview questions."],
    FEATURES_LIST: [
      "Thousands of behavioral interview questions",
      "Advanced prep planning tool",
      "Record practice answers",
      "Instant AI feedback on answer plans",
      "Instant AI feedback on videos",
      "Track & visualize progress",
      "5 free interactive video resumes",
      "Access to micro-mentoring platform"
    ]
  },
  Premium: {
    NAME: "Premium",
    MONTHLY_PRICE_IN_CENTS: 2400,
    DESCRIPTION: ["All the features of our basic plan, plus premier access"
      + " to company insights, unlimited interactive video resumes, and discounted rates for micro-mentoring sessions."],
    FEATURES_LIST: [
      "All basic monthly plan benefits",
      "Company interview question insights",
      "Unlimited interactive video resumes",
      "Advanced customization features",
      "Save videos up to 90 days",
      "Unlimited social sharing",
      "10% discount on micro-mentoring"
    ]
  }
}