export interface ParsedProfile {
  fullName: string
  age: string
  location: string
  email: string
  phone: string
  positionTitle: string
  skillExperience: string
  workExperience: string
  achievement: string
}

export interface JobRecommendation {
  id: string
  positionTitle: string
  location: string
  matchingPercent: number
}
