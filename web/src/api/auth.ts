export type AccountType = "candidate" | "ta" | "hiring-manager"

export interface UserProfile {
  id: string
  email: string
  name: string
  accountType: AccountType
  token: string
}

// Mock users for testing different account types
const mockUsers: Record<string, UserProfile> = {
  candidate: {
    id: "1",
    email: "candidate@example.com",
    name: "John Candidate",
    accountType: "candidate",
    token: "mock-candidate-token"
  },
  ta: {
    id: "2",
    email: "ta@example.com",
    name: "Sarah TA",
    accountType: "ta",
    token: "mock-ta-token"
  },
  "hiring-manager": {
    id: "3",
    email: "manager@example.com",
    name: "Mike Manager",
    accountType: "hiring-manager",
    token: "mock-manager-token"
  }
}

/**
 * Mock login function
 * In a real app, this would make an API call to authenticate the user
 * For demo purposes, you can pass the account type as the email to test different roles
 */
export async function login(email: string): Promise<UserProfile> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // For demo purposes: if email matches an account type, use that user
  // Otherwise, default to candidate
  const accountType = email.toLowerCase() as AccountType
  const user = mockUsers[accountType] || mockUsers.candidate

  return user
}

/**
 * Get the dashboard path for a given account type
 */
export function getDashboardPath(accountType: AccountType): string {
  const dashboardPaths: Record<AccountType, string> = {
    candidate: "/candidate/dashboard",
    ta: "/ta/dashboard",
    "hiring-manager": "/hiring-manager/dashboard"
  }
  return dashboardPaths[accountType]
}

/**
 * Get the current user profile from localStorage
 */
export function getCurrentUser(): UserProfile | null {
  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr) as UserProfile
  } catch {
    return null
  }
}

/**
 * Save user profile to localStorage
 */
export function saveUserProfile(user: UserProfile): void {
  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("token", user.token)
}

/**
 * Clear user session
 */
export function logout(): void {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
}
