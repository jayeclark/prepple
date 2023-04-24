export interface PlanAttributes {
  title?: string;
  planned_answer?: string;
  prompts?: string;
  user_id?: string;
  datetime_planned?: number;
  question?: GraphQLQueryResponse;
  videos?: GraphQLQueryResponse;
}

export interface QuestionAttributes {
  question?: string;
  category?: number;
}

export interface VideoAttributes {
  title?: string;
  s3key?: string;
  rating?: number;
  datetime?: number;
  archive?: boolean;
  answer?: GraphQLQueryResponse;
}

export interface GraphQLQueryResponseData {
  id: string;
  attributes: PlanAttributes & QuestionAttributes & VideoAttributes
}

export interface GraphQLQueryResponse {
  data: GraphQLQueryResponseData | GraphQLQueryResponseData[]
}

export const getQuestionIDs = `
query getQuestionIDs($num: Int) {
  questions(pagination: { start: $num, limit: 1000}) {
    data {
      id
    }
  }
}
`
export const getQuestions = `
query getQuestions($search: String) {
  questions(filters: { question: { contains: $search }}, pagination: { start: 1, limit: 1000}) {
    data {
      id
      attributes {
        question
        category
      }
    }
  }
}
`

export const getQuestion = `
query getQuestion($id: ID) {
  question(id: $id) {
    data {
      id
      attributes {
        question
        category
      }
    }
  }
}
`

export const getLink = `
query getLink($slug: String) {
  links(filters: { slug: {eq: $slug}}) {
    data {
      id
      attributes {
        slug
        feedback
        user_id
        videos {
          data {
            id
            attributes {
              s3key
              answer {
                data {
                  attributes {
                    question {
                      data {
                        attributes {
                          question
                        }
                      }
                    }
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export const getVideos = `
query getVideos($id: Long, $archive: Boolean) {
  answers(filters: { user_id: { eq: $id }, videos: { archive: { eq: $archive }} }, pagination: { start: 0, limit: 1000 }) {
    data {
      id
      attributes {
        title
        question {
          data {
            id
            attributes {
              question
              category
            }
          }
        }
        videos {
          data {
            id
            attributes {
              s3key
              datetime
              archive
              rating
            }
          }
        }
      }
    }
  }
}
`

export const getPlans = `
query getPlans($id: Long) {
  answers(filters: { user_id: { eq: $id }, archive: { eq: false }}, pagination: { start: 0, limit: 1000 }) {
    data {
      id
      attributes {
        title
        planned_answer
        prompts
        user_id
        datetime_planned
        question {
          data {
            id
            attributes {
              question
              category
            }
          }
        }
        videos {
          data {
            id 
            attributes {
              s3key
              archive
            }
          }
        }
      }
    }
  }
}
`